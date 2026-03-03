# Demo Video Cropping Guide

## Source Video
- **File**: `demos-video.mp4`
- **Resolution**: 1320x2868 (portrait phone screen recording)
- **Format**: HEVC (H.265), ~120fps
- **Duration**: ~6:23

## Source Frame Layout (1320x2868)

```
y=0     ┌──────────────────────────┐
        │  Status bar + screen     │  ~0–90px
        │  recorder (red dot)      │
y=90    ├──────────────────────────┤
        │  App header              │  ~90–200px
        │  (hamburger, "New chat", │
        │   settings gear)         │
y=200   ├──────────────────────────┤
        │                          │
        │  User message bubble     │
        │                          │
        │  AI avatar + response    │
        │                          │
        │  (scrollable content)    │
        │                          │
        │                          │
y=2400  ├──────────────────────────┤
        │  App input bar           │  ~2400–2580px
        │  ("Ask about...", mic,   │
        │   send button)           │
y=2580  ├──────────────────────────┤
        │  Browser URL bar         │  ~2580–2700px
        │  (demos.kodara.com)      │
y=2700  ├──────────────────────────┤
        │  Browser nav buttons     │  ~2700–2868px
        │  (< > + tabs menu)      │
y=2868  └──────────────────────────┘
```

## Crop Settings (approved)

**Goal**: Show only the app chat content at 4:5 aspect ratio, scaled to ~80% for a clean presentation. No status bar, screen recorder, browser chrome, app header, or input bar. No padding baked into the video — centering and background handled by CSS on the page.

### FFmpeg filter chain

```
crop=1280:1600:20:[Y],scale=614:768
```

### Breakdown

| Step | Filter | What it does |
|------|--------|-------------|
| 1 | `crop=1280:1600:20:[Y]` | Crops a 1280x1600 (4:5) window from the source. x=20 centers horizontally (20px margin each side). Y offset varies per demo — should start with a small buffer above the first visible content, and avoid showing the input bar at the bottom. Removes: status bar, screen recorder, app header, input bar, browser chrome. |
| 2 | `scale=614:768` | Scales to 614x768 output (4:5). Content is ~80% of the intended display size — the page CSS container provides the remaining padding/background. |

### Full FFmpeg command template

```bash
ffmpeg -y \
  -ss [START] -to [END] \
  -i "demos-video.mp4" \
  -vf "crop=1280:1600:20:[Y],scale=614:768" \
  -c:v libx264 -preset medium -crf 23 \
  -an -movflags +faststart \
  "output.mp4"
```

### Flags

| Flag | Purpose |
|------|---------|
| `-ss` / `-to` | Trim start/end timestamps |
| `-c:v libx264` | H.264 for web compatibility (source is HEVC) |
| `-preset medium` | Balance of speed and compression |
| `-crf 23` | Quality level (lower = better, 23 is good default) |
| `-an` | Strip audio (silent loops) |
| `-movflags +faststart` | Move metadata to front for web streaming |

### Per-demo Y offsets

Each demo has different content positioning. Adjust Y so:
- First visible content (photo/message) has a small buffer above, not flush to the edge
- Input bar ("Ask about...") is NOT visible at the bottom
- Content is perfectly horizontally centered (x=20 for all)

## Demo Timestamps

| # | Demo | File | Start | End | Y Offset |
|---|------|------|-------|-----|----------|
| 1 | Personal Trainer AI (Coach Flex) | `demo-trainer.mp4` | 00:00:06 | 00:00:14 | 510 |
| 2 | Agency/Ads AI (Lucas AI) | `demo-agency.mp4` | 00:00:55 | 00:01:11 | 490 |
| 3 | Coach/Consultant AI (Sage AI) | `demo-coach.mp4` | 00:02:18 | 00:02:55 | TBD |
| 4 | Sales Coach AI (Closer AI) | `demo-sales.mp4` | 00:03:03 | 00:03:25 | TBD |
| 5 | Real Estate AI (PropVal AI) | `demo-realestate.mp4` | 00:03:33 | 00:04:38 | TBD |
| 6 | Financial Coach AI (WealthIQ) | `demo-finance.mp4` | 00:04:43 | 00:05:18 | TBD |

## Output Specs

- **Resolution**: 614x768 (4:5)
- **Padding**: None baked in — handled via CSS container with white background
- **Codec**: H.264
- **Audio**: None (silent loops)
- **Use on page**: Center video in a container with white background
  ```html
  <div style="display:flex; align-items:center; justify-content:center; background:white;">
    <video src="demo-trainer.mp4" autoplay loop muted playsinline></video>
  </div>
  ```
