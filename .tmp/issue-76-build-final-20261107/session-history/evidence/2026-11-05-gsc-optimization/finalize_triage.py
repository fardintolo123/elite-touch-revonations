"""Apply explicitly conservative editorial dispositions to the captured evidence.

This is a decision ledger, not an SEO score or an automatic publishing tool.
KEEP and HOLD never assert that a query lacks commercial value or that rankings
cannot improve; they mean no qualifying change was established in this audit.
"""
from pathlib import Path
from urllib.parse import urlparse
from collections import Counter, defaultdict
import csv
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
BASE = 'https://www.elitetouchrenovations.au'
snapshot = json.loads((ROOT / 'live-page-snapshot.json').read_text(encoding='utf-8'))
pages = {page['requestedUrl']: page for page in snapshot['results']}
with (ROOT / 'query-page-screening.csv').open(encoding='utf-8-sig', newline='') as file:
    rows = list(csv.DictReader(file))
issues = json.loads((ROOT / 'created-issues.json').read_text(encoding='utf-8'))
assert [issue['number'] for issue in issues] == [92, 93, 94, 95, 96]
issue_by_slug = {
    'bathroom-renovation-project-management-timeline': 92,
    'bathroom-renovation-checklist-sydney': 93,
    'small-bathroom-renovation-without-feeling-cramped': 94,
    'diy-or-professional-bathroom-renovation': 95,
    'bathroom-waterproofing-explained': 96,
}
protected = {'accessible-bathroom-renovation-sydney', 'aging-in-place-bathroom-design'}
explicit_rejects = {
    'bathroom renovations cost calculator': 'Calculator intent is not met by a budgeting article; no tool is authorized or justified here.',
    'heated towel rail installation inner west': 'Standalone fitting/install service intent is outside the four renovation offers.',
    'bathroom installers insurance': 'Trade-provider insurance intent is not the homeowner insurance article intent.',
    'heritage renovations sydney': 'Whole-home heritage renovation intent exceeds the confirmed bathroom scope.',
    'renovation mistakes': 'Broad renovation intent does not establish a bathroom-specific missing answer.',
    'bathroom renovation faqs': 'Broad FAQ intent does not justify retargeting the specific mistakes article.',
    'types of toilets': 'Broad product-type query is already explained; no missing renovation answer established.',
}
unsupported = re.compile(r'kitchen|bedroom renovation|bathtub refinishing|regrout|bathroom painting|asbestos removal|ndis|massage|ultra renovations|fine touch group|artistic kitchens|elite home design|elite bathroom renovations')
remote_places = re.compile(r'\b(goonellabah|somersby|rothbury|rutherford|ellalong|millfield|ettamogah|bulli)\b')
standalone = re.compile(r'^(bathroom tiling|shower installation|affordable shower plumbing repair)\b')

