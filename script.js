/**
 * ============================================================================
 * FREAKY GURL 💋 — CLIENT SCRIPT
 * Made with care for Clair.
 * Vanilla JavaScript (No frameworks, No build tools, 100% GitHub Pages ready).
 * ============================================================================
 */

/* ============================================================================
   1. CUSTOMIZATION CONFIGURATION
   Edit your personal messages, recipient name, playlist, and links here!
   All values are safely injected into the DOM using textContent to prevent XSS.
   ============================================================================ */
const CONFIG = {
  // Recipient details
  RECIPIENT_NAME: "Clair",
  WEBSITE_TITLE: "freaky gurl 💋",
  SUBTITLE: "psst… someone made a little something for you.",

  // The personal starter message revealed inside the letter
  LETTER_MESSAGE: `hey clairrr 💋

sooo… i made this little corner of the internet just for you. don't laugh at me okay? 😭

i wanted to give you something a little different, something you could open whenever you feel like smiling.

not gonna lie, you have this way of making ordinary conversations feel a little more interesting. and even with all the distance between us, i'm glad we got to know each other.

so here's your tiny little corner, just for you. explore it, play some music, and enjoy the surprise.

and yes, you can blame me for being a little cheesy today. 🙄💗

anyway, pretty girl… enjoy your little surprise. no pressure, just vibes. 💋`,

  // Surprise quotes for Option C ("One more surprise? 👀")
  SURPRISE_QUOTES: [
    "caught you exploring this little corner hehe 💋",
    "you deserve a ridiculously good day today.",
    "okay, admit it… the envelope was kinda cute 😭",
    "sending you one tiny virtual hug from over here.",
    "your smile deserves its own soundtrack.",
    "plot twist: this website was made with extra effort just for you.",
    "ingat ka palagi, pretty girl 💗",
    "okay, go on… explore the rest of the page.",
    "you're effortlessly charming, you know that right? ✨",
    "reminder: take a sip of water and be proud of yourself today 🌸"
  ],

  // Mood responses for the "Pick your vibe" cards
  MOOD_RESPONSES: {
    soft: "okay, we're being cute today. soft girl hours activated 🌸",
    chaotic: "HELP 😭 what is this energy… you're unhinged and i love it.",
    mysterious: "you know something… or do you? 👀 keep them guessing 🖤"
  },

  // Final card text
  FINAL_NOTE: `i hope this little surprise made you smile, clair. 💗

even if we're miles apart, i hope your days are filled with good music, kind people, and little things worth smiling about.

ingat ka palagi, okay?

made with care, just for you. 💋`,

  /**
   * Optional messaging destination configuration for "Send me a message 💌"
   * Supported types:
   *  - 'clipboard' : Copies to Clair's clipboard so she can paste in Instagram / Messenger / WhatsApp.
   *  - 'whatsapp'  : Opens https://wa.me/<number>?text=... (Set target: '1234567890' with country code)
   *  - 'sms'       : Opens sms:<number>?body=...
   *  - 'email'     : Opens mailto:<email>?subject=...
   * Default is 'clipboard' so it works privately without revealing numbers.
   */
  MESSAGING_DESTINATION: {
    type: 'clipboard', // 'clipboard' | 'whatsapp' | 'sms' | 'email'
    target: '',        // e.g., '1234567890' or 'hello@example.com'
    serviceName: 'Your Favorite Chat'
  },

  /**
   * Playlist configuration.
   * Track 0 is the built-in serene ambient chimes generator (synthesized via Web Audio API,
   * so Clair can immediately listen to peaceful music even without uploading MP3s!).
   * Tracks 1 to 5 point to your local assets in "assets/music/".
   */
  PLAYLIST: [
    {
      id: 'ambient-chimes',
      title: 'peaceful midnight chimes ✨',
      artist: 'built-in ambient generator',
      src: 'builtin:ambient',
      cover: './assets/images/cover-1.jpg',
      duration: 'Ambient Stream',
      isBuiltin: true
    },
    {
      id: 'track-1',
      title: 'midnight whispers',
      artist: 'local track 01',
      src: './assets/music/track-1.mp3',
      cover: './assets/images/cover-1.jpg',
      duration: '3:24',
      isBuiltin: false
    },
    {
      id: 'track-2',
      title: 'for clair (slowed & reverbed)',
      artist: 'local track 02',
      src: './assets/music/track-2.mp3',
      cover: './assets/images/cover-1.jpg',
      duration: '2:56',
      isBuiltin: false
    },
    {
      id: 'track-3',
      title: 'late night drive thoughts',
      artist: 'local track 03',
      src: './assets/music/track-3.mp3',
      cover: './assets/images/cover-1.jpg',
      duration: '3:40',
      isBuiltin: false
    },
    {
      id: 'track-4',
      title: 'secret corner melody',
      artist: 'local track 04',
      src: './assets/music/track-4.mp3',
      cover: './assets/images/cover-1.jpg',
      duration: '3:15',
      isBuiltin: false
    },
    {
      id: 'track-5',
      title: 'you make ordinary fun',
      artist: 'local track 05',
      src: './assets/music/track-5.mp3',
      cover: './assets/images/cover-1.jpg',
      duration: '4:02',
      isBuiltin: false
    }
  ]
};

/* ============================================================================
   2. DOM ELEMENT REFERENCES
   ============================================================================ */
