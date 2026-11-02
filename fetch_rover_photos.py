#!/usr/bin/env python3
"""Pull real rover photos from NASA's Mars Rover Photos API and save them as rover_photos.json
(images embedded as base64, so the globe page can show them without any network access).

Run on your own machine:
    pip install pillow
    set NASA_API_KEY=your_key      (optional; DEMO_KEY works but is rate-limited)
    python fetch_rover_photos.py
Then upload rover_photos.json to the chat.
"""
import base64, io, json, os, sys, time, urllib.request, urllib.parse
from PIL import Image

KEY = os.environ.get("NASA_API_KEY", "DEMO_KEY")
BASE = "https://api.nasa.gov/mars-photos/api/v1/rovers"
# (rover, query) - latest photos for active rovers, a fixed early sol for retired ones
JOBS = [("curiosity", "latest_photos"), ("perseverance", "latest_photos"),
        ("spirit", "photos?sol=100"), ("opportunity", "photos?sol=100")]
PER_ROVER = 3

def get(url, binary=False):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                data = r.read()
                return data if binary else json.loads(data)
        except Exception as e:
            print("  retry", attempt + 1, e, file=sys.stderr); time.sleep(2 * (attempt + 1))
    return None

out = {}
for rover, q in JOBS:
    sep = "&" if "?" in q else "?"
    data = get(f"{BASE}/{rover}/{q}{sep}api_key={urllib.parse.quote(KEY)}")
    photos = (data or {}).get("latest_photos") or (data or {}).get("photos") or []
    print(rover, "->", len(photos), "photos found")
    items = []
    for p in photos[:PER_ROVER * 4]:
        if len(items) >= PER_ROVER: break
        raw = get(p["img_src"].replace("http://", "https://"), binary=True)
        if not raw: continue
        im = Image.open(io.BytesIO(raw)).convert("RGB"); im.thumbnail((560, 560))
        buf = io.BytesIO(); im.save(buf, "JPEG", quality=78)
        items.append({"sol": p["sol"], "date": p["earth_date"], "camera": p["camera"]["full_name"],
                      "img": "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()})
    out[rover] = items

json.dump(out, open("rover_photos.json", "w"), ensure_ascii=False)
print("saved rover_photos.json", sum(len(v) for v in out.values()), "images")
