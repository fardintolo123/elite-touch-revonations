import pathlib
import sys

sys.path.insert(0, r"D:\1\elite-touch-revonations\tmp\pydeps")

from pypdf import PdfReader

pdf_path = pathlib.Path(r"D:\1\elite-touch-revonations\tmp\pdfs\issue-62-keyword-gaps.pdf")
out_path = pathlib.Path(r"D:\1\elite-touch-revonations\tmp\pdfs\issue-62-keyword-gaps-extracted.txt")

parts = []
reader = PdfReader(pdf_path)
parts.append(f"Pages: {len(reader.pages)}\n")
for index, page in enumerate(reader.pages, 1):
        parts.append(f"\n--- PAGE {index} ---\n")
        parts.append(page.extract_text() or "")

out_path.write_text("".join(parts), encoding="utf-8")
print(out_path)