const DOM = {
  // Envelope elements
  envelopeWrapper: document.getElementById('envelope-wrapper'),
  envelopeBox: document.getElementById('envelope-box'),
  waxSeal: document.getElementById('wax-seal'),
  envelopeHintBtn: document.getElementById('envelope-hint-btn'),

  // Letter elements
  letterSection: document.getElementById('letter') || document.getElementById('letter-section'),
  letterBody: document.getElementById('letter-body'),
  typingCursor: document.getElementById('typing-cursor'),
  skipTypingBtn: document.getElementById('skip-typing-btn'),
  pauseTypingBtn: document.getElementById('pause-typing-btn'),

  // Choices elements
  choicesSection: document.getElementById('choices') || document.getElementById('choices-section'),
  choiceMessageBtn: document.getElementById('choice-message-btn'),
  choiceMusicBtn: document.getElementById('choice-music-btn'),
  choiceSurpriseBtn: document.getElementById('choice-surprise-btn'),
  surpriseBox: document.getElementById('surprise-box'),
  surpriseQuote: document.getElementById('surprise-quote'),
  surpriseRefreshBtn: document.getElementById('surprise-refresh-btn'),

  // Music Player elements
  musicSection: document.getElementById('music') || document.getElementById('music-section'),
  musicCard: document.getElementById('music-card'),
  audioElement: document.getElementById('native-audio'),
  vinylDisc: document.getElementById('vinyl-disc'),
  vinylArtImg: document.getElementById('vinyl-art-img'),
  visualizer: document.getElementById('audio-visualizer'),
  currentTrackTitle: document.getElementById('current-track-title'),
  currentArtistName: document.getElementById('current-artist-name'),
  trackSourceBadge: document.getElementById('track-source-badge'),
  playPauseBtn: document.getElementById('play-pause-btn'),
  playPauseIcon: document.getElementById('play-pause-icon'),
  prevTrackBtn: document.getElementById('prev-track-btn'),
  nextTrackBtn: document.getElementById('next-track-btn'),
  seekSlider: document.getElementById('seek-slider'),
  currentTimeDisplay: document.getElementById('current-time'),
  totalDurationDisplay: document.getElementById('total-duration'),
  volumeSlider: document.getElementById('volume-slider'),
  muteToggleBtn: document.getElementById('mute-toggle-btn'),
  muteIcon: document.getElementById('mute-icon'),
  shuffleBtn: document.getElementById('shuffle-btn'),
  repeatBtn: document.getElementById('repeat-btn'),
  repeatIcon: document.getElementById('repeat-icon'),
  playlistContainer: document.getElementById('playlist-items'),
  audioErrorBanner: document.getElementById('audio-status-banner'),
  audioErrorText: document.getElementById('audio-error-text'),
  audioGuideToggle: document.getElementById('audio-guide-toggle'),
  audioGuideContent: document.getElementById('audio-guide-content'),

  // Vibe elements
  vibeCards: document.querySelectorAll('.vibe-card'),
  vibeResponseBox: document.getElementById('vibe-response-box'),

  // Final section
  finalMessage: document.getElementById('final-message'),
  replayLetterBtn: document.getElementById('replay-letter-btn'),

  // Message modal
  messageModal: document.getElementById('message-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  cancelModalBtn: document.getElementById('cancel-modal-btn'),
  messageTextarea: document.getElementById('message-textarea'),
  charCount: document.getElementById('char-count'),
  clearMessageBtn: document.getElementById('clear-message-btn'),
  copyMessageBtn: document.getElementById('copy-message-btn'),
  sendMessageBtn: document.getElementById('send-message-btn'),
  modalStatus: document.getElementById('modal-status'),
  modalExplainNote: document.getElementById('modal-explain-note'),

  // Freaky Arcade Game elements
  gamepadBtn: document.getElementById('gamepad-btn'),
  choiceGameBtn: document.getElementById('choice-game-btn'),
  gameModal: document.getElementById('game-modal'),
  closeGameModalBtn: document.getElementById('close-game-modal-btn'),
  gameSoundToggleBtn: document.getElementById('game-sound-toggle-btn'),
  gameSoundIcon: document.getElementById('game-sound-icon'),
  gameHighScoreTag: document.getElementById('game-high-score-tag'),
  gameScore: document.getElementById('game-score'),
  gameGoal: document.getElementById('game-goal'),
  gameLives: document.getElementById('game-lives'),
  gameStreak: document.getElementById('game-streak'),
  gameTimer: document.getElementById('game-timer'),
  gameArena: document.getElementById('game-arena'),
  gameStartScreen: document.getElementById('game-start-screen'),
  gameOverScreen: document.getElementById('game-over-screen'),
  gameWonScreen: document.getElementById('game-won-screen'),
  gameWonScore: document.getElementById('game-won-score'),
  startGameBtn: document.getElementById('start-game-btn'),
  restartGameBtn: document.getElementById('restart-game-btn'),
  wonRestartBtn: document.getElementById('won-restart-btn'),
  wonKeepBtn: document.getElementById('won-keep-btn'),
  gameFinalScore: document.getElementById('game-final-score'),
  gameRankBadge: document.getElementById('game-rank-badge'),
  gameComplimentReveal: document.getElementById('game-compliment-reveal'),
  laneBtns: [
    document.getElementById('lane-btn-0'),
    document.getElementById('lane-btn-1'),
    document.getElementById('lane-btn-2')
  ],

  // Interactive tap container & canvas
  particleCanvas: document.getElementById('particle-canvas'),
  heartTapContainer: document.getElementById('heart-tap-container')
};

/* ============================================================================
   3. LETTER TYPING CONTROLLER
   ============================================================================ */
class LetterTypingController {
  constructor(message, textElement, cursorElement, onComplete) {
    this.fullMessage = message;
    this.textElement = textElement;
    this.cursorElement = cursorElement;
    this.onComplete = onComplete;
    this.currentIndex = 0;
    this.isPaused = false;
    this.isFinished = false;
    this.timer = null;
  }

  start() {
    this.reset();
    this.typeNextChar();
  }

  typeNextChar() {
    if (this.isFinished) return;

    if (this.currentIndex < this.fullMessage.length) {
      if (!this.isPaused) {
        // Handle multi-character emojis or code points smoothly
        const nextChar = this.fullMessage.charAt(this.currentIndex);
        this.textElement.textContent += nextChar;
        this.currentIndex++;

        // Add human-like typing rhythm: longer pauses after punctuation or line breaks
        let delay = 24 + Math.random() * 22;
        if (nextChar === '\n') {
          delay = 180;
        } else if (['.', '!', '?', ','].includes(nextChar)) {
          delay = 140;
        }

        this.timer = setTimeout(() => this.typeNextChar(), delay);
      }
    } else {
      this.finish();
    }
  }

  pause() {
    this.isPaused = true;
    if (this.timer) clearTimeout(this.timer);
    if (DOM.pauseTypingBtn) {
      DOM.pauseTypingBtn.textContent = 'Resume ▶';
      DOM.pauseTypingBtn.setAttribute('aria-label', 'Resume typing');
    }
  }

  resume() {
    if (this.isFinished) return;
    this.isPaused = false;
    if (DOM.pauseTypingBtn) {
      DOM.pauseTypingBtn.textContent = 'Pause ⏸';
      DOM.pauseTypingBtn.setAttribute('aria-label', 'Pause typing');
    }
    this.typeNextChar();
  }

  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  skip() {
    if (this.timer) clearTimeout(this.timer);
    this.textElement.textContent = this.fullMessage;
    this.currentIndex = this.fullMessage.length;
    this.finish();
  }

  finish() {
    this.isFinished = true;
    if (this.timer) clearTimeout(this.timer);
    if (this.cursorElement) {
      this.cursorElement.classList.add('done');
    }
    if (DOM.pauseTypingBtn) {
      DOM.pauseTypingBtn.style.display = 'none';
    }
    if (DOM.skipTypingBtn) {
      DOM.skipTypingBtn.style.display = 'none';
    }
    if (typeof this.onComplete === 'function') {
      this.onComplete();
    }
  }

  reset() {
    if (this.timer) clearTimeout(this.timer);
    this.currentIndex = 0;
    this.isPaused = false;
    this.isFinished = false;
    this.textElement.textContent = '';
    if (this.cursorElement) {
      this.cursorElement.classList.remove('done');
    }
    if (DOM.pauseTypingBtn) {
      DOM.pauseTypingBtn.textContent = 'Pause ⏸';
      DOM.pauseTypingBtn.style.display = 'inline-flex';
    }
    if (DOM.skipTypingBtn) {
      DOM.skipTypingBtn.style.display = 'inline-flex';
    }
  }
}

let typingEngine = null;

/* ============================================================================
   4. WEB AUDIO API SYNTHESIZER (PEACEFUL AMBIENT CHIMES GENERATOR)
   Enables high-fidelity, serene romantic audio without requiring any external file!
   ============================================================================ */
class PeacefulAmbientSynth {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.chimeTimer = null;
    this.gainNode = null;
    // Pentatonic scale frequencies for dreamy, non-dissonant ambient chimes
    this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
        this.gainNode.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  start() {
    this.init();
    if (!this.audioCtx) return;
    this.isPlaying = true;
    this.scheduleNextChime();
  }

  stop() {
    this.isPlaying = false;
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
  }

  scheduleNextChime() {
    if (!this.isPlaying || !this.audioCtx) return;

    this.playChimeNote();

    // Schedule next bell note every 1.2 to 2.8 seconds
    const interval = 1200 + Math.random() * 1600;
    this.chimeTimer = setTimeout(() => this.scheduleNextChime(), interval);
  }

  playChimeNote() {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const osc = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    // Filter to give warm, analog, peaceful tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

    // Pick random note from peaceful pentatonic scale
    const freq = this.scale[Math.floor(Math.random() * this.scale.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    const now = this.audioCtx.currentTime;
    // Bell envelope: instant soft attack, gentle exponential decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 3.5);
  }

  setVolume(volumeFraction) {
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volumeFraction * 0.4)), this.audioCtx.currentTime);
    }
  }
}

