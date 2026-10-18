# freaky gurl 💋

> *“psst… someone made a little something for you.”*

A dark, flirty, modern, aesthetic digital gift website made especially for **Clair**. Features an interactive 3D animated envelope with a heart-shaped wax seal, realistic typewriter letter reveal, a mini music room with grooved vinyl disc and audio visualizer, interactive surprise cards, a mood switcher, and a safe message composer.

Built with **vanilla HTML5, CSS3, and JavaScript** with zero frameworks, zero external dependencies, and zero backend required. Designed to work seamlessly on local machines and on **free GitHub Pages hosting**.

---

## 📁 Project Structure

```text
freaky-gurl/
├── index.html           # Main semantic HTML structure
├── styles.css           # Aesthetic dark & burgundy styles, responsive layouts
├── script.js            # Configuration, typing engine, audio player & interactions
├── favicon.svg          # Custom lips & neon glow icon
├── README.md            # Beginner-friendly setup & deployment guide
└── assets/
    ├── images/
    │   └── cover-1.jpg  # Album artwork & visual preview
    └── music/
        └── .gitkeep     # Location to drop your favorite MP3 files
```

---

## 🚀 How to Open and Test Locally

Because this project is built entirely with modern web standards, you can run it right in your browser without compiling anything:

1. **Direct file open**: Double-click `index.html` to open it directly in Google Chrome, Safari, Firefox, or Microsoft Edge.
2. **VS Code Live Server (Recommended)**:
   - Open the `freaky-gurl` folder in VS Code.
   - Right-click `index.html` and click **"Open with Live Server"**.
3. **Python Simple HTTP Server** (Optional):
   ```bash
   # Run in the project directory
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in your web browser.

---

## 💌 How to Personalize the Website

All customizable settings are located conveniently at the very top of `script.js` in the `CONFIG` object:

```javascript
const CONFIG = {
  // 1. Recipient Nickname & Titles
  RECIPIENT_NAME: "Clair",
  WEBSITE_TITLE: "freaky gurl 💋",
  SUBTITLE: "psst… someone made a little something for you.",

  // 2. Personal Letter Text
  // You can write whatever you'd like; line breaks and emojis are preserved!
  LETTER_MESSAGE: `hey clairrr 💋...`,

  // 3. Surprise Quotes
  // Random compliments that appear when Clair clicks "One more surprise? 👀"
  SURPRISE_QUOTES: [ ... ],

  // 4. Final Card Note
  FINAL_NOTE: `i hope this little surprise made you smile, clair. 💗...`,

  // 5. Messaging Destination (See below)
  MESSAGING_DESTINATION: {
    type: 'clipboard', // 'clipboard' | 'whatsapp' | 'sms' | 'email'
    target: '',
    serviceName: 'Your Favorite Chat'
  }
};
```

---

## 🎧 How to Add Local MP3 Music & Change Artwork

### 1. Built-in Peaceful Chimes
The website comes with a **built-in Peaceful Midnight Chimes** ambient generator powered directly by the Web Audio API! This means Clair can listen to peaceful romantic chimes **instantly**, even before you upload any MP3 files.

### 2. Adding Your Own MP3 Tracks
To add your favorite songs:
1. Place your licensed MP3 files inside the `assets/music/` folder:
   - `assets/music/track-1.mp3`
   - `assets/music/track-2.mp3`
   - `assets/music/track-3.mp3`
   - etc.
2. In `script.js`, scroll to `CONFIG.PLAYLIST` and verify or update the track titles, artists, and durations:
   ```javascript
   {
     id: 'track-1',
     title: 'Your Song Title',
     artist: 'Artist Name',
     src: './assets/music/track-1.mp3',
     cover: './assets/images/cover-1.jpg',
     duration: '3:24',
     isBuiltin: false
   }
   ```
3. Save `script.js` and reload the page!

### 3. Replacing Album Artwork
- Place your image inside `assets/images/` (e.g. `assets/images/cover-1.jpg`).
- Square `1:1` images look best inside the spinning vinyl disc!

---

## 💬 Configuring the Messaging Destination

In `script.js`, under `CONFIG.MESSAGING_DESTINATION`:

- **Clipboard Copy (Default & Safest)**:
  ```javascript
  MESSAGING_DESTINATION: {
    type: 'clipboard',
    target: '',
    serviceName: 'Your Favorite Chat'
  }
  ```
  Copies Clair's message directly to her clipboard so she can paste it into whatever chat app you two use, without exposing your private phone number or email publicly in the code.

- **WhatsApp**:
  ```javascript
  MESSAGING_DESTINATION: {
    type: 'whatsapp',
    target: '1234567890', // Your phone number with country code (no '+' or dashes)
    serviceName: 'WhatsApp'
  }
  ```

- **SMS**:
  ```javascript
  MESSAGING_DESTINATION: {
    type: 'sms',
    target: '1234567890',
    serviceName: 'iMessage / SMS'
  }
  ```

- **Email**:
  ```javascript
  MESSAGING_DESTINATION: {
    type: 'email',
    target: 'yourname@example.com',
    serviceName: 'Email'
  }
  ```

---

## 🌐 Deploying to Free GitHub Pages (Step-by-Step)

You can host this website completely free using GitHub Pages:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click the **`+`** icon in the top right and select **New repository**.
3. Name your repository (for example: `freaky-gurl`).
4. Keep it **Public** (required for free GitHub Pages).
5. Click **Create repository**.

### Step 2: Upload Project Files
1. On your new repository page, click **uploading an existing file**.
2. Drag and drop all project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `favicon.svg`
   - `README.md`
   - The entire `assets` folder (containing `music/` and `images/`).
3. In the "Commit changes" box, type `Initial commit: freaky gurl for Clair` and click **Commit changes**.

### Step 3: Enable GitHub Pages
1. In your repository, click the **Settings** tab.
2. In the left sidebar under "Code and automation", click **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**.
   - Branch: Select **`main`** (or `master`) and directory **`/ (root)`**.
4. Click **Save**.

### Step 4: Access Your Live Website URL
- After 1–2 minutes, GitHub will publish your site!
- Refresh the Pages settings page to see your live URL:
  `https://<your-username>.github.io/freaky-gurl/`
