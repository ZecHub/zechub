# CLAUDE.md — Bluff Card Game (Next.js)

## Project Overview
**Bluff** is an online multiplayer card game where players eliminate their hand by playing cards face-down, declaring a rank (truthfully or as a bluff). Others can challenge ("Bluff!"), pass, or check. First to empty their hand wins.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.

---

## UI Rules — Read Before Every Frontend Task

### Design Philosophy
This game uses a **sleek modern** aesthetic — sharp, confident, minimal. Think a Bloomberg terminal crossed with a premium mobile game. Every pixel is intentional. Nothing is decorative unless it serves clarity or tension.

**The ONE thing players must feel**: *psychological tension* — am I being bluffed? Should I call it?  
UI must amplify this tension through restraint, not noise.

---

### Typography

```css
/* Headings, card ranks, player names */
font-family: 'DM Mono', monospace;

/* Body, labels, game log */
font-family: 'Sora', sans-serif;
```

- Import from Google Fonts in `layout.tsx`
- Card rank labels (A, K, Q, J, 2–10): always `DM Mono`, bold, large
- Player names: `Sora`, medium weight, uppercase tracking
- Game log / event feed: `DM Mono`, small, muted — like a terminal

---

### Color System

Define all colors as CSS variables in `globals.css`:

```css
:root {
  /* Base */
  --bg-primary: #0A0A0F;        /* Near-black background */
  --bg-surface: #13131A;        /* Cards, panels */
  --bg-elevated: #1C1C26;       /* Hover states, overlays */

  /* Accents */
  --accent-red: #FF2D55;        /* Bluff! button, danger, challenge */
  --accent-green: #00E676;      /* Confirm, truth, success */
  --accent-yellow: #FFD600;     /* Pass, neutral action */
  --accent-blue: #2979FF;       /* Your turn indicator, active state */

  /* Text */
  --text-primary: #F0F0F5;
  --text-muted: #5A5A72;
  --text-dim: #2E2E3E;

  /* Card */
  --card-bg: #1A1A24;
  --card-border: #2A2A38;
  --card-back: #0F0F18;
  --card-face: #F5F5FA;

  /* Suits */
  --suit-red: #FF2D55;          /* Hearts, Diamonds */
  --suit-black: #F0F0F5;        /* Spades, Clubs */
}
```

**Rules:**
- Background is always near-black. Never white or light.
- Use `--accent-red` ONLY for Bluff/challenge actions — it must feel dangerous.
- Use `--accent-green` ONLY for confirm/truth — it must feel safe.
- Avoid mixing more than 2 accents on the same screen.

---

### Component Specs

#### Playing Card
```tsx
// Card face (in player's hand — visible to owner only)
<div className="card card--face">
  <span className="card__rank">A</span>
  <span className="card__suit">♠</span>
</div>

// Card back (other players' cards / pile)
<div className="card card--back" />
```

CSS rules:
- Size: `72px × 100px` on mobile, `88px × 120px` on desktop
- Border radius: `8px`
- Border: `1px solid var(--card-border)`
- Background face: `var(--card-face)`, text `#0A0A0F`
- Background back: subtle grid or diagonal line pattern using SVG background — never a solid color
- **Selected state**: translate Y by `-12px`, add `box-shadow: 0 0 0 2px var(--accent-blue)`
- **Hover**: translate Y by `-6px`, transition `200ms ease`
- Card fan in hand: use `rotate` and `translateX` CSS transforms, overlapping by 30%

#### Player Hand
- Cards fan out in an arc at the bottom of screen
- Selected cards lift up
- Card count badge (e.g. "5 cards") shows above each opponent's hidden hand
- Opponent hands show card backs in a tight fan — no peeking

#### Game Table (center area)
- Dark surface, slightly lighter than background (`--bg-surface`)
- Pile of played cards in center — show stacked card backs with slight rotation variance
- Pile count shown below: `"14 cards in pile"` in `DM Mono` muted text
- Last claim shown prominently: `"3 × KINGS"` — large, bold, `DM Mono`

#### Action Bar (bottom, above hand)
Four actions, always in this order:

```
[  PLAY CARDS  ]  [  BLUFF!  ]  [  PASS  ]  [  CHECK  ]
```

- `PLAY CARDS`: primary button, `--accent-blue`, only active when cards are selected
- `BLUFF!`: `--accent-red`, bold, slightly larger — this is the drama button
- `PASS`: ghost button, `--accent-yellow` border + text
- `CHECK`: ghost button, `--text-muted` — least prominent

Button rules:
- All caps, `DM Mono`, letter-spacing `0.1em`
- Height: `48px`, border-radius: `6px`
- No shadows — flat, sharp, modern
- Disabled state: opacity `0.3`, no hover effect
- Active/pressed: scale `0.97`