const ambientSynth = new PeacefulAmbientSynth();

/* ============================================================================
   5. MUSIC PLAYER CONTROLLER
   Full local audio player support, real HTML5 audio events, playlist management,
   error handling, volume, shuffle, repeat, and visualizer synchronization.
   ============================================================================ */
class MusicPlayerController {
  constructor(playlist, dom) {
    this.playlist = playlist;
    this.dom = dom;
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.previousVolume = 0.8;
    this.shuffleMode = false;
    this.repeatMode = 'all'; // 'off' | 'all' | 'one'
    this.ambientInterval = null;
    this.ambientElapsed = 0;

    this.init();
  }

  init() {
    this.renderPlaylist();
    this.loadTrack(0, false);
    this.bindEvents();
    this.dom.volumeSlider.value = this.previousVolume * 100;
    this.dom.audioElement.volume = this.previousVolume;
  }

  bindEvents() {
    // Play/Pause button
    this.dom.playPauseBtn.addEventListener('click', () => this.togglePlayPause());

    // Next / Prev buttons
    this.dom.nextTrackBtn.addEventListener('click', () => this.nextTrack());
    this.dom.prevTrackBtn.addEventListener('click', () => this.prevTrack());

    // Seek Slider
    this.dom.seekSlider.addEventListener('input', (e) => this.onSeekInput(e));
    this.dom.seekSlider.addEventListener('change', (e) => this.onSeekChange(e));

    // Volume & Mute
    this.dom.volumeSlider.addEventListener('input', (e) => this.onVolumeChange(e));
    this.dom.muteToggleBtn.addEventListener('click', () => this.toggleMute());

    // Shuffle & Repeat
    this.dom.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    this.dom.repeatBtn.addEventListener('click', () => this.cycleRepeat());

    // Native Audio Events
    this.dom.audioElement.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.dom.audioElement.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    this.dom.audioElement.addEventListener('ended', () => this.onTrackEnded());
    this.dom.audioElement.addEventListener('play', () => this.onPlayState(true));
    this.dom.audioElement.addEventListener('pause', () => this.onPlayState(false));
    this.dom.audioElement.addEventListener('error', (e) => this.onAudioError(e));

    // Audio guide collapse
    if (this.dom.audioGuideToggle) {
      this.dom.audioGuideToggle.addEventListener('click', () => {
        this.dom.audioGuideContent.classList.toggle('is-open');
      });
    }
  }

  renderPlaylist() {
    this.dom.playlistContainer.innerHTML = '';
    this.playlist.forEach((track, idx) => {
      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.className = `playlist-item ${idx === this.currentTrackIndex ? 'is-playing' : ''}`;
      itemBtn.setAttribute('data-index', idx);
      itemBtn.setAttribute('aria-label', `Play ${track.title} by ${track.artist}`);

      itemBtn.innerHTML = `
        <div class="playlist-item-left">
          <span class="playlist-item-idx">${track.isBuiltin ? '✨' : String(idx).padStart(2, '0')}</span>
          <div class="playlist-item-info">
            <div class="playlist-item-title">${this.escapeHTML(track.title)}</div>
            <div class="playlist-item-artist">${this.escapeHTML(track.artist)}</div>
          </div>
        </div>
        <span class="playlist-item-dur">${this.escapeHTML(track.duration || '')}</span>
      `;

      itemBtn.addEventListener('click', () => {
        this.loadTrack(idx, true);
      });

      this.dom.playlistContainer.appendChild(itemBtn);
    });
  }

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  loadTrack(index, autoplay = false) {
    this.clearAudioError();
    this.currentTrackIndex = index;
    const track = this.playlist[index];

    // Update Track UI
    this.dom.currentTrackTitle.textContent = track.title;
    this.dom.currentArtistName.textContent = track.artist;
    this.dom.trackSourceBadge.textContent = track.isBuiltin ? '✨ Ambient Synth' : '🎧 Local Track';
    if (track.cover) {
      this.dom.vinylArtImg.src = track.cover;
    }

    // Update active playlist item
    const items = this.dom.playlistContainer.querySelectorAll('.playlist-item');
    items.forEach((item, i) => {
      item.classList.toggle('is-playing', i === index);
    });

    // Reset seek slider
    this.dom.seekSlider.value = 0;
    this.dom.currentTimeDisplay.textContent = '0:00';
    this.dom.totalDurationDisplay.textContent = track.duration || '0:00';

    if (track.isBuiltin) {
      // Pause native audio element
      this.dom.audioElement.pause();
      this.dom.audioElement.removeAttribute('src');

      if (autoplay) {
        this.playAmbient();
      } else {
        this.pause();
      }
    } else {
      // Stop ambient synth if running
      ambientSynth.stop();
      if (this.ambientInterval) clearInterval(this.ambientInterval);

      this.dom.audioElement.src = track.src;
      this.dom.audioElement.load();

      if (autoplay) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  play() {
    const track = this.playlist[this.currentTrackIndex];
    if (track.isBuiltin) {
      this.playAmbient();
      return;
    }

    this.dom.audioElement.play().then(() => {
      this.onPlayState(true);
    }).catch((err) => {
      console.warn('Audio playback rejected or missing file:', err);
      this.handleMissingFile(track);
    });
  }

  playAmbient() {
    ambientSynth.start();
    this.onPlayState(true);
    this.dom.totalDurationDisplay.textContent = '∞ Live';

    // Simulate pleasant ambient timer progression for visual scrub
    if (this.ambientInterval) clearInterval(this.ambientInterval);
    this.ambientInterval = setInterval(() => {
      if (!this.isPlaying) return;
      this.ambientElapsed++;
      this.dom.currentTimeDisplay.textContent = this.formatTime(this.ambientElapsed);
      this.dom.seekSlider.value = (this.ambientElapsed % 60);
    }, 1000);
  }

  pause() {
    const track = this.playlist[this.currentTrackIndex];
    if (track.isBuiltin) {
      ambientSynth.stop();
      if (this.ambientInterval) clearInterval(this.ambientInterval);
    } else {
      this.dom.audioElement.pause();
    }
    this.onPlayState(false);
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack() {
    let nextIndex;
    if (this.shuffleMode) {
      if (this.playlist.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * this.playlist.length);
        } while (nextIndex === this.currentTrackIndex);
      } else {
        nextIndex = 0;
      }
    } else {
      nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    }
    this.loadTrack(nextIndex, true);
  }

  prevTrack() {
    const track = this.playlist[this.currentTrackIndex];
    // If more than 3 seconds in, restart track
    if (!track.isBuiltin && this.dom.audioElement.currentTime > 3) {
      this.dom.audioElement.currentTime = 0;
      return;
    }

    let prevIndex = this.currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.playlist.length - 1;
    }
    this.loadTrack(prevIndex, true);
  }

