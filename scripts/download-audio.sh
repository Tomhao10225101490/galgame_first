#!/bin/bash
# Download royalty-free story BGM/SE from OpenGameArt and normalize them for the game.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/assets"
TMP="$ROOT/.cache/audio-download"
OGA="https://opengameart.org/sites/default/files"

mkdir -p "$OUT/bgm" "$OUT/se" "$TMP"

have_ffmpeg() {
  command -v ffmpeg >/dev/null 2>&1
}

fetch() {
  local label="$1"
  local url="$2"
  local dest="$3"
  if [[ -s "$dest" ]]; then
    echo "skip $label"
    return 0
  fi
  echo "fetch $label"
  curl -fsSL "$url" -o "$dest"
}

normalize_bgm() {
  local input="$1"
  local output="$2"
  local fade_out="${3:-88}"
  ffmpeg -y -hide_banner -loglevel error -i "$input" \
    -af "afade=t=in:st=0:d=2,afade=t=out:st=${fade_out}:d=2" \
    -t 90 -ar 44100 -ac 2 -c:a libmp3lame -b:a 128k "$output"
}

normalize_se() {
  local input="$1"
  local output="$2"
  local gain="$3"
  ffmpeg -y -hide_banner -loglevel error -i "$input" \
    -af "volume=${gain},afade=t=in:st=0:d=0.01,afade=t=out:st=0:d=0.05" \
    -t 0.35 -ar 44100 -ac 1 -c:a libmp3lame -b:a 96k "$output"
}

fallback_audio() {
  echo "OpenGameArt download unavailable; generating fallback synthesized audio."
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "sine=f=220:d=90,afade=t=in:st=0:d=3" -c:a libmp3lame -b:a 128k "$OUT/bgm/night.mp3"
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "sine=f=392:d=90,volume=.45,afade=t=in:st=0:d=2" -c:a libmp3lame -b:a 128k "$OUT/bgm/day.mp3"
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "anoisesrc=d=90:c=pink,volume=.08" -f lavfi -i "sine=f=110:d=90,volume=.2" -filter_complex "[0:a][1:a]amix=inputs=2" -c:a libmp3lame -b:a 128k "$OUT/bgm/rain.mp3"
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "sine=f=523.25:d=90,volume=.35" -f lavfi -i "sine=f=783.99:d=90,volume=.16" -filter_complex "[0:a][1:a]amix=inputs=2" -c:a libmp3lame -b:a 128k "$OUT/bgm/stars.mp3"
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "sine=f=82.41:d=90,volume=.35" -f lavfi -i "sine=f=87.31:d=90,volume=.25" -filter_complex "[0:a][1:a]amix=inputs=2" -c:a libmp3lame -b:a 128k "$OUT/bgm/tension.mp3"
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "sine=f=261.63:d=90,volume=.3" -f lavfi -i "sine=f=392:d=90,volume=.22" -filter_complex "[0:a][1:a]amix=inputs=2" -c:a libmp3lame -b:a 128k "$OUT/bgm/ending.mp3"
  for pair in "click 900 .06" "choice 620 .12" "save 880 .2" "pageTurn 360 .09"; do
    set -- $pair
    ffmpeg -y -hide_banner -loglevel error -f lavfi -i "sine=f=$2:d=$3,afade=t=out:st=0:d=$3" -c:a libmp3lame -b:a 96k "$OUT/se/$1.mp3"
  done
}

if ! have_ffmpeg; then
  echo "ffmpeg is required to normalize audio." >&2
  exit 1
fi

if {
  fetch night "$OGA/evening.mp3" "$TMP/evening.mp3" &&
  fetch day "$OGA/TownTheme.mp3" "$TMP/TownTheme.mp3" &&
  fetch rain "$OGA/Rain.mp3" "$TMP/Rain.mp3" &&
  fetch stars "$OGA/spacetheme.mp3" "$TMP/spacetheme.mp3" &&
  fetch tension "$OGA/song21.mp3" "$TMP/song21.mp3" &&
  fetch ending "$OGA/the_field_of_dreams.mp3" "$TMP/field.mp3" &&
  fetch click "$OGA/click.mp3" "$TMP/click.mp3" &&
  fetch choice "$OGA/select.ogg" "$TMP/select.ogg" &&
  fetch save "$OGA/save.mp3" "$TMP/save.mp3" &&
  fetch page "$OGA/click.wav" "$TMP/click.wav";
}; then
  normalize_bgm "$TMP/evening.mp3" "$OUT/bgm/night.mp3"
  normalize_bgm "$TMP/TownTheme.mp3" "$OUT/bgm/day.mp3"
  normalize_bgm "$TMP/Rain.mp3" "$OUT/bgm/rain.mp3" 42
  normalize_bgm "$TMP/spacetheme.mp3" "$OUT/bgm/stars.mp3"
  normalize_bgm "$TMP/song21.mp3" "$OUT/bgm/tension.mp3" 38
  normalize_bgm "$TMP/field.mp3" "$OUT/bgm/ending.mp3"
  normalize_se "$TMP/click.mp3" "$OUT/se/click.mp3" ".85"
  normalize_se "$TMP/select.ogg" "$OUT/se/choice.mp3" ".9"
  normalize_se "$TMP/save.mp3" "$OUT/se/save.mp3" ".75"
  normalize_se "$TMP/click.wav" "$OUT/se/pageTurn.mp3" ".55"
else
  fallback_audio
fi

echo "Audio assets ready in $OUT"
