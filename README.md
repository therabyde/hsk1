# HSK 1 Micro-Dosing Mode

A web application for practicing HSK Level 1 Chinese characters with focused writing practice.

## Purpose

This application helps learners master HSK 1 vocabulary through deliberate, repetitive writing practice. The "micro-dosing" approach focuses on one character at a time, ensuring mastery before moving to the next.

## Main Features

### Writing Practice (Latihan Menulis)
- **Large Single Board:** One large writing area with target Hanzi visible through outline
- **Stroke Validation:** Real-time stroke-by-stroke correctness checking
- **10 Repetitions:** Each character must be successfully written 10 times
- **Multi-Character Support:** Words are broken down into individual characters for focused practice
- **Progress Tracking:** Per-character repetition counter (0/10 through 10/10)
- **Daily Writing Sets:** 5 vocabulary sets per day, persistent across sessions

### Vocabulary Library
- Browse all HSK 1 vocabulary
- See Indonesian meanings and pinyin pronunciations
- Navigate between characters with Previous/Next buttons

### Mi Zi Ge Writing Guides
- Traditional 10-box grid layout for stroke order practice
- Available as alternative to large board mode
- Independent feature, can be used alongside or separate from Writing Practice

### Favorites & History
- Save frequently-used characters to Favorites
- Review past writing sessions in History
- Persistent state across browser sessions

### Streak Tracking
- Track daily usage streaks
- Visual indicators for consecutive practice days

## Technology Stack

- **HTML5** — Structure and DOM elements
- **JavaScript (Vanilla)** — Application logic, no frameworks
- **CSS3** — Styling and responsive layout
- **Hanzi Writer** — Stroke validation and drawing library
- **Service Worker** — Offline support and caching

## Local Development

### Start Server
```powershell
# Windows (PowerShell)
.\server.ps1

# Or any simple HTTP server:
python -m http.server 8080
node -e "const http = require('http'); http.createServer((req,res)=>res.end('<h1>HSK 1</h1>').send()); http.listen(8080);"
```

### Access Application
Open browser to: `http://localhost:8080/`

### Development URL
- **Local:** `http://localhost:8080/`
- **GitHub Pages:** `https://<username>.github.io/<repository>/` (after deployment)

## Data Source

Vocabulary data from official HSK 3.0 specification:
- GitHub repository: `krmanik/HSK-3.0`
- Dataset: HSK Level 1 words with pinyin and Indonesian translations

## File Structure

```
├── index.html          # Main HTML document
├── script.js           # Application logic (~2500 lines)
├── style.css           # Styling and layout
├── manifest.json       # PWA manifest for installability
├── sw.js              # Service worker for offline support
├── icon-192.png       # App icon (192×192)
├── icon-512.png       # App icon (512×512)
├── README.md          # This file
├── CHANGELOG.md       # Development change history
├── docs/              # Documentation folder
│   └── PROJECT_STATUS.md  # Project status and deployment guide
├── WRITING_SESSION_HANDOFF.md  # Original development handoff
└── *.backup.js        # Development backup files (optional to keep)
```

## Installation (Local Development)

No installation required. Simply:

1. Clone or download this repository
2. Open in browser via local server (`http://localhost:8080/`)
3. Or open `index.html` directly in browser

For production deployment, upload to GitHub Pages and access via URL.

## Usage Guide

### Writing Practice Mode

1. **Navigate to Writing Tab:** Click "Latihan Menulis" in zen bar
2. **View Current Hanzi:** Target character displayed with writing outline
3. **Write Strokes:** Use touch, mouse, or stylus to draw strokes
4. **Receive Feedback:** Correct/incorrect stroke indicators appear immediately
5. **Complete Repetitions:** Reach 10 successful completions for this character
6. **Advance:** Automatically moves to next character after 10/10

### Vocabulary Library Mode

1. **Navigate to Vocab Tab:** Click "Kosakata" in zen bar
2. **Browse Characters:** Use Previous/Next buttons to navigate
3. **View Details:** See meaning, pinyin, and stroke count for each character
4. **Add to Favorites:** Star characters for quick access later

### Mi Zi Ge Grid Mode

1. **Access from Writing Tab:** Alternative view available
2. **See 10 Boxes:** Traditional small-grid layout
3. **Practice Stroke Order:** Follow guide lines in boxes
4. **Use Independently:** Can practice without large board mode

## Keyboard Shortcuts

- **Enter:** No operation during writing (prevents accidental clearing)
- **Space / Arrow Right:** Advance to next Hanzi when current is complete
- **Arrow Left:** Navigate to previous Hanzi

## Browser Support

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For best experience with touch/stylus input, use tablets or touch-enabled devices.

## Accessibility

- Semantic HTML structure
- ARIA attributes for screen readers
- Focus management (one known non-critical warning in Favorites modal)
- High contrast stroke indicators
- Keyboard navigation support

## Known Issues

### Non-Blocking Warning
A console warning may appear related to the Favorites Modal focus management:

```
Blocked aria-hidden on an element because its descendant retained focus.
```

**Impact:** None — this does not affect core functionality and will be addressed in future updates.

## Development Status

### Current Version
**Finalized for GitHub Pages deployment.** All writing practice features complete and tested.

### Recent Fixes Applied
- SVG sizing (hidden-tab issue resolved)
- Repetition lifecycle (fresh board after each attempt)
- Completion-key collisions (Hanzi-scoped progress tracking)
- Set-to-set transitions (proper board remounting)
- Watermark synchronization (correct Hanzi indexing)

See `CHANGELOG.md` for complete list of fixes.

### Documentation
- `WRITING_SESSION_HANDOFF.md` — Original development handoff document
- `PROJECT_STATUS.md` — Current project status and deployment checklist
- `docs/` folder — Additional technical documentation

## License

This project uses HSK vocabulary data from the public HSK 3.0 specification.
All code is provided as-is for educational purposes.

## Credits

- **Vocabulary Data:** HSK 3.0 specification (krmanik/HSK-3.0 on GitHub)
- **Hanzi Writer Library:** Used for stroke validation and drawing
- **Design:** Mi Zi Ge traditional writing guide layout

---

**Need help?** Check the documentation files in the `docs/` folder or review `CHANGELOG.md` for recent fixes.

For deployment to GitHub Pages, see `docs/PROJECT_STATUS.md` for the complete checklist.