  onPlayState(playing) {
    this.isPlaying = playing;

    // Toggle vinyl spin
    if (playing) {
      this.dom.vinylDisc.classList.add('is-spinning');
      this.dom.visualizer.classList.add('is-active');
      this.dom.playPauseBtn.setAttribute('aria-label', 'Pause music');
      this.dom.playPauseIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
        <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
      `;
    } else {
      this.dom.vinylDisc.classList.remove('is-spinning');
      this.dom.visualizer.classList.remove('is-active');
      this.dom.playPauseBtn.setAttribute('aria-label', 'Play music');
      this.dom.playPauseIcon.innerHTML = `
        <polygon points="5,3 19,12 5,21" fill="currentColor"/>
      `;
    }
  }

  onTimeUpdate() {
    const track = this.playlist[this.currentTrackIndex];
    if (track.isBuiltin) return;

    const current = this.dom.audioElement.currentTime;
    const duration = this.dom.audioElement.duration;

    if (!isNaN(current)) {
      this.dom.currentTimeDisplay.textContent = this.formatTime(current);
      if (!isNaN(duration) && duration > 0) {
        this.dom.seekSlider.value = (current / duration) * 100;
      }
    }
  }

  onLoadedMetadata() {
    const duration = this.dom.audioElement.duration;
    if (!isNaN(duration)) {
      this.dom.totalDurationDisplay.textContent = this.formatTime(duration);
    }
  }

  onSeekInput(e) {
    const track = this.playlist[this.currentTrackIndex];
    if (track.isBuiltin) return;

    const percent = parseFloat(e.target.value);
    const duration = this.dom.audioElement.duration;
    if (!isNaN(duration)) {
      const targetTime = (percent / 100) * duration;
      this.dom.currentTimeDisplay.textContent = this.formatTime(targetTime);
    }
  }

  onSeekChange(e) {
    const track = this.playlist[this.currentTrackIndex];
    if (track.isBuiltin) return;

    const percent = parseFloat(e.target.value);
    const duration = this.dom.audioElement.duration;
    if (!isNaN(duration)) {
      this.dom.audioElement.currentTime = (percent / 100) * duration;
    }
  }

  onVolumeChange(e) {
    const vol = parseFloat(e.target.value) / 100;
    this.dom.audioElement.volume = vol;
    ambientSynth.setVolume(vol);
    this.previousVolume = vol;

    if (vol === 0) {
      this.isMuted = true;
      this.updateMuteIcon(true);
    } else {
      this.isMuted = false;
      this.updateMuteIcon(false);
    }
  }

  toggleMute() {
    if (this.isMuted) {
      this.isMuted = false;
      const targetVol = this.previousVolume > 0 ? this.previousVolume : 0.8;
      this.dom.audioElement.volume = targetVol;
      this.dom.volumeSlider.value = targetVol * 100;
      ambientSynth.setVolume(targetVol);
      this.updateMuteIcon(false);
    } else {
      this.previousVolume = this.dom.audioElement.volume;
      this.isMuted = true;
      this.dom.audioElement.volume = 0;
      this.dom.volumeSlider.value = 0;
      ambientSynth.setVolume(0);
      this.updateMuteIcon(true);
    }
  }

  updateMuteIcon(muted) {
    if (muted) {
      this.dom.muteIcon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      `;
      this.dom.muteToggleBtn.setAttribute('aria-label', 'Unmute audio');
    } else {
      this.dom.muteIcon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
      this.dom.muteToggleBtn.setAttribute('aria-label', 'Mute audio');
    }
  }

  toggleShuffle() {
    this.shuffleMode = !this.shuffleMode;
    this.dom.shuffleBtn.classList.toggle('is-active', this.shuffleMode);
    this.dom.shuffleBtn.setAttribute('aria-pressed', this.shuffleMode);
  }