#### Declare Modal (when playing cards)
Before submitting cards, player declares the rank:
- Full-screen dark overlay (`rgba(0,0,0,0.85)`)
- Center card: `"Declare as:"` label, then a rank picker (A K Q J 10 9 ... 2)
- Rank picker: horizontal scroll row of rank chips
- Selected rank chip: filled `--accent-blue`
- Confirm button: `--accent-green`, "PLAY"
- Cancel: text-only, muted

#### Challenge Result (Bluff called!)
- Dramatic full-screen flash: red (`--accent-red`) if bluff caught, green if honest
- Cards flip face-up with animation
- Result text: `"BLUFF CAUGHT"` or `"HONEST PLAY"` — large, centered, DM Mono
- Loser picks up the pile — animate cards flying to their hand

#### Player Indicators (multiplayer)
- Each player shown as a pill: `[Avatar Initial] [Name] [Card Count]`
- Active player: `--accent-blue` left border
- Disconnected: opacity `0.4`, "(away)" label
- Current user (you): always pinned to bottom

#### Game Log / Event Feed
- Slide-in panel from right side (collapsible)
- Terminal-style: dark bg, `DM Mono` small text, newest at bottom
- Color-coded lines:
  - Bluff caught → red
  - Honest play → green  
  - Pass → yellow
  - Player joined/left → muted

---

### Animation Rules (Framer Motion)

```tsx
// Card dealing into hand
initial={{ opacity: 0, y: -40, rotate: -5 }}
animate={{ opacity: 1, y: 0, rotate: 0 }}
transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.08 }}

// Card played to pile
animate={{ x: targetX, y: targetY, rotate: randomAngle, scale: 0.85 }}
transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}

// Bluff result flash
initial={{ opacity: 0, scale: 1.1 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.2 }}

// Action buttons entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ staggerChildren: 0.05 }}
```

Rules:
- Spring physics for card movement (feels physical)
- Ease curves for UI panels and overlays (feels digital/slick)
- Never animate things that aren't meaningful — no idle animations
- Turn timer (if any): use a shrinking progress bar, not a number

---

### Layout Structure

```
┌─────────────────────────────────┐
│  [Game Name]        [Log] [Menu]│  ← Header (48px)
├─────────────────────────────────┤
│  [P2]        [P3]        [P4]  │  ← Opponent area
│                                 │
│         ┌──────────┐            │
│         │   PILE   │            │  ← Game table (center)
│         │ 14 cards │            │
│         │ "3×KINGS"│            │
│         └──────────┘            │
│                                 │
│  [     ACTION BAR     ]         │  ← Actions
│  [  YOUR HAND (cards) ]         │  ← Player hand
└─────────────────────────────────┘
```

- Mobile-first. Game must work on phones (players are on different devices).
- Table area: `flex-1`, centered
- Hand area: fixed bottom, `120px` tall
- Action bar: just above hand, `64px` tall
- No horizontal scrolling ever

---

### Responsiveness
- Mobile (`< 640px`): single column, opponents shown as a horizontal strip at top
- Tablet (`640–1024px`): opponents around the table edges
- Desktop (`> 1024px`): full poker-table-style layout with players on all sides

---

### Tailwind Config Additions
Add to `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      'game-bg': '#0A0A0F',
      'game-surface': '#13131A',
      'game-elevated': '#1C1C26',
      'accent-red': '#FF2D55',
      'accent-green': '#00E676',
      'accent-yellow': '#FFD600',
      'accent-blue': '#2979FF',
    },
    fontFamily: {
      mono: ['"DM Mono"', 'monospace'],
      sans: ['Sora', 'sans-serif'],
    },
    borderRadius: {
      card: '8px',
    },
  }
}
```

---

### What to NEVER Do
- ❌ White or light backgrounds anywhere
- ❌ Purple gradients or generic "SaaS" blue
- ❌ Inter, Roboto, or system fonts
- ❌ Rounded pill buttons with drop shadows
- ❌ Emoji in UI (use SVG suit symbols only)
- ❌ Animations on every element — be selective
- ❌ Generic card designs (no red/white Bicycle-style)
- ❌ Cluttered layouts — tension comes from negative space

---

### Sample Prompt to Use with Claude Code

When asking Claude Code to build a component, always start with:

```
Read CLAUDE.md for UI rules first.

Now build the [component name] component for the Bluff card game.
Specific requirements:
- [your requirements here]
```

Example:
```
Read CLAUDE.md for UI rules first.

Build the ActionBar component. It shows 4 buttons: PLAY CARDS, BLUFF!, PASS, CHECK.
PLAY CARDS is disabled unless at least one card is selected.
On mobile it should be a fixed bottom bar above the hand area.
Use Framer Motion for button entrance animation.
```
