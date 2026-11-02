#!/bin/sh
# Copy the site into the preview mirror outside ~/Desktop (the preview sandbox
# cannot read Desktop), recreating the server script if /private/tmp was cleared
# by a reboot. Run after editing, then reload the preview.
SRC="$(cd "$(dirname "$0")/.." && pwd)"
PREVIEW="/private/tmp/ileana-portfolio-preview"
DEST="$PREVIEW/site"
mkdir -p "$DEST"

if [ ! -f "$PREVIEW/serve.py" ]; then
  cat > "$PREVIEW/serve.py" <<'PY'
"""Static server for local preview of the portfolio.

Lives outside ~/Desktop deliberately: the preview launcher runs sandboxed and is
denied reads anywhere under Desktop. Recreated by tools/sync_preview.sh when a
reboot clears /private/tmp.
"""
import functools, http.server, socketserver

ROOT = "/private/tmp/ileana-portfolio-preview/site"
PORT = 4322

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map)
    extensions_map.update({'.svg': 'image/svg+xml',
                           '.webmanifest': 'application/manifest+json',
                           '.webp': 'image/webp'})

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT),
                            functools.partial(Handler, directory=ROOT)) as httpd:
    print("serving %s on http://127.0.0.1:%d" % (ROOT, PORT))
    httpd.serve_forever()
PY
  echo "recreated $PREVIEW/serve.py"
fi

rsync -a --delete --exclude '.git' --exclude '.claude' --exclude 'tools' "$SRC/" "$DEST/"
echo "synced $SRC -> $DEST"
