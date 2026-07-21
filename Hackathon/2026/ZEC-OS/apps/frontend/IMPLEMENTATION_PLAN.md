# ZEC-OS - Implementation Plan

## Overview
**Project Name:** ZEC-OS

NextJS app styled as retro OS GUI (Win95 + X11 + Mac OS 9 mashup). Connects to ZEC dashboard for blockchain data and price history.

---

## Completed Features

### Core Systems
- [x] **Window Manager** (`src/store/windowStore.ts`) - Zustand store for window state, z-index, focus, minimize/maximize
- [x] **Smart Window Placement** (`src/utils/windowPlacement.ts`) - Cascade positioning, space scanning
- [x] **Desktop Component** (`src/components/Desktop/Desktop.tsx`) - Grid-snapped icons, background support
- [x] **Taskbar Component** (`src/components/Taskbar/Taskbar.tsx`) - App launcher dropdown, minimized windows, clock/date
- [x] **Window Component** (`src/components/Window/Window.tsx`) - Draggable, resizable, title bar with controls

### Theming System
- [x] **Theme Store** (`src/store/themeStore.ts`) - Theme switching, background customization, CSS variable injection
- [x] **CRT Green Theme** (`src/themes/crt-green.ts`) - Late 80s/Early 90s, pixelated, phosphor green
- [x] **Golden Gate Theme** (`src/themes/golden-gate.ts`) - Mid 90s Win95 style, beveled borders, teal desktop
- [x] **Millennium Theme** (`src/themes/millennium.ts`) - Late 90s Mac OS 9 Platinum, rounded corners, gradients
- [x] **CSS Theme System** (`src/app/globals.css`) - Retro/beveled/flat border styles, responsive font sizes

### Data Apps
- [x] **Price Ticker** (`src/components/apps/PriceTicker.tsx`) - Current ZEC price with refresh
- [x] **Block Height** (`src/components/apps/BlockHeight.tsx`) - Current blockchain height
- [x] **Difficulty** (`src/components/apps/Difficulty.tsx`) - Network mining difficulty
- [x] **Transparent Pool** (`src/components/apps/TransparentPool.tsx`) - ZEC in t-addresses
- [x] **Shielded Pool** (`src/components/apps/ShieldedPool.tsx`) - Combined Sprout + Sapling + Orchard
- [x] **Pools** (`src/components/apps/Pools.tsx`) - Individual pool breakdown
- [x] **Total Supply** (`src/components/apps/TotalSupply.tsx`) - Total ZEC with USD value
- [x] **Total Shielded** (`src/components/apps/TotalShielded.tsx`) - Shielded ZEC with USD and breakdown
- [x] **Shielded Percent** (`src/components/apps/ShieldedPercent.tsx`) - Percentage of supply shielded
- [x] **Total TXs** (`src/components/apps/TotalTxs.tsx`) - Transaction count

### Charts
- [x] **Price Chart** (`src/components/apps/PriceChart.tsx`) - Price history, pixel/clean toggle, time ranges
- [x] **Pools Chart** (`src/components/apps/PoolsChart.tsx`) - Stacked pool history, ZEC/USD toggle
- [x] **Shielded Chart** (`src/components/apps/ShieldedChart.tsx`) - Shielded pool evolution
- [x] **Supply USD Chart** (`src/components/apps/SupplyUsdChart.tsx`) - Supply value over time

### Widgets
- [x] **Network Data** (`src/components/apps/widgets/NetworkData.tsx`) - All-in-one dashboard with privacy score, pools, block height, difficulty, supply, pool distribution
- [x] **Charts Dashboard** (`src/components/apps/widgets/ChartsDashboard.tsx`) - 2x2 grid showing all 4 charts simultaneously

### Explorer
- [x] **Block Explorer** (`src/components/apps/Explorer.tsx`) - Full-featured dual-mode explorer
  - Search by block height, hash, txid, t-address, z-address
  - Auto-detect search type with manual override
  - Block details with collapsible sections
  - Transaction viewer with prev/next navigation
  - Transaction classification (Coinbase, Transparent, Shielding, Deshielding, Mixed, Fully Shielded)
  - T-address balance and history
  - Z-address privacy notice
- [x] **Explorer Store** (`src/store/explorerStore.ts`) - Cross-window communication for TX viewer

### Tools
- [x] **Calculator** (`src/components/apps/Calculator.tsx`) - Basic arithmetic with decimal support
- [x] **Terminal** (`src/components/apps/Terminal.tsx`) - Shell emulator with virtual filesystem
  - Commands: ls, cd, pwd, cat, whoami, date, uname, neofetch, echo, help, clear, exit, zec
  - Command history with arrow navigation
  - Tab completion

### Games
- [x] **Shmup** (`src/components/apps/games/Shmup.tsx`) - Space shooter game
- [x] **Pong** (`src/components/apps/games/Pong.tsx`) - Classic Pong game