  cycleRepeat() {
    if (this.repeatMode === 'all') {
      this.repeatMode = 'one';
      this.dom.repeatBtn.classList.add('is-active');
      this.dom.repeatBtn.title = 'Repeat: One Track';
      this.dom.repeatIcon.innerHTML = `
        <polyline points="17 1 21 5 17 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="7 23 3 19 7 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="12" y="15" font-size="8" font-family="sans-serif" font-weight="bold" fill="currentColor" text-anchor="middle">1</text>
      `;
    } else if (this.repeatMode === 'one') {
      this.repeatMode = 'off';
      this.dom.repeatBtn.classList.remove('is-active');
      this.dom.repeatBtn.title = 'Repeat: Off';
      this.dom.repeatIcon.innerHTML = `
        <polyline points="17 1 21 5 17 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="7 23 3 19 7 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    } else {
      this.repeatMode = 'all';
      this.dom.repeatBtn.classList.add('is-active');
      this.dom.repeatBtn.title = 'Repeat: All Tracks';
    }
  }

  onTrackEnded() {
    if (this.repeatMode === 'one') {
      this.dom.audioElement.currentTime = 0;
      this.dom.audioElement.play();
    } else if (this.repeatMode === 'all') {
      this.nextTrack();
    } else {
      // Repeat off: stop at end of playlist
      if (this.currentTrackIndex < this.playlist.length - 1) {
        this.nextTrack();
      } else {
        this.pause();
      }
    }
  }

  onAudioError(e) {
    const track = this.playlist[this.currentTrackIndex];
    if (track && !track.isBuiltin) {
      this.handleMissingFile(track);
    }
  }

  handleMissingFile(track) {
    this.onPlayState(false);
    this.dom.audioErrorBanner.classList.add('is-active');
    this.dom.audioErrorText.textContent = `"${track.title}" requires adding "${track.src}" to your assets/music/ folder. You can switch to our Peaceful Midnight Chimes anytime ✨`;
  }

  clearAudioError() {
    this.dom.audioErrorBanner.classList.remove('is-active');
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}

let musicPlayer = null;

/* ============================================================================
   6. FLOATING PARTICLES CANVAS ENGINE
   Subtle star specks and soft drifting glowing hearts. Low-impact rendering.
   ============================================================================ */
class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 640 ? 30 : 60;
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }

    this.render();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: 0.8 + Math.random() * 1.8,
      speedY: 0.15 + Math.random() * 0.45,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: 0.2 + Math.random() * 0.6,
      isHeart: Math.random() > 0.82
    };
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;

      if (p.isHeart) {
        // Draw tiny subtle heart
        this.ctx.fillStyle = `rgba(255, 77, 141, ${p.opacity * 0.75})`;
        this.drawHeart(p.x, p.y, p.radius * 2.2);
      } else {
        // Draw soft twinkling speck
        this.ctx.fillStyle = `rgba(255, 182, 217, ${p.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  drawHeart(x, y, size) {
    this.ctx.save();
    this.ctx.beginPath();
    const topCurveHeight = size * 0.3;
    this.ctx.moveTo(x, y + topCurveHeight);
    this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    this.ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
    this.ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
}

/* ============================================================================
   7. INTERACTIVE HEART BURST ON TAP / CLICK
   Spawns a glowing cute symbol at click position.
   ============================================================================ */
function triggerTapBurst(x, y) {
  if (!DOM.heartTapContainer) return;
  const icons = ['💗', '💋', '✨', '💖', '🌸', '👀'];
  const icon = icons[Math.floor(Math.random() * icons.length)];

  const burstElem = document.createElement('div');
  burstElem.className = 'tap-burst-item';
  burstElem.textContent = icon;
  burstElem.style.left = `${x}px`;
  burstElem.style.top = `${y}px`;

  DOM.heartTapContainer.appendChild(burstElem);

  setTimeout(() => {
    if (burstElem.parentNode) {
      burstElem.parentNode.removeChild(burstElem);
    }
  }, 1200);
}

document.addEventListener('pointerdown', (e) => {
  // Avoid interfering with inputs/buttons
  const targetTag = e.target.tagName.toLowerCase();
  if (targetTag === 'button' || targetTag === 'input' || targetTag === 'textarea' || targetTag === 'a') {
    return;
  }
  triggerTapBurst(e.clientX, e.clientY);
});

/* ============================================================================
   8. ENVELOPE OPENING WORKFLOW
   ============================================================================ */
let envelopeOpened = false;

function getLetterSection() {
  return DOM.letterSection || document.getElementById('letter') || document.querySelector('.letter-section');
}

function getMusicSection() {
  return DOM.musicSection || document.getElementById('music') || document.querySelector('.music-section');
}

function getChoicesSection() {
  return DOM.choicesSection || document.getElementById('choices') || document.querySelector('.choices-section');
}

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  // Open animation classes
  DOM.envelopeWrapper?.classList.add('is-open');
  if (DOM.envelopeHintBtn) {
    DOM.envelopeHintBtn.style.opacity = '0';
    DOM.envelopeHintBtn.style.pointerEvents = 'none';
  }

  // Smooth scroll and reveal letter after flap and card animation
  setTimeout(() => {
    const letterEl = getLetterSection();
    if (letterEl) {
      letterEl.classList.add('is-revealed');
      letterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Start typing
    if (typingEngine) {
      typingEngine.start();
    }
  }, 900);
}

// Envelope keyboard & click bindings
DOM.envelopeWrapper?.addEventListener('click', () => openEnvelope());
DOM.envelopeWrapper?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openEnvelope();
  }
});
DOM.waxSeal?.addEventListener('click', (e) => {
  e.stopPropagation();
  openEnvelope();
});
DOM.envelopeHintBtn?.addEventListener('click', () => openEnvelope());

/* ============================================================================
   9. INTERACTIVE CHOICES & SURPRISE GENERATOR
   ============================================================================ */
let lastSurpriseIndex = -1;

function showRandomSurprise() {
  const quotes = CONFIG.SURPRISE_QUOTES;
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === lastSurpriseIndex && quotes.length > 1);

  lastSurpriseIndex = newIndex;
  if (DOM.surpriseQuote) {
    DOM.surpriseQuote.textContent = `"${quotes[newIndex]}"`;
  }
  if (DOM.surpriseBox) {
    DOM.surpriseBox.classList.add('is-active');
    // Trigger celebratory heart sparkle
    const rect = DOM.surpriseBox.getBoundingClientRect();
    triggerTapBurst(rect.left + rect.width / 2, rect.top + 30);
  }
}

DOM.choiceSurpriseBtn?.addEventListener('click', () => {
  showRandomSurprise();
  DOM.surpriseBox?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

DOM.surpriseRefreshBtn?.addEventListener('click', () => {
  showRandomSurprise();
});

// Option B: Scroll to music room & flash highlight
DOM.choiceMusicBtn?.addEventListener('click', () => {
  const musicEl = getMusicSection();
  if (musicEl) {
    musicEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (DOM.musicCard) {
    DOM.musicCard.classList.remove('highlight-flash');
    void DOM.musicCard.offsetWidth; // Trigger reflow
    DOM.musicCard.classList.add('highlight-flash');
  }
});

/* ============================================================================
   10. MESSAGE COMPOSER MODAL (OPTION A)
   Safe clipboard copy and configurable messaging destination.
   ============================================================================ */
function openMessageModal() {
  DOM.messageModal.classList.add('is-open');
  DOM.messageModal.setAttribute('aria-hidden', 'false');
  DOM.messageTextarea.focus();
  DOM.modalStatus.className = 'modal-status-feedback';
  DOM.modalStatus.textContent = '';

  // Update explanation note
  if (CONFIG.MESSAGING_DESTINATION.type === 'clipboard') {
    DOM.modalExplainNote.textContent = 'Note: Clicking Send or Copy places your message directly on your clipboard so you can paste it into whichever app you talk to them on!';
  } else {
    DOM.modalExplainNote.textContent = `Note: Clicking Send will open ${CONFIG.MESSAGING_DESTINATION.serviceName || 'your messenger'} with your text ready!`;
  }
}

function closeMessageModal() {
  DOM.messageModal.classList.remove('is-open');
  DOM.messageModal.setAttribute('aria-hidden', 'true');
  DOM.choiceMessageBtn.focus();
}

DOM.choiceMessageBtn.addEventListener('click', () => openMessageModal());
DOM.closeModalBtn.addEventListener('click', () => closeMessageModal());
DOM.cancelModalBtn.addEventListener('click', () => closeMessageModal());

// Close modal on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && DOM.messageModal.classList.contains('is-open')) {
    closeMessageModal();
  }
});

// Close modal on backdrop click
DOM.messageModal.addEventListener('click', (e) => {
  if (e.target === DOM.messageModal) {
    closeMessageModal();
  }
});

// Character Counter
DOM.messageTextarea.addEventListener('input', () => {
  const len = DOM.messageTextarea.value.length;
  DOM.charCount.textContent = `${len} / 500`;
  if (len > 500) {
    DOM.charCount.style.color = '#f43f5e';
  } else {
    DOM.charCount.style.color = 'var(--text-subtle)';
  }
});

// Clear Button
DOM.clearMessageBtn.addEventListener('click', () => {
  DOM.messageTextarea.value = '';
  DOM.charCount.textContent = '0 / 500';
  DOM.messageTextarea.focus();
});

// Copy Message Helper
function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for non-https or older browsers
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.left = '-999999px';
    tempTextArea.style.top = '-999999px';
    document.body.appendChild(tempTextArea);
    tempTextArea.focus();
    tempTextArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject(new Error('Copy failed'));
      tempTextArea.remove();
    });
  }
}

