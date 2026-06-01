#!/bin/bash
# Generate ambient BGM and SE using ffmpeg (royalty-free synthesized)
set -e
OUT="$(dirname "$0")/../public/assets"
mkdir -p "$OUT/bgm" "$OUT/se"

# night - quiet piano-like pad
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=220:d=90,afade=t=in:st=0:d=3" \
  -f lavfi -i "sine=f=329.63:d=90,volume=0.3" \
  -f lavfi -i "sine=f=261.63:d=90,volume=0.2" \
  -filter_complex "[0:a][1:a][2:a]amix=inputs=3:duration=first,volume=0.35" \
  -t 90 -c:a libmp3lame -b:a 128k "$OUT/bgm/night.mp3"

# day - brighter
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=392:d=90,volume=0.25" \
  -f lavfi -i "sine=f=493.88:d=90,volume=0.2" \
  -f lavfi -i "sine=f=587.33:d=90,volume=0.15" \
  -filter_complex "[0:a][1:a][2:a]amix=inputs=3:duration=first,volume=0.3" \
  -t 90 -c:a libmp3lame -b:a 128k "$OUT/bgm/day.mp3"

# rain - noise + low tone
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "anoisesrc=d=90:c=pink,volume=0.08,afade=t=in:st=0:d=2" \
  -f lavfi -i "sine=f=110:d=90,volume=0.15" \
  -filter_complex "[0:a][1:a]amix=inputs=2:duration=first" \
  -t 90 -c:a libmp3lame -b:a 128k "$OUT/bgm/rain.mp3"

# stars - high ethereal
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=523.25:d=90,volume=0.2" \
  -f lavfi -i "sine=f=659.25:d=90,volume=0.15" \
  -f lavfi -i "sine=f=783.99:d=90,volume=0.1" \
  -filter_complex "[0:a][1:a][2:a]amix=inputs=3:duration=first,volume=0.28" \
  -t 90 -c:a libmp3lame -b:a 128k "$OUT/bgm/stars.mp3"

# tension - low pulse
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=82.41:d=90,volume=0.25" \
  -f lavfi -i "sine=f=87.31:d=90,volume=0.2" \
  -filter_complex "[0:a][1:a]amix=inputs=2:duration=first" \
  -t 90 -c:a libmp3lame -b:a 128k "$OUT/bgm/tension.mp3"

# ending - emotional chord
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=261.63:d=90,volume=0.22" \
  -f lavfi -i "sine=f=329.63:d=90,volume=0.2" \
  -f lavfi -i "sine=f=392:d=90,volume=0.18" \
  -f lavfi -i "sine=f=493.88:d=90,volume=0.12" \
  -filter_complex "[0:a][1:a][2:a][3:a]amix=inputs=4:duration=first,volume=0.32" \
  -t 90 -c:a libmp3lame -b:a 128k "$OUT/bgm/ending.mp3"

# SE - short beeps
generate_se() {
  ffmpeg -y -hide_banner -loglevel error \
    -f lavfi -i "sine=f=$2:d=$3,afade=t=out:st=0:d=$3" \
    -c:a libmp3lame -b:a 96k "$OUT/se/$1.mp3"
}
generate_se click 800 0.08
generate_se choice 520 0.12
generate_se save 660 0.15
generate_se pageTurn 400 0.1

echo "Audio generation complete."