- Send this private link to Clair! 💋

---

## 🛠️ Troubleshooting Common Issues

### 1. 404 Not Found on GitHub Pages
- Ensure `index.html` is located directly in the root of the repository, not inside a subfolder like `freaky-gurl/index.html`.
- Double-check that your GitHub Pages setting is set to `/ (root)`.
- GitHub Pages URLs are case-sensitive.

### 2. Audio or Images Not Loading
- Always use relative paths: `./styles.css`, `./script.js`, `./assets/images/cover-1.jpg`, `./assets/music/track-1.mp3`.
- Never use absolute paths starting with `/` (like `/assets/...`), as GitHub project pages are hosted on subpaths (e.g. `username.github.io/repo-name/`).

### 3. Autoplay Policies
- Web browsers automatically block audio from playing without user interaction.
- The player will start playing smoothly as soon as Clair taps **Play** or clicks any track in the playlist!

---

## ✨ Features & Polish

- **Mobile First**: Optimized touch controls and fluid typography across Android phones, iPhones, tablets, and desktops.
- **Realistic 3D Envelope**: Rotating flap, smooth wax seal fade, and sliding letter reveal.
- **Human Typing Engine**: Dynamic typing rhythm with Skip and Pause/Resume controls.
- **Glassmorphism Aesthetic**: Deep midnight purple, velvety cherry burgundy, and neon magenta highlights.
- **Interactive Sparkles**: Tapping anywhere creates floating mini glowing hearts and sparkles.
- **Audio Visualizer**: Live bouncing equalizer bars that synchronize with playback.
- **Accessibility**: ARIA labels, semantic landmark elements, keyboard navigation (`Tab`, `Enter`, `Escape`), and `prefers-reduced-motion` compliance.
