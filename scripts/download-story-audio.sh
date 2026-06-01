#!/bin/bash
# Download royalty-free BGM/SE from OpenGameArt.org and normalize for the game.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BGM_DIR="$ROOT/public/assets/bgm"
SE_DIR="$ROOT/public/assets/se"
TMP="$ROOT/.cache/audio-download"
OGA="https://opengameart.org/sites/default/files"

mkdir -p "$BGM_DIR" "$SE_DIR" "$TMP"

fetch() {
  local name="$1"
  local url="$2"
  local out="$3"
  if [[ -f "$out" ]] && [[ -s "$out" ]]; then
    echo "  skip (cached) $name"
    return
  fi
  echo "  fetch $name"
  curl -fsSL "$url" -o "$out"
}

normalize_bgm() {
  local in="$1"
  local out="$2"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -af "afade=t=in:st=0:d=2,afade=t=out:st=88:d=2" \
    -t 90 -ar 44100 -ac 2 -c:a libmp3lame -b:a 128k "$out"
}

normalize_se() {
  local in="$1"
  local out="$2"
  local gain="$3"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -af "volume=${gain},afade=t=in:st=0:d=0.01,afade=t=out:st=0:d=0.05" \
    -t 0.35 -ar 44100 -ac 1 -c:a libmp3lame -b:a 96k "$out"
}

echo "=== BGM (OpenGameArt) ==="
fetch evening "$OGA/evening.mp3" "$TMP/evening.mp3"
fetch town "$OGA/TownTheme.mp3" "$TMP/TownTheme.mp3"
fetch rain "$OGA/Rain.mp3" "$TMP/Rain.mp3"
fetch space "$OGA/spacetheme.mp3" "$TMP/spacetheme.mp3"
fetch tension "$OGA/song21.mp3" "$TMP/song21.mp3"
fetch ending "$OGA/the_field_of_dreams.mp3" "$TMP/field.mp3"

normalize_bgm "$TMP/evening.mp3" "$BGM_DIR/night.mp3"
normalize_bgm "$TMP/TownTheme.mp3" "$BGM_DIR/day.mp3"
normalize_bgm "$TMP/Rain.mp3" "$BGM_DIR/rain.mp3"
normalize_bgm "$TMP/spacetheme.mp3" "$BGM_DIR/stars.mp3"
ffmpeg -y -hide_banner -loglevel error -i "$TMP/song21.mp3" \
  -af "afade=t=in:st=0:d=2,afade=t=out:st=38:d=2" \
  -t 42 -ar 44100 -ac 2 -c:a libmp3lame -b:a 128k "$BGM_DIR/tension.mp3"
normalize_bgm "$TMP/field.mp3" "$BGM_DIR/ending.mp3"

echo "=== SE (OpenGameArt) ==="
fetch click "$OGA/click.mp3" "$TMP/click.mp3"
fetch select "$OGA/select.ogg" "$TMP/select.ogg"
fetch save "$OGA/save.mp3" "$TMP/save.mp3"
fetch click_wav "$OGA/click.wav" "$TMP/click.wav"

normalize_se "$TMP/click.mp3" "$SE_DIR/click.mp3" "0.85"
normalize_se "$TMP/select.ogg" "$SE_DIR/choice.mp3" "0.9"
normalize_se "$TMP/save.mp3" "$SE_DIR/save.mp3" "0.75"
normalize_se "$TMP/click.wav" "$SE_DIR/pageTurn.mp3" "0.55"

echo "Done. BGM + SE written to public/assets/"
