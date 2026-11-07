"""Read-only GSC/served-HTML evidence collector. Requires installed beautifulsoup4."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urlparse, urljoin
import csv
import json
import re
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
RAW = ROOT / 'gsc-query-page-2026-08-05--2026-11-02.txt'
BASE = 'https://www.elitetouchrenovations.au'
PATTERN = re.compile(r'^(.*?) \| (https?://\S+)  clicks=(\d+) impr=(\d+) ctr=([\d.]+)% pos=([\d.]+)$')

def normalized(text):
    return ' '.join(re.findall(r'\w+', text.casefold()))

def faq_questions(schemas):
    """Question nodes belong to FAQPage, not unrelated form disclosures."""
    questions = []
    def visit(node):
        if isinstance(node, dict):
            types = node.get('@type', [])
            types = [types] if isinstance(types, str) else types
            if 'FAQPage' in types:
                for entity in node.get('mainEntity', []):
                    if isinstance(entity, dict) and entity.get('name'):
                        questions.append(entity['name'])
            for value in node.values():
                visit(value)
        elif isinstance(node, list):
            for value in node:
                visit(value)
    visit(schemas)
    return questions

def fetch(url):
    request = Request(url, headers={'User-Agent': 'ETR-GSC-Content-Audit/1.0'})
    try:
        with urlopen(request, timeout=40) as response:
            body = response.read()
            return response.status, response.geturl(), body, dict(response.headers)
    except HTTPError as error:
        return error.code, error.geturl(), error.read(), dict(error.headers)

def inspect(url):
    try:
        status, final, body, headers = fetch(url)
        soup = BeautifulSoup(body, 'html.parser')
        main = soup.find('main')
        metadata = lambda name: next((tag.get('content', '') for tag in soup.find_all('meta') if (tag.get('name') or tag.get('property', '')).casefold() == name), '')
        canonical = soup.find('link', rel='canonical')
        schemas = []
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                schemas.append(json.loads(script.get_text()))
            except (ValueError, TypeError):
                schemas.append({'parseError': True})
        result = {'requestedUrl': url, 'status': status, 'finalUrl': final,
                  'htmlSha256': sha256(body).hexdigest(), 'htmlBytes': len(body),
                  'title': soup.title.get_text(' ', strip=True) if soup.title else '',
                  'description': metadata('description'), 'robots': metadata('robots'),
                  'canonical': canonical.get('href', '') if canonical else '',
                  'h1': [tag.get_text(' ', strip=True) for tag in soup.find_all('h1')],
                  'headings': [{'level': tag.name, 'text': tag.get_text(' ', strip=True)} for tag in (main or soup).find_all(['h2', 'h3'])],
                  'images': [{'src': tag.get('src', ''), 'alt': tag.get('alt'), 'sizes': tag.get('sizes', ''), 'loading': tag.get('loading', '')} for tag in (main or soup).find_all('img')],
                  'schemas': schemas}
        if main:
            for tag in main.find_all(['script', 'style', 'nav', 'header', 'footer']):
                tag.decompose()
            result['bodyText'] = main.get_text(' ', strip=True)
            result['paragraphs'] = [tag.get_text(' ', strip=True) for tag in main.find_all('p')]
            result['bodyLinks'] = [{'href': urljoin(final, tag.get('href', '')), 'anchor': tag.get_text(' ', strip=True)} for tag in main.find_all('a', href=True)]
            result['details'] = [{'question': tag.find('summary').get_text(' ', strip=True), 'text': tag.get_text(' ', strip=True)} for tag in main.find_all('details') if tag.find('summary')]
            result['faqSchemaQuestions'] = faq_questions(schemas)
            question_keys = {normalized(question) for question in result['faqSchemaQuestions']}
            result['faq'] = [detail for detail in result['details'] if normalized(detail['question']) in question_keys]
        else:
            result.update(bodyText='', paragraphs=[], bodyLinks=[], details=[], faqSchemaQuestions=faq_questions(schemas), faq=[])
        return result
    except Exception as error:
        return {'requestedUrl': url, 'error': str(error)}

def main():
    raw = RAW.read_text(encoding='utf-8')
    rows = []
    for line in raw.splitlines()[1:]:
        if not line.strip():
            continue
        match = PATTERN.match(line)
        if not match:
            raise ValueError('Unparsed raw data line: ' + line[:120])
        query, page, clicks, impressions, ctr, position = match.groups()
        rows.append(dict(query=query, page=page, clicks=int(clicks), impressions=int(impressions), ctrPercent=float(ctr), position=float(position)))
    status, final, sitemap_bytes, _ = fetch(BASE + '/sitemap.xml')
    if status != 200:
        raise ValueError('Sitemap not 200')
    (ROOT / 'live-sitemap.xml').write_bytes(sitemap_bytes)
    tree = ET.fromstring(sitemap_bytes)
    urls = [node.text for node in tree.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    if not urls:
        raise ValueError('No URLs in sitemap')
    for url in urls:
        if urlparse(url).hostname not in ('www.elitetouchrenovations.au', 'elitetouchrenovations.au'):
            raise ValueError('Unexpected sitemap host')
    targets = sorted(set(urls) | {row['page'] for row in rows})
    results = []
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(inspect, url): url for url in targets}
        for future in as_completed(futures):
            results.append(future.result())
            if len(results) % 25 == 0:
                print(f'Inspected {len(results)}/{len(targets)} URLs', flush=True)
    results.sort(key=lambda row: row['requestedUrl'])
    by_url = {row['requestedUrl']: row for row in results}
    ledger = []
    for row in rows:
        page = by_url[row['page']]
        needle = normalized(row['query'])
        in_band = 15 <= row['position'] <= 80
        evidence = row['impressions'] >= 10
        ledger.append({**row, 'screen': 'CANDIDATE_REQUIRES_REVIEW' if in_band and evidence else 'OUTSIDE_POSITION_BAND' if not in_band else 'HOLD_LOW_IMPRESSIONS',
                       'boundaryPrecisionHold': row['position'] in (15, 80),
                       'status': page.get('status'), 'finalUrl': page.get('finalUrl', ''),
                       'inTitleExact': needle in normalized(page.get('title', '')),
                       'inDescriptionExact': needle in normalized(page.get('description', '')),
                       'inH1Exact': needle in normalized(' '.join(page.get('h1', []))),
                       'inBodyExact': needle in normalized(page.get('bodyText', '')),
                       'relevanceDecision': 'NOT_YET_REVIEWED'})
    snapshot = {'observedAtUtc': datetime.now(timezone.utc).isoformat(), 'sitemapUrl': final, 'sitemapCount': len(urls), 'requestedUrls': len(targets), 'rawRows': len(rows), 'results': results}
    (ROOT / 'live-page-snapshot.json').write_text(json.dumps(snapshot, ensure_ascii=False, indent=2), encoding='utf-8')
    with (ROOT / 'query-page-screening.csv').open('w', encoding='utf-8-sig', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=list(ledger[0]))
        writer.writeheader()
        writer.writerows(ledger)
    print(json.dumps({'rawRows': len(rows), 'sitemapPages': len(urls), 'requestedUrls': len(targets), 'successfulRequests': sum('error' not in p for p in results), 'failures': [p for p in results if 'error' in p], 'non200': [{'url': p['requestedUrl'], 'status': p.get('status'), 'finalUrl': p.get('finalUrl')} for p in results if p.get('status', 200) != 200]}, indent=2), flush=True)

if __name__ == '__main__':
    main()