for row in rows:
    query, path = row['query'], urlparse(row['page']).path
    slug = path.strip('/').split('/')[-1]
    row['issue'] = ''
    row['intendedOwner'] = ''
    if row['screen'] == 'OUTSIDE_POSITION_BAND':
        decision, reason = 'NO_TARGET_OUTSIDE_POSITION_BAND', 'Reported query/page average lies outside the requested inclusive 15–80 range.'
    elif row['screen'] == 'HOLD_LOW_IMPRESSIONS':
        decision, reason = 'HOLD_LOW_IMPRESSIONS', 'Fewer than 10 observations in this 90-day aggregate; no standalone optimization justified.'
    elif row['boundaryPrecisionHold'] == 'True':
        decision, reason = 'HOLD_POSITION_PRECISION', 'Displayed 15.0 or 80.0 position may conceal a raw value outside the requested band.'
    elif pages[row['page']].get('finalUrl') != row['page'] and path != '/':
        decision, reason = 'KEEP_SETTLED_LEGACY_REDIRECT', 'Historical alias redirects to its settled canonical destination; do not optimize a non-page or infer present cannibalization.'
        row['intendedOwner'] = pages[row['page']].get('canonical') or pages[row['page']].get('finalUrl', '')
    elif slug in protected:
        decision, reason = 'HOLD_UNOFFERED_SPECIALIST_SCOPE', 'D-161: informational coverage does not authorize accessible/NDIS/seniors specialist service targeting.'
    elif unsupported.search(query) or standalone.search(query):
        decision, reason = 'REJECT_SERVICE_OR_BRAND_MISMATCH', 'Unsupported standalone/multi-trade service, unrelated product or competitor/other-brand intent.'
    elif remote_places.search(query):
        decision, reason = 'REJECT_UNCONFIRMED_LOCATION', 'Named place is not established as an approved target by the current area/source review; do not infer service from an impression.'
    elif query in explicit_rejects:
        decision, reason = 'HOLD_INTENT_MISMATCH_OR_NO_GAP', explicit_rejects[query]
    elif slug in issue_by_slug and path.startswith('/blog/'):
        n = issue_by_slug[slug]
        row['issue'] = str(n)
        row['intendedOwner'] = BASE + path
        if n == 92:
            decision, reason = 'CORRECT_AND_ROUTE', 'Live timing claims conflict with approved durations. Keep management focus and link to dedicated timeline/checklist owners; no duplicate duration target.'
            owner = 'bathroom-renovation-checklist-sydney' if 'checklist' in query else 'diy-or-professional-bathroom-renovation' if 'diy' in query else 'bathroom-renovation-timeline-sydney'
            row['intendedOwner'] = BASE + '/blog/' + owner + '/'
        elif n == 96:
            decision, reason = 'IMPROVE_CONTEXTUAL_INLINKS_ONLY', 'Target already answers the subject; verified missing contextual links in existing flooring and demolition paragraphs are the improvement.'
        else:
            decision, reason = 'IMPROVE_VERIFIED_CONTENT_GAP', {93:'Three pre-work sections do not supply a usable staged checklist; add source-backed checks and contextual routing.',94:'Three short generic sections omit concrete measured-layout trade-offs and useful small-room FAQs; preserve commercial ensuite owner.',95:'Three decision sections omit a clear preparation/routing path and FAQs; verify legal statements against official NSW sources.'}[n]
            if n == 94 and 'ensuite' in query:
                row['intendedOwner'] = BASE + '/services/ensuite-bathroom-renovations/'
    elif path.startswith('/blog/'):
        decision, reason = 'HOLD_NO_VERIFIED_ADDITIONAL_GAP', 'Existing informational subject coverage or adjacent intent owner; a missing literal phrase alone is not a justified edit.'
        row['intendedOwner'] = BASE + path
    elif path.startswith('/services/laundry-renovations/') and 'laundry' in query and 'bathroom' not in query:
        decision, reason = 'HOLD_STANDALONE_LAUNDRY_INTENT', 'Only combined bathroom-and-laundry renovations are confirmed; do not target a laundry-only offer. Existing #82 work already addresses this service context.'
    elif path.startswith('/services/') or path.startswith('/gallery/') or path == '/packages/':
        decision, reason = 'KEEP_EXISTING_SCOPE_REVIEW_OWNER_BEFORE_RETARGET', 'Relevant service/region/project/package coverage and links already exist. Do not insert every place or reorder every variant; confirm the dedicated owner before any new target.'
        row['intendedOwner'] = BASE + path
    else:
        decision, reason = 'HOLD_NO_VERIFIED_PAGE_FIT', 'Query impressions alone do not justify retargeting home, about or contact content; no concrete missing answer established.'
    row['relevanceDecision'] = decision
    row['decisionReason'] = reason

with (ROOT / 'query-page-decisions.csv').open('w', encoding='utf-8-sig', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)

