from pathlib import Path
import re
import shutil
import sys

SOURCE = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else None
if SOURCE is None or not (SOURCE / "raw").is_dir():
    raise SystemExit("Usage: python scripts/sync_from_private.py <path-to-private-vault>")

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"

for name in ("raw", "wiki", "arch"):
    destination = CONTENT / name
    if destination.exists():
        shutil.rmtree(destination)

for paper in (SOURCE / "raw").iterdir():
    if not paper.is_dir():
        continue
    destination = CONTENT / "raw" / paper.name
    destination.mkdir(parents=True, exist_ok=True)
    for note in paper.glob("*.md"):
        shutil.copy2(note, destination / note.name)
    if (paper / "assets").is_dir():
        shutil.copytree(paper / "assets", destination / "assets")

for name in ("wiki", "arch"):
    shutil.copytree(SOURCE / name, CONTENT / name)
for name in ("AGENTS.md", "00_Guide.md"):
    if (SOURCE / name).exists():
        shutil.copy2(SOURCE / name, CONTENT / name)

image_links = 0
pdf_links = 0
for note in (CONTENT / "raw").glob("*/*.md"):
    text = note.read_text(encoding="utf-8")
    slug = note.parent.name
    image_links += text.count("](assets/")
    text = text.replace("](assets/", f"](raw/{slug}/assets/")

    parts = text.split("---", 2)
    if len(parts) == 3:
        frontmatter, body = parts[1], parts[2]
        arxiv = re.search(r"^arxiv:\s*[\"']?([^\"'\n]+)", frontmatter, re.M)
        url = re.search(r"^url:\s*[\"']?([^\"'\n]+)", frontmatter, re.M)
        arxiv_id = arxiv.group(1).strip() if arxiv else ""
        source_url = url.group(1).strip() if url else ""
        if arxiv_id and arxiv_id.lower() not in ("null", "none", "n/a"):
            replacement = f"[arXiv:{arxiv_id}](https://arxiv.org/abs/{arxiv_id})"
        elif source_url and source_url.lower() not in ("null", "none", "n/a"):
            replacement = f"[原文链接]({source_url})"
        else:
            replacement = "未随本站公开（版权原因）"
        body, count = re.subn(
            r"\[\[[^\]]+?\.pdf(?:\|[^\]]*)?\]\]", replacement, body, flags=re.I
        )
        pdf_links += count
        text = parts[0] + "---" + frontmatter + "---" + body

    note.write_text(text, encoding="utf-8")

notes = len(list((CONTENT / "raw").glob("*/*.md")))
pdfs = len(list((CONTENT / "raw").rglob("*.pdf")))
print(f"Synced {notes} notes; rewrote {image_links} image links and {pdf_links} PDF links; PDFs copied: {pdfs}")
