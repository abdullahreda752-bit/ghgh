# 🚀 ARES // Mars AI Chatbot (Unfiltered Terminal)

A standalone, futuristic Mars-themed AI chatbot powered by Google Gemini via **[Google AI Studio](https://aistudio.google.com/)**.

Designed to answer **freely, without preachy corporate refusals**, using **Gemini 2.0 / 2.5 Flash** and `BLOCK_NONE` safety parameters.

---

## ⚡ Instant Use (Zero Setup Needed)

The terminal comes **pre-configured with your active AI Studio API key** and ready to transmit immediately!

1. Simply double-click **[`index.html`](index.html)** in any browser (Chrome, Edge, Firefox, Safari, Brave).
2. Type any prompt or tap one of the Mars transmission chips to start chatting immediately!
3. (Optional) Anyone who receives this can also swap in their own API key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) via the sidebar.

---

## 🛰️ How to Share & Upload for Free

This entire app is bundled inside a single, zero-dependency `index.html` file!

### Method 1: Send it Directly to Anyone (Instant & Free)
* Send the `index.html` file directly to friends on **Discord, Telegram, WhatsApp, or Email**.
* They can double click it on PC, Mac, Linux, or open it on their phones.

### Method 2: Drag & Drop to Netlify (Free Web Link in 30 Seconds)
1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Drag and drop this folder (or `index.html`).
3. You immediately get a public live URL (e.g. `https://mars-terminal-ai.netlify.app`) that anyone can open from anywhere!

### Method 3: GitHub Pages (Permanent Free Hosting)
1. Create a repository on GitHub (e.g. `mars-ai`).
2. Push or upload `index.html`.
3. In repo **Settings &rarr; Pages**, choose Branch: `main` &rarr; Save.
4. Your terminal will be live at `https://<your-username>.github.io/mars-ai/`!

## 🛰️ Connected Space Telemetry Pipelines (5 Live APIs)

Your Mars chatbot is now grounded with real-time astronomical and planetary data directly alongside the Gemini AI model:

1. **`api.nasa.gov` (NASA APOD & Mars Rovers)**:
   * Retrieves NASA's official Astronomy Picture of the Day (APOD) and high-resolution surface reconnaissance imagery from the **Mars 2020 Perseverance** and **Curiosity** rovers.
2. **`power.larc.nasa.gov` (NASA POWER Meteorological API)**:
   * Real-time surface temperature ($T2M$), solar irradiance ($ALLSKY\_SFC\_SW\_DWN$), and wind speeds, comparing Earth weather with Martian surface conditions.
3. **`earthquake.usgs.gov` (USGS Real-Time Seismic Stream)**:
   * Global seismic tremor monitoring (magnitude, depth, location), integrated for comparative planetology against Martian tectonic activity (NASA InSight lander).
4. **`epic.gsfc.nasa.gov` (NOAA/NASA DSCOVR EPIC Camera)**:
   * Live full-disk natural color imagery of Earth captured from **Lagrange Point 1** (1,000,000 miles away in deep space).
5. **`ssd-api.jpl.nasa.gov` (JPL Small-Body Database - SBDB)**:
   * Real-time asteroid close approaches, miss distances in Astronomical Units ($AU$) and Lunar Distances ($LD$), and relative velocities ($km/s$).

### 💡 How the AI Uses Live Space Data:
* **Interactive Space Data Deck**: Click the **Space Data Deck** button in the top HUD or sidebar to open the multi-tab observation deck.
* **Autonomous In-Chat Grounding**: Simply ask questions in chat like:
  * *"Show me today's NASA picture"*
  * *"Downlink the latest DSCOVR view of Earth"*
  * *"Are any asteroids approaching Earth right now?"*
  * *"Check NASA solar irradiance and compare it with Mars"*
  * *"Compare recent Earth earthquakes with Marsquakes"*
* The terminal automatically retrieves the live telemetry, displays a visual preview card directly in the chat stream, and feeds the factual data into Gemini to analyze it freely and candidly!

---

## 🔴 Features Built-In

* **Uncensored & Direct Exploration**:
  * Set to `BLOCK_NONE` across all harm categories for maximum intellectual freedom.
  * System instructions tuned for scientific, unfiltered, and deeply articulate responses with zero lecturing.
* **Mars Sci-Fi HUD Interface**:
  * Dynamic Sol clock calculation.
  * Olympus Mons subsurface colony aesthetic (crimson/amber glow, CRT scanline toggle).
  * Synthesized Web Audio sound-effects (no audio files needed, works offline).
* **Multiple Personas**:
  * **ARES Unbound**: Direct, candid, unfiltered planetary AI.
  * **Colony Commander**: Decisive, gritty frontier survival commander.
  * **Mars Terraformer**: Deep planetary engineering & astrophysics.
  * **Custom Instructions**: Write whatever persona or rules you want.
* **Full Markdown & Code Syntax Highlighting**:
  * Real-time streaming response typewriter.
  * Pre-formatted code blocks with one-click **Copy Code** buttons.
* **Session Controls**:
  * Clear chat or **Save / Export as Markdown (`.md`)**.
