#!/bin/sh
set -e
# One check per line: set -e ignores a failure inside an && chain, and `sh script` ignores a -e on the #! line.
if grep -rlE '<(script|iframe|img|source|video|audio)[^>]*src="(https?:)?//' dist --include='*.html'; then echo "external resource found"; exit 1; fi
if grep -rhoE '<link[^>]*>' dist --include='*.html' | grep -E 'rel="(stylesheet|preload|modulepreload|icon)"' | grep -qE 'href="(https?:)?//'; then echo "external stylesheet or icon found"; exit 1; fi
# Scripts allowed: the JSON-LD block, which the CSP doesn't run, the theme switch (/theme.js), the booking link (/booking.js) and the Knowledge page's search (/knowledge.js).
if grep -rhoE '<script[^>]*>' dist --include='*.html' | grep -v 'application/ld+json' | grep -vxF -e '<script src="/theme.js">' -e '<script src="/booking.js" defer>' -e '<script src="/knowledge.js" defer>' | grep -q .; then echo "inline or unexpected script found"; exit 1; fi
if grep -rhE '<script src="/(theme|booking|knowledge).js"( defer)?>[^<]' dist --include='*.html' | grep -q .; then echo "a script tag has inline content"; exit 1; fi
test -f dist/theme.js
test -f dist/knowledge.js
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
test -s dist/sitemap-0.xml
if grep -q 'mxsalata.com/minecraft/' dist/sitemap-0.xml; then echo "the Minecraft page is in the sitemap"; exit 1; fi
# The Writing page is in the sitemap exactly when it's indexable.
if grep -q 'mxsalata.com/writing/<' dist/sitemap-0.xml; then w=listed; else w=unlisted; fi
if grep -q '<meta name="robots" content="noindex"' dist/writing/index.html; then n=noindex; else n=indexable; fi
case "$w:$n" in listed:noindex | unlisted:indexable) echo "Writing: $w in the sitemap but $n"; exit 1 ;; esac
# The same for Reviews.
if grep -q 'mxsalata.com/reviews/<' dist/sitemap-0.xml; then w=listed; else w=unlisted; fi
if grep -q '<meta name="robots" content="noindex"' dist/reviews/index.html; then n=noindex; else n=indexable; fi
case "$w:$n" in listed:noindex | unlisted:indexable) echo "Reviews: $w in the sitemap but $n"; exit 1 ;; esac
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
else
	echo "note: PDF and image metadata not checked (no ~/.venvs/html-tools here; House runs them)"
fi
echo OK