DOM.copyMessageBtn.addEventListener('click', () => {
  const msg = DOM.messageTextarea.value.trim();
  if (!msg) {
    showModalFeedback('Please type a message before copying! 💗', 'info');
    return;
  }

  copyTextToClipboard(msg)
    .then(() => {
      showModalFeedback('Message copied to clipboard! Ready to paste into your chat 💌', 'success');
    })
    .catch(() => {
      showModalFeedback('Could not access clipboard automatically. Please select the text and press Ctrl+C / Cmd+C!', 'info');
      DOM.messageTextarea.select();
    });
});

DOM.sendMessageBtn.addEventListener('click', () => {
  const msg = DOM.messageTextarea.value.trim();
  if (!msg) {
    showModalFeedback('Type a little something first! 👀', 'info');
    return;
  }

  const dest = CONFIG.MESSAGING_DESTINATION;

  if (dest.type === 'whatsapp' && dest.target) {
    const url = `https://wa.me/${dest.target}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showModalFeedback('Opening WhatsApp with your message! 💋', 'success');
  } else if (dest.type === 'sms' && dest.target) {
    window.location.href = `sms:${dest.target}?body=${encodeURIComponent(msg)}`;
    showModalFeedback('Opening your messaging app! 💋', 'success');
  } else if (dest.type === 'email' && dest.target) {
    window.location.href = `mailto:${dest.target}?subject=A%20message%20from%20Clair&body=${encodeURIComponent(msg)}`;
    showModalFeedback('Opening your email client! 💋', 'success');
  } else {
    // Default Clipboard Delivery with clear notice
    copyTextToClipboard(msg)
      .then(() => {
        showModalFeedback('Your message has been copied to your clipboard! Paste and send it in your chat with them 💌', 'success');
      })
      .catch(() => {
        showModalFeedback('Please copy your message and send it in your favorite app!', 'info');
        DOM.messageTextarea.select();
      });
  }
});

function showModalFeedback(text, type = 'info') {
  DOM.modalStatus.textContent = text;
  DOM.modalStatus.className = `modal-status-feedback is-visible ${type}`;
}

/* ============================================================================
   11. PICK YOUR VIBE SWITCHER
   ============================================================================ */
DOM.vibeCards.forEach((card) => {
  card.addEventListener('click', () => {
    const mood = card.getAttribute('data-vibe');

    // Update active class
    DOM.vibeCards.forEach((c) => c.classList.remove('is-selected'));
    card.classList.add('is-selected');

    // Update body theme
    document.body.className = `mood-${mood}`;

    // Show mood response
    const responseText = CONFIG.MOOD_RESPONSES[mood] || "vibes unmatched ✨";
    DOM.vibeResponseBox.textContent = `"${responseText}"`;

    const rect = card.getBoundingClientRect();
    triggerTapBurst(rect.left + rect.width / 2, rect.top + 20);
  });
});

/* ============================================================================
   12. REPLAY LETTER EXPERIENCE
   Scrolls up and restarts the letter typing smoothly without interrupting music.
   ============================================================================ */
DOM.replayLetterBtn?.addEventListener('click', () => {
  const letterEl = getLetterSection();
  if (letterEl) {
    letterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (typingEngine) {
    setTimeout(() => {
      typingEngine.start();
    }, 400);
  }
});

/* ============================================================================
   13. ARCADE AUDIO ENGINE (Web Audio API Buffers + Synthesizer)
   Low-latency Web Audio decoding for zero-delay triggers & retro chimes.
   Loaded files: rizz, tf, anime, spiderman
   ============================================================================ */
class ArcadeAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.buffers = {};
    this.preloading = false;
    this.soundDefs = {
      rizz: ['./assets/audio/rizz.mp3', './assets/audio/rizz.wav'],
      anime: ['./assets/audio/anime.mp3', './assets/audio/anime.wav'],
      tf: ['./assets/audio/tf.mp3', './assets/audio/tf.wav'],
      spiderman: ['./assets/audio/spiderman.mp3', './assets/audio/spiderman.wav']
    };
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    if (!this.preloading) {
      this.preloadAll();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  async preloadAll() {
    this.preloading = true;
    for (const key of Object.keys(this.soundDefs)) {
      this.loadSoundBuffer(key);
    }
  }

  async loadSoundBuffer(key) {
    if (!this.audioCtx) return;
    const urls = this.soundDefs[key];
    if (!urls) return;

    for (const url of urls) {
      try {
        const resp = await fetch(url);
        if (!resp.ok) continue;
        const arrayBuf = await resp.arrayBuffer();
        this.audioCtx.decodeAudioData(
          arrayBuf,
          (decoded) => {
            this.buffers[key] = decoded;
          },
          (err) => {
            console.warn(`Could not decode audio buffer for ${key}:`, err);
          }
        );
        break;
      } catch (err) {
        // Try next fallback URL if available
      }
    }
  }

  playSound(name, volume = 0.95) {
    if (!this.soundEnabled) return;
    this.init();

    // 1. Primary: Ultra low-latency Web Audio API AudioBuffer playback
    if (this.audioCtx && this.buffers[name]) {
      try {
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        const source = this.audioCtx.createBufferSource();
        source.buffer = this.buffers[name];
        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        source.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        source.start(0);
        return;
      } catch (err) {
        console.warn('Web Audio buffer error:', err);
      }
    }

    // 2. Fallback: HTML5 Audio instance for immediate playback
    try {
      const fallbackUrl = this.soundDefs[name]?.[0];
      if (fallbackUrl) {
        const audio = new Audio(fallbackUrl);
        audio.volume = Math.min(1, Math.max(0, volume));
        audio.play().catch(() => {});
      }
    } catch (_) {}
  }

  playCatchSound() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  playSpicySound() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  playStarSound() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    [659.25, 880, 1318.51].forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.12, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.22);
    });
  }
}

/* ============================================================================
   14. FREAKY ARCADE ENGINE
   Full 3-lane reflex game with target goal, lives, combos, and sound triggers:
   - start -> rizz
   - miss / mistime -> anime
   - lose -> tf
   - won -> spiderman + uuuuu didd ittt victory reward panel
   ============================================================================ */
class FreakyArcadeEngine {
  constructor(dom, audio) {
    this.dom = dom;
    this.audio = audio;
    this.score = 0;
    this.streak = 0;
    this.lives = 3;
    this.winTarget = 100;
    this.timeLeft = 30;
    this.isPlaying = false;
    this.gameLoopInterval = null;
    this.spawnTimer = null;
    this.clockInterval = null;
    this.activeItems = [];
    this.highScore = parseInt(localStorage.getItem('clair_freaky_arcade_highscore') || '0', 10);

    this.itemTypes = [
      { type: 'kiss', icon: '💋', score: 10, weight: 4 },
      { type: 'heart', icon: '💖', score: 20, weight: 3 },
      { type: 'spicy', icon: '🔥', score: 30, weight: 2 },
      { type: 'star', icon: '✨', score: 50, weight: 1 },
      { type: 'bomb', icon: '💔', score: -15, weight: 2 }
    ];

    this.init();
  }

  init() {
    this.updateHighScoreDisplay();
    this.bindEvents();
    // Warm up audio buffers on page load
    this.audio.init();
  }

  bindEvents() {
    // Open game buttons
    this.dom.gamepadBtn?.addEventListener('click', () => this.openModal());
    this.dom.choiceGameBtn?.addEventListener('click', () => this.openModal());

    // Close game button
    this.dom.closeGameModalBtn?.addEventListener('click', () => this.closeModal());

    // Sound toggle
    this.dom.gameSoundToggleBtn?.addEventListener('click', () => {
      const enabled = this.audio.toggleSound();
      if (this.dom.gameSoundIcon) {
        this.dom.gameSoundIcon.textContent = enabled ? '🔊' : '🔇';
      }
    });

    // Start, Restart & Won buttons
    this.dom.startGameBtn?.addEventListener('click', () => this.startGame());
    this.dom.restartGameBtn?.addEventListener('click', () => this.startGame());
    this.dom.wonRestartBtn?.addEventListener('click', () => this.startGame());
    this.dom.wonKeepBtn?.addEventListener('click', () => this.closeModal());

    // Mobile lane triggers
    this.dom.laneBtns?.forEach((btn, laneIdx) => {
      btn?.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.hitLane(laneIdx);
      });
    });

    // Keyboard support: 1, 2, 3 or A, S, D or Left, Down, Right
    window.addEventListener('keydown', (e) => {
      if (!this.isPlaying || !this.dom.gameModal?.classList.contains('is-open')) return;
      if (['1', 'a', 'A', 'ArrowLeft'].includes(e.key)) {
        this.hitLane(0);
      } else if (['2', 's', 'S', 'ArrowDown'].includes(e.key)) {
        this.hitLane(1);
      } else if (['3', 'd', 'D', 'ArrowRight'].includes(e.key)) {
        this.hitLane(2);
      }
    });

    // Modal click backdrop and Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.dom.gameModal?.classList.contains('is-open')) {
        this.closeModal();
      }
    });

    this.dom.gameModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.gameModal) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.dom.gameModal?.classList.add('is-open');
    this.dom.gameModal?.setAttribute('aria-hidden', 'false');
    this.audio.init();
    if (!this.isPlaying) {
      if (this.dom.gameStartScreen) this.dom.gameStartScreen.style.display = 'flex';
      if (this.dom.gameOverScreen) this.dom.gameOverScreen.style.display = 'none';
      if (this.dom.gameWonScreen) this.dom.gameWonScreen.style.display = 'none';
    }
  }

  closeModal() {
    this.dom.gameModal?.classList.remove('is-open');
    this.dom.gameModal?.setAttribute('aria-hidden', 'true');
    this.stopGame();
  }

  updateHighScoreDisplay() {
    if (this.dom.gameHighScoreTag) {
      this.dom.gameHighScoreTag.textContent = `Best: ${this.highScore}`;
    }
  }

  startGame() {
    this.stopGame();
    this.audio.init();

    // Sound effect: rizz plays automatically when game starts
    this.audio.playSound('rizz');

    this.isPlaying = true;
    this.score = 0;
    this.streak = 0;
    this.lives = 3;
    this.winTarget = 100;
    this.timeLeft = 30;
    this.activeItems = [];

    // Clear arena
    const existingTokens = this.dom.gameArena?.querySelectorAll('.game-falling-item, .game-score-pop');
    existingTokens?.forEach((el) => el.remove());

    if (this.dom.gameStartScreen) this.dom.gameStartScreen.style.display = 'none';
    if (this.dom.gameOverScreen) this.dom.gameOverScreen.style.display = 'none';
    if (this.dom.gameWonScreen) this.dom.gameWonScreen.style.display = 'none';

    this.updateHUD();

    // 30s Countdown Clock
    this.clockInterval = setInterval(() => {
      this.timeLeft--;
      if (this.dom.gameTimer) {
        this.dom.gameTimer.textContent = `${this.timeLeft}s`;
      }
      if (this.timeLeft <= 0) {
        if (this.score >= this.winTarget) {
          this.winGame();
        } else {
          this.loseGame();
        }
      }
    }, 1000);

    // Spawner loop
    this.spawnLoop();

    // Physics Loop (60 FPS)
    this.gameLoopInterval = setInterval(() => {
      this.updatePhysics();
    }, 1000 / 60);
  }

  spawnLoop() {
    if (!this.isPlaying) return;
    this.spawnItem();
    const interval = Math.max(450, 850 - (30 - this.timeLeft) * 12);
    this.spawnTimer = setTimeout(() => this.spawnLoop(), interval);
  }

  spawnItem() {
    if (!this.dom.gameArena) return;

    // Pick random lane 0, 1, or 2
    const lane = Math.floor(Math.random() * 3);

    // Pick random item based on weights
    const pool = [];
    this.itemTypes.forEach((item) => {
      for (let i = 0; i < item.weight; i++) pool.push(item);
    });
    const def = pool[Math.floor(Math.random() * pool.length)];

    const itemEl = document.createElement('div');
    itemEl.className = `game-falling-item ${def.type === 'bomb' ? 'item-bomb' : ''} ${def.type === 'star' ? 'item-star' : ''}`;
    itemEl.textContent = def.icon;

    const arenaRect = this.dom.gameArena.getBoundingClientRect();
    const laneWidth = (arenaRect.width || 300) / 3;
    const posX = lane * laneWidth + laneWidth / 2;

    itemEl.style.left = `${posX}px`;
    itemEl.style.top = `-20px`;

    const itemObj = {
      el: itemEl,
      lane: lane,
      def: def,
      y: -20,
      speed: 2.2 + Math.random() * 1.4 + (30 - this.timeLeft) * 0.06
    };

    // Direct click/tap on falling item
    itemEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.collectItem(itemObj);
    });

    this.dom.gameArena.appendChild(itemEl);
    this.activeItems.push(itemObj);
  }

  updatePhysics() {
    if (!this.dom.gameArena) return;
    const arenaHeight = this.dom.gameArena.clientHeight || 295;

    for (let i = this.activeItems.length - 1; i >= 0; i--) {
      const item = this.activeItems[i];
      item.y += item.speed;
      item.el.style.top = `${item.y}px`;

      // Missed at bottom of arena
      if (item.y > arenaHeight + 20) {
        item.el.remove();
        this.activeItems.splice(i, 1);
        if (item.def.type !== 'bomb') {
          // Slipping item is a miss!
          this.registerMiss('slip', item.lane);
        }
      }
    }
  }

  hitLane(laneIdx) {
    if (!this.isPlaying || !this.dom.gameArena) return;

    // Flash lane visually
    const lanes = this.dom.gameArena.querySelectorAll('.game-lane');
    if (lanes[laneIdx]) {
      lanes[laneIdx].classList.add('lane-hit-active');
      setTimeout(() => lanes[laneIdx].classList.remove('lane-hit-active'), 140);
    }

    const arenaHeight = this.dom.gameArena.clientHeight || 295;
    // Catch window: within target line threshold
    const catchMin = arenaHeight - 90;
    const catchMax = arenaHeight + 20;

    // Find nearest item in this lane within catch window
    let targetItem = null;
    let targetIdx = -1;
    let bestDist = Infinity;

    for (let i = 0; i < this.activeItems.length; i++) {
      const item = this.activeItems[i];
      if (item.lane === laneIdx && item.y >= catchMin && item.y <= catchMax) {
        const dist = Math.abs(item.y - (arenaHeight - 35));
        if (dist < bestDist) {
          bestDist = dist;
          targetItem = item;
          targetIdx = i;
        }
      }
    }

    if (targetItem) {
      this.collectItem(targetItem, targetIdx);
    } else {
      // Miss: player pressed the lane button at the wrong time (empty catch)!
      this.registerMiss('mistime', laneIdx);
    }
  }

  registerMiss(reason, laneIdx = 1) {
    if (!this.isPlaying) return;

    // Sound effect: anime plays whenever she misses!
    this.audio.playSound('anime');

    this.streak = 0;
    this.lives = Math.max(0, this.lives - 1);

    // Flash lane red
    const lanes = this.dom.gameArena?.querySelectorAll('.game-lane');
    if (lanes && lanes[laneIdx]) {
      lanes[laneIdx].classList.add('lane-hit-miss');
      setTimeout(() => lanes[laneIdx]?.classList.remove('lane-hit-miss'), 220);
    }

    const arenaRect = this.dom.gameArena?.getBoundingClientRect() || { width: 300, height: 295 };
    const laneWidth = (arenaRect.width || 300) / 3;
    const posX = laneIdx * laneWidth + laneWidth / 2;
    const popText = reason === 'mistime' ? 'MISSED! ⏱️' : reason === 'bomb' ? '-15 💔' : 'MISS! 💔';
    this.spawnScorePop(posX, (arenaRect.height || 295) - 45, popText, true);

    this.updateHUD();

    if (this.lives <= 0) {
      this.loseGame();
    }
  }

  collectItem(itemObj, indexInArray = -1) {
    if (!this.isPlaying) return;

    const idx = indexInArray >= 0 ? indexInArray : this.activeItems.indexOf(itemObj);
    if (idx !== -1) {
      this.activeItems.splice(idx, 1);
    }
    const posX = parseFloat(itemObj.el.style.left) || 100;
    const posY = itemObj.y || 100;

    itemObj.el.remove();

    if (itemObj.def.type === 'bomb') {
      // Hit bomb
      this.score = Math.max(0, this.score + itemObj.def.score);
      this.registerMiss('bomb', itemObj.lane);
    } else {
      // Successful catch
      this.streak++;
      const multiplier = Math.min(3, 1 + Math.floor(this.streak / 4));
      const points = itemObj.def.score * multiplier;
      this.score += points;

      if (itemObj.def.type === 'star') {
        this.audio.playStarSound();
      } else if (itemObj.def.type === 'spicy') {
        this.audio.playSpicySound();
      } else {
        this.audio.playCatchSound();
      }

      this.spawnScorePop(posX, posY, `+${points}`);
      this.updateHUD();

      // Win Condition: reaches target points!
      if (this.score >= this.winTarget) {
        this.winGame();
      }
    }
  }

  spawnScorePop(x, y, text, isMiss = false) {
    if (!this.dom.gameArena) return;
    const pop = document.createElement('div');
    pop.className = `game-score-pop ${isMiss ? 'pop-miss' : ''}`;
    pop.textContent = text;
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    this.dom.gameArena.appendChild(pop);
    setTimeout(() => pop.remove(), 600);
  }

  updateHUD() {
    if (this.dom.gameScore) this.dom.gameScore.textContent = this.score;
    if (this.dom.gameGoal) this.dom.gameGoal.textContent = this.winTarget;
    if (this.dom.gameLives) {
      let hearts = '';
      for (let i = 0; i < this.lives; i++) hearts += '💖';
      if (this.lives === 0) hearts = '💀';
      this.dom.gameLives.textContent = hearts;
    }
    if (this.dom.gameStreak) {
      const mult = Math.min(3, 1 + Math.floor(this.streak / 4));
      this.dom.gameStreak.textContent = `${mult}x (${this.streak})`;
    }
    if (this.dom.gameTimer) this.dom.gameTimer.textContent = `${this.timeLeft}s`;
  }

  winGame() {
    this.stopGame();

    // Sound effect: spiderman plays automatically when won!
    this.audio.playSound('spiderman');

    // Update won screen
    if (this.dom.gameWonScore) this.dom.gameWonScore.textContent = this.score;
    if (this.dom.gameWonScreen) this.dom.gameWonScreen.style.display = 'flex';
    if (this.dom.gameOverScreen) this.dom.gameOverScreen.style.display = 'none';

    // Tap bursts for celebration
    try {
      const arenaRect = this.dom.gameArena?.getBoundingClientRect();
      if (arenaRect) {
        triggerTapBurst(arenaRect.left + arenaRect.width / 2, arenaRect.top + arenaRect.height / 3);
      }
    } catch (_) {}

    // Check High Score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('clair_freaky_arcade_highscore', this.highScore.toString());
      this.updateHighScoreDisplay();
    }
  }

  loseGame() {
    this.stopGame();

    // Sound effect: tf plays automatically when she loses
    this.audio.playSound('tf');

    if (this.dom.gameFinalScore) this.dom.gameFinalScore.textContent = this.score;
    if (this.dom.gameOverScreen) this.dom.gameOverScreen.style.display = 'flex';
    if (this.dom.gameWonScreen) this.dom.gameWonScreen.style.display = 'none';
  }

  stopGame() {
    this.isPlaying = false;
    if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);
    if (this.spawnTimer) clearTimeout(this.spawnTimer);
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.activeItems.forEach((item) => item.el.remove());
    this.activeItems = [];
  }
}

let arcadeAudio = null;
let freakyArcade = null;

/* ============================================================================
   15. INITIALIZATION ON DOM READY
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Inject custom text from configuration
  if (DOM.finalMessage) {
    DOM.finalMessage.textContent = CONFIG.FINAL_NOTE;
  }

  // Header action button listener
  const headerActionBtn = document.getElementById('header-action-btn');
  if (headerActionBtn) {
    headerActionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!envelopeOpened) {
        openEnvelope();
      } else {
        const letterEl = getLetterSection();
        if (letterEl) {
          letterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Initialize background particle canvas
  if (DOM.particleCanvas) {
    new ParticleBackground(DOM.particleCanvas);
  }

  // Initialize typing engine
  typingEngine = new LetterTypingController(
    CONFIG.LETTER_MESSAGE,
    DOM.letterBody,
    DOM.typingCursor,
    () => {
      // Reveal the choices section when typing completes
      const choicesEl = getChoicesSection();
      if (choicesEl) {
        choicesEl.classList.add('is-revealed');
      }
    }
  );

  DOM.skipTypingBtn?.addEventListener('click', () => {
    typingEngine.skip();
  });

  DOM.pauseTypingBtn?.addEventListener('click', () => {
    typingEngine.togglePause();
  });

  // Initialize music player
  musicPlayer = new MusicPlayerController(CONFIG.PLAYLIST, DOM);

  // Initialize Freaky Arcade Game
  arcadeAudio = new ArcadeAudioEngine();
  freakyArcade = new FreakyArcadeEngine(DOM, arcadeAudio);
});
