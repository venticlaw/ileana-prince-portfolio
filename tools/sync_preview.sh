#!/bin/sh
# Copy the site into the preview mirror outside ~/Desktop (the preview sandbox
# cannot read Desktop). Run after editing, then reload the preview.
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="/private/tmp/ileana-portfolio-preview/site"
mkdir -p "$DEST"
rsync -a --delete --exclude '.git' --exclude '.claude' --exclude 'tools' "$SRC/" "$DEST/"
echo "synced $SRC -> $DEST"