sitemap = ET.fromstring((ROOT / 'live-sitemap.xml').read_bytes())
urls = [node.text for node in sitemap.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
by_path = defaultdict(list)
for row in rows:
    by_path[urlparse(row['page']).path].append(row)
page_rows = []
donors = {'bathroom-flooring-options-renovation':96,'bathroom-demolition-what-to-expect':96,'bathroom-storage-planning-renovation':94,'ensuite-renovation-ideas-layout':94,'first-time-bathroom-renovation-sydney':95,'bathroom-renovation-budget-planning':95}
for url in urls:
    path, page = urlparse(url).path, pages[url]
    slug = path.strip('/').split('/')[-1]
    related = by_path[path]
    candidates = [r for r in related if r['screen']=='CANDIDATE_REQUIRES_REVIEW']
    issue = issue_by_slug.get(slug) if path.startswith('/blog/') else None
    if page.get('status') != 200:
        verdict, reason = 'HOLD_FETCH_VERIFICATION', 'Automated fetch returned an access challenge. This is not proof of a customer outage; verify in a browser before any content decision.'
    elif issue:
        verdict, reason = 'IMPROVE', 'Verified deliverable in issue #' + str(issue) + '; not implemented or published in this session.'
    elif path.startswith('/blog/') and slug in donors:
        issue = donors[slug]
        verdict, reason = 'IMPROVE_SUPPORTING_LINKS', 'Existing subject coverage stays; named source paragraphs are contextual-link donors for issue #' + str(issue) + '. Optional donor changes still require fit inspection.'
    elif path.startswith('/blog/') and slug in protected:
        verdict, reason = 'HOLD_BUSINESS_SCOPE', 'Keep informational role; no commercial specialist service targeting under D-161.'
    elif not candidates:
        verdict, reason = 'KEEP_NO_QUALIFIED_SIGNAL', 'No query/page row clears both requested position band and conservative impression screening; no GSC-led edit established.'
    elif all(r['relevanceDecision'].startswith(('REJECT','HOLD_UNOFFERED','HOLD_STANDALONE','HOLD_INTENT')) for r in candidates):
        verdict, reason = 'HOLD_QUERY_FIT', 'Screened rows do not establish a fitting, underoptimized target for this page.'
    else:
        verdict, reason = 'KEEP_NO_VERIFIED_GAP', 'Keep current scope and URL; impressions/word-order differences alone do not prove a missing answer or justify another section.'
    page_rows.append({'url':url,'status':page.get('status'),'verdict':verdict,'issue':issue or '', 'rawQueryRows':len(related),'screenedRows':len(candidates),'title':page.get('title',''),'h1':' | '.join(page.get('h1',[])),'reason':reason})
with (ROOT / 'page-dispositions.csv').open('w', encoding='utf-8-sig', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=list(page_rows[0]))
    writer.writeheader()
    writer.writerows(page_rows)

summary = {'rawRows':len(rows),'screenedRows':sum(r['screen']=='CANDIDATE_REQUIRES_REVIEW' for r in rows),'screenedPaths':len({urlparse(r['page']).path for r in rows if r['screen']=='CANDIDATE_REQUIRES_REVIEW'}),'sitemapPages':len(urls),'requestedUrls':len(pages),'pageVerdicts':dict(Counter(p['verdict'] for p in page_rows)),'queryDispositions':dict(Counter(r['relevanceDecision'] for r in rows)),'createdIssues':[{'number':i['number'],'url':i['url']} for i in issues]}
assert len(rows) == snapshot['rawRows']
assert len(page_rows) == snapshot['sitemapCount'] == len(set(urls))
assert all(r['relevanceDecision'] != 'NOT_YET_REVIEWED' for r in rows)
assert all(p['status']==200 and len(p['h1'])==1 and p['canonical']==p['requestedUrl'] for p in pages.values() if p['requestedUrl'] in urls and p.get('status')==200)
assert all(BASE+'/blog/'+slug+'/' in urls for slug in issue_by_slug)
for row in rows:
    if row['issue']:
        assert 15 <= float(row['position']) <= 80 and int(row['impressions'])>=10
        assert row['screen']=='CANDIDATE_REQUIRES_REVIEW'
for target, sources in [('bathroom-waterproofing-explained',['bathroom-flooring-options-renovation','bathroom-demolition-what-to-expect']),('bathroom-renovation-checklist-sydney',['bathroom-renovation-project-management-timeline'])]:
    for source in sources:
        assert not any(link['href']==BASE+'/blog/'+target+'/' for link in pages[BASE+'/blog/'+source+'/']['bodyLinks'])
(ROOT / 'audit-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
