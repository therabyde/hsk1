# Deployment Guide — GitHub Pages Upload

## Quick Reference

### Files to Commit (Core Application)
These files MUST be committed to GitHub:

```bash
index.html              # Main HTML document ✅
script.js               # Application logic ✅  
style.css               # Styling ✅
manifest.json           # PWA manifest ✅
sw.js                   # Service worker ✅
icon-192.png            # App icon (small) ✅
icon-512.png            # App icon (large) ✅
README.md               # Project documentation ✅
CHANGELOG.md            # Change history ✅
docs/                   # Documentation folder ✅
.gitignore              # Git ignore rules ✅
```

### Files to Keep Local (Optional Recovery)
These backup files can stay on your local machine but typically won't be pushed:

```
*.backup.js             # Development snapshots (~28 script backups)
*.pre                   # Pre-fix versions
index.html.*.pre        # HTML experimental versions
style.css.*.pre         # CSS experimental versions  
script.*-fix-backup.js  # Fix-specific backups
server.ps1              # PowerShell server script
create_icons.ps1        # Icon creation script
```

**Recommendation:** Delete these backup files before committing to keep repository clean, OR add them to `.gitignore`.

### Documentation Files (Commit)
These should be committed for transparency:

```
WRITING_SESSION_HANDOFF.md  # Original development handoff ✅
PROJECT_STATUS.md           # Current project status ✅
CHANGELOG.md                # Change history ✅
README.md                   # User documentation ✅
docs/                       # Additional docs folder ✅
```

---

## Pre-Deployment Checklist

### 1. Verify Core Files Exist
Run this command to confirm all essential files are present:

```bash
# Windows PowerShell
Test-Path "index.html"              # Should return True
Test-Path "script.js"               # Should return True  
Test-Path "style.css"               # Should return True
Test-Path "manifest.json"           # Should return True
Test-Path "sw.js"                   # Should return True
Test-Path "icon-192.png"            # Should return True
Test-Path "icon-512.png"            # Should return True

# Linux/Mac
test -f index.html && echo "✅"     # Should output checkmark
test -f script.js && echo "✅"      # Should output checkmark
```

### 2. Verify JavaScript Syntax
Run syntax check to ensure no errors:

```bash
node --check script.js
```

**Expected result:** No output (clean) or Exit code 0

### 3. Review .gitignore
Ensure `.gitignore` exists and contains:

```gitignore
*.backup.js    # Backup files (optional to ignore)
*.pre          # Pre-fix versions
nul            # Windows null device
*.ps1          # PowerShell scripts
Thumbs.db      # Windows thumbnail cache
.DS_Store      # Mac desktop icons
```

### 4. Check File Sizes
Core files should be reasonable in size:

- `script.js`: ~100-200 KB (normal for vanilla JS app)
- `style.css`: ~50-100 KB  
- `index.html`: ~20-50 KB
- PNG icons: 10-50 KB each

If any file is >500 KB, check for bloat or embedded base64 data.

---

## Git Commands (Manual Execution Required)

### Initial Repository Setup (First Time)

```bash
# Initialize git repository
git init

# Add all core files (exclude backups)
git add index.html script.js style.css manifest.json sw.js icon-192.png icon-512.png README.md CHANGELOG.md docs/ .gitignore WRITING_SESSION_HANDOFF.md PROJECT_STATUS.md

# OR add everything including backups (if you want to preserve them):
git add .

# Commit with descriptive message
git commit -m "Initial commit: HSK 1 Micro-Dosing app with Writing Practice feature

Features:
- Writing Practice with Hanzi Writer stroke validation
- 10 repetitions per character requirement  
- Daily Writing mode with 5 sets/day persistence
- Mi Zi Ge grid guides (traditional 10-box layout)
- Vocabulary Library with Indonesian meanings
- Favorites and History functionality
- Streak tracking across sessions

Known Issues:
- Console warning in Favorites Modal focus management (non-blocking)

All writing lifecycle fixes applied and tested. Ready for GitHub Pages deployment."

# Push to GitHub
git push -u origin main
```

### Alternative: Clean Repository (Recommended)

If you want a clean repository without backup files:

```bash
git init
git add index.html script.js style.css manifest.json sw.js icon-192.png icon-512.png README.md CHANGELOG.md docs/ .gitignore WRITING_SESSION_HANDOFF.md PROJECT_STATUS.md
git commit -m "Initial commit: HSK 1 Micro-Dosing app"
git push -u origin main
```

---

## Post-Push Verification

After pushing to GitHub, verify the deployment:

### 1. GitHub Pages Build
- Navigate to your repository on GitHub.com
- Go to Settings → Pages
- Select branch (should be `main` or `master`)
- Click Save
- Wait 1-2 minutes for build to complete
- Verify "Build succeeded" status

### 2. Test Live Application
Open the GitHub Pages URL in browser and test:

**Writing Practice:**
- [ ] Large board displays with target Hanzi visible
- [ ] First stroke draws correctly on outline
- [ ] Progress counter shows 0/10 initially
- [ ] After successful write, progress updates to 1/10
- [ ] Fresh empty board appears after each completion
- [ ] Can complete all 10 repetitions
- [ ] Advances to next Hanzi after 10/10

**Vocabulary Library:**
- [ ] Vocab tab loads correctly
- [ ] Previous/Next navigation works
- [ ] Meanings and pinyin display properly

**Daily Writing Sets:**
- [ ] Kata 1/5 shows correct first Hanzi
- [ ] After completing Set 1, can advance to Kata 2/5
- [ ] New set loads with correct watermark (e.g., "2 / 5")
- [ ] Board is interactive (not showing completed character)

### 3. Browser Console Check
Open browser console (F12) and verify:
- No JavaScript errors
- Service Worker registered successfully (normal message, not error)
- `[WRITING TRACE]` logs appear when writing (expected diagnostic output)

---

## Troubleshooting

### Issue: "404 Not Found" on GitHub Pages
**Cause:** Build failed or wrong branch selected
**Solution:** Check Settings → Pages → Build and deployment, ensure correct branch is selected

### Issue: Console Shows "Uncaught SyntaxError"
**Cause:** JavaScript syntax error in script.js
**Solution:** Run `node --check script.js` locally first to catch errors

### Issue: SVG Shows as Blank/0×0
**Cause:** Writing tab not visible during initialization
**Solution:** This was already fixed — ensure you're on latest code with deferred mounting

### Issue: Repetition Counter Stuck at 0/10
**Cause:** Old code with lifecycle bug
**Solution:** Ensure composite completion keys are in place (FIX A): line ~1461 should have `currentIndex_${nextRep}` format

---

## Optional: Create Release Tag

Once deployed and tested successfully:

```bash
git tag -a v1.0.0 -m "Initial release: HSK 1 Micro-Dosing with Writing Practice"
git push origin v1.0.0
```

Then in GitHub Settings → Releases, create a visual release page for users.

---

## Post-Deployment Maintenance

### Regular Checks
- [ ] Monitor GitHub Pages build status monthly
- [ ] Check browser console for new warnings/errors
- [ ] Test core features after OS/browser updates

### Backup Strategy
Keep local backups in separate folders:
- Development snapshots in `dev-backups/`
- Old versions archived with dates: `archive_2024-01-15/`

Never commit working directory back to repository.

---

## Contact & Support

For deployment questions or issues:
- Review `docs/PROJECT_STATUS.md` for full checklist
- Check `CHANGELOG.md` for recent fixes
- Examine `WRITING_SESSION_HANDOFF.md` for technical details

---

**Deployment Status:** READY FOR UPLOAD ✅

All application files verified. Documentation complete. Known issues documented.