### System Features
- [x] **Settings** (`src/components/apps/Settings.tsx`) - Font size, date/time format, sounds, icons, themes, backgrounds
- [x] **Settings Store** (`src/store/settingsStore.ts`) - User preferences persistence
- [x] **Themes Gallery** (`src/components/apps/Themes.tsx`) - Theme previews and selection
- [x] **About** (`src/components/apps/About.tsx`) - Version, description, tech stack
- [x] **Boot Splash** (`src/components/Boot/BootSplash.tsx`) - 3-second boot sequence, Enter to skip
- [x] **Memory Monitor** (`src/hooks/useMemoryMonitor.ts`) - Chrome heap tracking, 500MB warning
- [x] **Memory Warning** (`src/components/MemoryWarning/MemoryWarning.tsx`) - Dismissible warning popup
- [x] **Sound Effects** (`src/hooks/useSound.ts`) - 8-bit Web Audio oscillator sounds

### API Layer
- [x] `/api/chain` - Block height, difficulty, pool values
- [x] `/api/price` - Current ZEC price
- [x] `/api/prices?range=X` - Historical price data (with CryptoCompare fallback)
- [x] `/api/pools?range=X` - Historical pool data (from flows API)
- [x] `/api/flows?range=X` - Shielding/deshielding flow data
- [x] `/api/block/[id]` - Block details by height or hash
- [x] `/api/tx/[txid]` - Transaction details
- [x] `/api/address/[address]` - T-address balance and history
- [x] **API Caching** - In-memory cache with request deduplication (1min TTL) on prices, pools, flows routes

### Data Hooks
- [x] `useChainData()` - Blockchain data with 30s polling
- [x] `useCurrentPrice()` - Current price with 10min cache
- [x] `usePrices(range)` - Price history
- [x] `usePoolsHistory(range)` - Pool history
- [x] `useFlowData(range)` - Shielding/deshielding flow data
- [x] `usePrivacyWeather(period)` - Privacy conditions derived from flow data
- [x] `useApiHealth()` - API connection status

### Infrastructure
- [x] Mobile responsive design
- [x] Touch support for windows
- [x] Custom background support (color, builtin, upload, URL)
- [x] Retro/Modern icon toggle
- [x] Date/time format options
- [x] Font size scaling (small/medium/large)

---

## Outstanding Items

### High Priority
- [ ] **Taskbar Position Config** - Allow top/bottom taskbar via Settings

### Medium Priority
- [ ] **BBS RPG Emulator** - Text-based RPG experience
- [ ] **Address Watch List** - Bookmark/track addresses in Explorer (requires auth)
- [ ] **Transaction Search History** - Remember recent Explorer searches

### Low Priority / Nice to Have
- [ ] **Aqua ZEC Theme** - Early 2000s Mac OS X style
- [ ] **Zenith Theme** - Modern/flat design
- [ ] **Notification System** - Price alerts, block alerts
- [ ] **Mining Calculator** - Estimate mining rewards
- [ ] **Multi-currency Support** - EUR, GBP price display

### Shelved (pending auth system)
- [ ] **Score History Tracking** - Persist game scores
- [ ] **PDF Report Exports** - Export explorer data

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── chain/route.ts
│       ├── price/route.ts
│       ├── prices/route.ts
│       ├── pools/route.ts
│       ├── flows/route.ts
│       ├── block/[id]/route.ts
│       ├── tx/[txid]/route.ts
│       └── address/[address]/route.ts
├── components/
│   ├── Desktop/
│   │   ├── Desktop.tsx
│   │   └── DesktopIcon.tsx
│   ├── Taskbar/
│   │   └── Taskbar.tsx
│   ├── Window/
│   │   └── Window.tsx
│   ├── Boot/
│   │   └── BootSplash.tsx
│   ├── MemoryWarning/
│   │   └── MemoryWarning.tsx
│   └── apps/
│       ├── PriceTicker.tsx
│       ├── PriceChart.tsx
│       ├── BlockHeight.tsx
│       ├── Difficulty.tsx
│       ├── TransparentPool.tsx
│       ├── ShieldedPool.tsx
│       ├── Pools.tsx
│       ├── PoolsChart.tsx
│       ├── TotalSupply.tsx
│       ├── TotalShielded.tsx
│       ├── ShieldedPercent.tsx
│       ├── ShieldedChart.tsx
│       ├── SupplyUsdChart.tsx
│       ├── TotalTxs.tsx
│       ├── Explorer.tsx
│       ├── Calculator.tsx
│       ├── Terminal.tsx
│       ├── Settings.tsx
│       ├── Themes.tsx
│       ├── About.tsx
│       ├── FolderContents.tsx
│       ├── games/
│       │   ├── Shmup.tsx
│       │   └── Pong.tsx
│       └── widgets/
│           ├── NetworkData.tsx
│           └── ChartsDashboard.tsx
├── config/
│   └── api.ts
├── hooks/
│   ├── useZecData.ts
│   ├── useFlowData.ts
│   ├── useSound.ts
│   └── useMemoryMonitor.ts
├── store/
│   ├── windowStore.ts
│   ├── themeStore.ts
│   ├── settingsStore.ts
│   └── explorerStore.ts
├── themes/
│   ├── index.ts
│   ├── crt-green.ts
│   ├── golden-gate.ts
│   └── millennium.ts
└── utils/
    └── windowPlacement.ts
```

---

## Tech Stack

- **Framework:** Next.js 16 + TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **State:** Zustand with localStorage persistence
- **Windows:** react-rnd (draggable/resizable)
- **Charts:** uPlot
- **Audio:** Web Audio API (oscillator-based 8-bit sounds)
- **Fonts:** VT323, Press Start 2P (Google Fonts)
