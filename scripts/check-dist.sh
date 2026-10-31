#!/bin/sh
set -e
# One check per line: set -e ignores a failure inside an && chain, and `sh script` ignores a -e on the #! line.
if grep -rl '<script[^>]*src="https\?://' dist; then echo "external script found"; exit 1; fi
grep -q 'application/ld+json' dist/index.html
grep -q 'og:title' dist/index.html
test -f dist/_headers
grep -q 'Strict-Transport-Security' dist/_headers
test -f dist/_redirects
test -f dist/rss.xml
test -f dist/sitemap-index.xml
test -f dist/404.html
test -f package-lock.json
grep -o 'rel="canonical" href="[^"]*"' dist/about/index.html | grep -q '/"$'
echo OK
