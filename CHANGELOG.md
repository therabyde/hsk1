# Changelog

## Current Development Cycle (Writing Practice Feature)

### Writing Practice Implementation
- Replaced original multi-box writing layout with ONE large Hanzi writing board
- Integrated Hanzi Writer library for stroke-by-stroke validation
- Implemented 10 successful repetitions per Hanzi requirement
- Added Mi Zi Ge writing guides (small grid) as independent feature
- Preserved Previous/Next navigation between Hanzi characters

### Lifecycle Fixes Applied

#### SVG Sizing Fix
- **Issue:** Large board SVG initially rendered at 0×0 due to hidden Writing tab
- **Fix:** Deferred mounting until Writing tab becomes visible via `switchTab('writing')`
- **Location:** `switchTab()` function with requestAnimationFrame deferral

#### Ghost Hanzi Cleanup
- **Issue:** Ghost character appeared in both large board and small grid
- **Fix:** Hide ghost character only in large writing board, preserve in Mi Zi Ge grid
- **Location:** `startWritingCellQuiz()` — calls `writer.hideCharacter()`

#### onLoadCharDataSuccess Key Bug
- **Issue:** Completion key checked wrong index causing premature character display
- **Fix:** Check next attempt's completion status instead of current
- **Location:** `onLoadCharDataSuccess()` function

#### Enter Key Handler
- **Issue:** Enter key was clearing drawing or restarting attempts unexpectedly
- **Fix:** Made Enter key a pure no-op during writing sessions
- **Location:** Enter key event listener in writing tab

#### Repetition Counter Declaration
- **Issue:** Runtime error "writingRepetitionProgress is not defined"
- **Fix:** Added proper element reference declaration for repetition counter UI
- **Location:** `updateWritingUI()` function

#### onComplete Lifecycle Simplification
- **Issue:** Duplicated HanziWriter.create() logic with out-of-scope variables (writerHost, hanziObj, width)
- **Fix:** Removed duplicate creation, reused existing mountLargeWritingBoard() function
- **Location:** `startLargeWritingQuiz().onComplete()` callback

#### Completion Recording to UI
- **Issue:** Progress UI not updating after successful completions
- **Fix:** Added updateWritingUI() call after recording completion in onComplete
- **Location:** `startLargeWritingQuiz().onComplete()` callback

#### Completion-Key Collisions (FIX A)
- **Issue:** Large board completion keys shared across all Hanzi causing wrong counting
- **Fix:** Composite key format scoped to Hanzi index: `"currentIndex_repetition"` instead of just `"repetition"`
- **Location:** `startLargeWritingQuiz().onComplete()` — line ~1461

#### Initial Watermark Synchronization (FIX B)
- **Issue:** Initial watermark showed incorrect denominator ("1/3" instead of "1/2")
- **Fix:** Synchronize watermark immediately after session initialization with actual hanziList.length
- **Location:** `loadWritingForCurrentSet()` function — line ~621

#### Set-to-Set Transition Mounting Fix
- **Issue:** When advancing between Daily Writing sets, large board not remounted if tab already visible
- **Fix:** Mount board in loadWritingForCurrentSet() when Writing tab is visible
- **Location:** `loadWritingForCurrentSet()` function — lines ~625-629

---

## Historical Notes

### Focus Writing Mode (Deprecated)
- Earlier versions experimented with focus-only writing mode
- Currently superseded by large single-board approach
- Related backup files preserved for reference only

### Mi Zi Ge Grid Evolution
- Original implementation used 10 separate small boxes
- Evolved into independent feature alongside large board
- Both modes now coexist for different learning preferences

---

## Known Non-Blocking Issues (Documented)

### Favorites Modal Focus Warning
```
Blocked aria-hidden on an element because its descendant retained focus.
Affected: button.close-btn#close-modal-btn
Parent: div#fav-modal.modal-overlay.hidden[aria-hidden="true"]
```
**Status:** Unrelated to Writing feature, will be addressed in future cleanup pass

---

## Files Modified in Current Cycle

### Primary Files
- `index.html` — Updated for large writing board (if any changes)
- `script.js` — All lifecycle fixes applied (28 backup versions preserved)
- `style.css` — Layout adjustments for single large board

### Documentation
- `WRITING_SESSION_HANDOFF.md` — Original development handoff document
- `PROJECT_STATUS.md` — Current project status and deployment checklist (created)
- `CHANGELOG.md` — This file documenting all fixes

### Backup Files Preserved
All 28 script backup files retained for recovery purposes:
- `.backup.js` files — Development snapshots
- `.pre` files — Pre-fix versions
- Experimental focus-writing variants
- Icon creation scripts

---

## Deployment Status

**Ready for GitHub Pages deployment.** ✅

All functional issues resolved. Known non-blocking issues documented.
Diagnostic logs preserved for debugging. Backup files retained for recovery.