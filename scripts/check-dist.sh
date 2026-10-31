#!/bin/sh
set -e
# One check per line: set -e ignores a failure inside an && chain, and `sh script` ignores a -e on the #! line.
if grep -rlE '<(script|iframe|img|source|video|audio)[^>]*src="(https?:)?//' dist --include='*.html'; then echo "external resource found"; exit 1; fi
if grep -rhoE '<link[^>]*>' dist --include='*.html' | grep -E 'rel="(stylesheet|preload|modulepreload|icon)"' | grep -qE 'href="(https?:)?//'; then echo "external stylesheet or icon found"; exit 1; fi
# The only inline script allowed is the JSON-LD block, which the CSP doesn't run.
if grep -rhoE '<script[^>]*>' dist --include='*.html' | grep -v 'application/ld+json' | grep -q .; then echo "inline or local script found"; exit 1; fi
if grep -rlE ' style="' dist --include='*.html'; then echo "inline style attribute found (CSP has no unsafe-inline)"; exit 1; fi
if grep -rl '<style' dist --include='*.html'; then echo "inline style element found (CSP has no unsafe-inline)"; exit 1; fi
grep -q 'application/ld+json' dist/index.html
grep -q 'og:title' dist/index.html
test -f dist/_headers
grep -q 'Strict-Transport-Security' dist/_headers
grep -q "Content-Security-Policy: .*object-src 'none'.*base-uri 'none'" dist/_headers
test -f dist/_redirects
test -f dist/robots.txt
test -f dist/rss.xml
test -f dist/sitemap-index.xml
test -f dist/404.html
test -f package-lock.json
grep -o 'rel="canonical" href="[^"]*"' dist/about/index.html | grep -q '/"$'
# Published files carry no metadata beyond what's meant: the CV only its title, author and subject, images none.
if [ -x "$HOME/.venvs/html-tools/bin/python" ]; then
	"$HOME/.venvs/html-tools/bin/python" -I - dist <<'PY'
import os, sys
import pymupdf
from PIL import Image
bad = []
for root, _, files in os.walk(sys.argv[1]):
    for f in files:
        p = os.path.join(root, f)
        if f.endswith(".pdf"):
            d = pymupdf.open(p)
            extra = {k: v for k, v in d.metadata.items() if v and k not in ("format", "title", "author", "subject")}
            if extra or d.get_xml_metadata():
                bad.append(f"{p}: PDF metadata {sorted(extra)}")
        elif f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            im = Image.open(p)
            if im.getexif() or any(k in im.info for k in ("exif", "xmp", "icc_profile", "XML:com.adobe.xmp")):
                bad.append(f"{p}: image metadata")
for b in bad:
    print(b)
sys.exit(1 if bad else 0)
PY
fi
echo OK
