'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { useSettingsStore, formatDate, formatTime, getIcon } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { useSound, masterGain } from '@/hooks/useSound';
import { useApiHealth, useChainData, useCurrentPrice } from '@/hooks/useZecData';
import { calculateWindowPosition } from '@/utils/windowPlacement';

// App definitions for menu
interface MenuItem {
  id: string;
  type: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  disabled?: boolean;
}

// Stats apps (non-chart data displays)
const STATS_MENU: MenuItem[] = [
  { id: 'price-ticker', type: 'price-ticker', title: 'ZEC Price', icon: '💰', defaultSize: { width: 300, height: 180 }, minSize: { width: 200, height: 120 } },
  { id: 'block-height', type: 'block-height', title: 'Block Height', icon: '📦', defaultSize: { width: 300, height: 170 }, minSize: { width: 200, height: 120 } },
  { id: 'difficulty', type: 'difficulty', title: 'Difficulty', icon: '⚡', defaultSize: { width: 320, height: 170 }, minSize: { width: 220, height: 120 } },
  { id: 'transparent-pool', type: 'transparent-pool', title: 'Transparent Pool', icon: '🔓', defaultSize: { width: 320, height: 170 }, minSize: { width: 220, height: 120 } },
  { id: 'shielded-pool', type: 'shielded-pool', title: 'Shielded Pool', icon: '🛡️', defaultSize: { width: 340, height: 200 }, minSize: { width: 240, height: 140 } },
  { id: 'pools', type: 'pools', title: 'Pools', icon: '🏊', defaultSize: { width: 320, height: 260 }, minSize: { width: 260, height: 200 } },
  { id: 'total-supply', type: 'total-supply', title: 'Total Supply', icon: '💎', defaultSize: { width: 300, height: 220 }, minSize: { width: 240, height: 180 } },
  { id: 'total-shielded', type: 'total-shielded', title: 'Total Shielded', icon: '🔒', defaultSize: { width: 300, height: 220 }, minSize: { width: 240, height: 180 } },
  { id: 'shielded-percent', type: 'shielded-percent', title: 'Shielded %', icon: '📉', defaultSize: { width: 300, height: 260 }, minSize: { width: 240, height: 200 } },
  { id: 'total-txs', type: 'total-txs', title: 'Total TXs', icon: '🧾', defaultSize: { width: 280, height: 200 }, minSize: { width: 220, height: 160 } },
];

// Chart apps
const CHARTS_MENU: MenuItem[] = [
  { id: 'price-chart', type: 'price-chart', title: 'Price Chart', icon: '📈', defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
  { id: 'shielded-chart', type: 'shielded-chart', title: 'Shielded Chart', icon: '📗', defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
  { id: 'pools-chart', type: 'pools-chart', title: 'Pools Chart', icon: '🌊', defaultSize: { width: 560, height: 500 }, minSize: { width: 420, height: 360 } },
  { id: 'supply-chart', type: 'supply-chart', title: 'Supply Chart', icon: '💵', defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
];

const GAMES_MENU: MenuItem[] = [
  { id: 'shmup',   type: 'shmup',   title: 'Shmup',               icon: '🚀', defaultSize: { width: 440, height: 600 }, minSize: { width: 420, height: 560 } },
  { id: 'pong',    type: 'pong',    title: 'Pong',                 icon: '🏓', defaultSize: { width: 440, height: 400 }, minSize: { width: 420, height: 360 } },
  { id: 'bbs-rpg', type: 'bbs-rpg', title: 'The Dark Forest BBS',  icon: '⚔️', defaultSize: { width: 600, height: 660 }, minSize: { width: 520, height: 560 } },
];

const TOOLS_MENU: MenuItem[] = [
  { id: 'about',           type: 'about',           title: 'About ZEC-OS',    icon: 'ℹ️',  defaultSize: { width: 660, height: 680 },  minSize: { width: 440, height: 460 } },
  { id: 'ua-decoder',      type: 'ua-decoder',      title: 'Address Decoder', icon: '🔓', defaultSize: { width: 740, height: 700 },  minSize: { width: 520, height: 480 } },
  { id: 'block-comparison',type: 'block-comparison',title: 'Block Comparison',icon: '⚖️', defaultSize: { width: 900, height: 780 },  minSize: { width: 620, height: 520 } },
  { id: 'calculator',      type: 'calculator',      title: 'Calculator',      icon: '🔢', defaultSize: { width: 300, height: 460 },  minSize: { width: 220, height: 320 } },
  { id: 'explorer',        type: 'explorer',        title: 'Explorer',        icon: '🔍', defaultSize: { width: 860, height: 880 },  minSize: { width: 580, height: 580 } },
  { id: 'mempool',         type: 'mempool',         title: 'Mempool',         icon: '⏳', defaultSize: { width: 980, height: 820 },  minSize: { width: 640, height: 520 } },
  { id: 'mining',          type: 'mining',          title: 'Mining',          icon: '⛏',  defaultSize: { width: 1200, height: 960 }, minSize: { width: 760, height: 580 } },
  { id: 'settings',        type: 'settings',        title: 'Settings',        icon: '⚙️', defaultSize: { width: 500, height: 660 },  minSize: { width: 360, height: 480 } },
  { id: 'terminal',        type: 'terminal',        title: 'Terminal',        icon: '💻', defaultSize: { width: 720, height: 600 },  minSize: { width: 480, height: 360 } },
  { id: 'themes',          type: 'themes',          title: 'Themes',          icon: '🎨', defaultSize: { width: 500, height: 660 },  minSize: { width: 380, height: 480 } },
  { id: 'tx-graph',        type: 'tx-graph',        title: 'TX Graph',        icon: '🕸',  defaultSize: { width: 1060, height: 800 }, minSize: { width: 740, height: 540 } },
  { id: 'watchlist',       type: 'watchlist',       title: 'Watchlist',       icon: '👁',  defaultSize: { width: 680, height: 720 },  minSize: { width: 480, height: 480 } },
];

const PRIVACY_MENU: MenuItem[] = [
  { id: 'privacy-weather', type: 'privacy-weather', title: 'Privacy Weather', icon: '🌤️', defaultSize: { width: 420, height: 520 }, minSize: { width: 360, height: 440 } },
  { id: 'privacy-coach', type: 'privacy-coach', title: 'Privacy Coach', icon: '🛡️', defaultSize: { width: 480, height: 600 }, minSize: { width: 400, height: 500 } },
];

const ABOUT_ITEM: MenuItem = {
  id: 'about', type: 'about', title: 'About ZEC-OS', icon: 'ℹ️', defaultSize: { width: 660, height: 680 }, minSize: { width: 440, height: 460 }
};

// Legacy export for compatibility - actual height comes from theme
export const TASKBAR_HEIGHT = 54;

export function Taskbar() {
  const { windows, focusWindow, openWindow } = useWindowStore();
  const { dateFormat, timeFormat, soundEnabled, setSoundEnabled, retroIcons, setRetroIcons, volume, setVolume } = useSettingsStore();
  const volPct = Math.round(volume * 100); // store volume is 0–1; UI shows 0–100

  // Live audio preview: a continuous tone while the volume slider is held, so you
  // hear the level change in realtime (instead of a beep on release).
  const previewRef = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);
  const previewLevel = () => Math.min(1.2, 0.16 * masterGain());
  const startPreview = () => {
    if (!soundEnabled || previewRef.current) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator(); osc.type = 'triangle'; osc.frequency.value = 523.25;
      const gain = ctx.createGain(); gain.gain.value = previewLevel();
      osc.connect(gain); gain.connect(ctx.destination); osc.start();
      previewRef.current = { ctx, osc, gain };
    } catch { /* audio unavailable */ }
  };
  const updatePreview = () => {
    const p = previewRef.current;
    if (p) { try { p.gain.gain.setTargetAtTime(previewLevel(), p.ctx.currentTime, 0.02); } catch { /* noop */ } }
  };
  const stopPreview = () => {
    const p = previewRef.current;
    if (!p) return;
    previewRef.current = null;
    try {
      p.gain.gain.setTargetAtTime(0.0001, p.ctx.currentTime, 0.03);
      p.osc.stop(p.ctx.currentTime + 0.12);
      setTimeout(() => { try { p.ctx.close(); } catch { /* noop */ } }, 250);
    } catch { /* noop */ }
  };
  const getTheme = useThemeStore((state) => state.getTheme);
  const theme = getTheme();
  const { playClick, playOpen } = useSound();
  const { displayName, walletAddress, isGuest, isAuthenticated, sessionToken, isVerified } = useAuthStore();
  const { healthy, lastUpdate, latency, blockHeight: apiBlockHeight, priceUsd, shieldedPercent: apiShieldedPercent, totalShielded } = useApiHealth();
  const { data: chainData } = useChainData();
  const { price: currentPrice } = useCurrentPrice();

  // Calculate stats for taskbar
  const blockHeight = chainData?.height ?? 0;
  const pools = chainData?.pools;
  const totalSupply = 21_000_000; // ZEC max supply
  const shieldedTotal = (pools?.sprout ?? 0) + (pools?.sapling ?? 0) + (pools?.orchard ?? 0);
  const shieldedPercent = totalSupply > 0 ? ((shieldedTotal / totalSupply) * 100).toFixed(1) : '—';

  // Theme-aware values
  const taskbarHeight = theme?.taskbar?.height || 54;
  const taskbarPosition = theme?.taskbar?.position || 'top';
  const logoType = theme?.taskbar?.logoType || 'text';
  const logoText = theme?.taskbar?.logoText || 'ZEC-OS';
  const logoImage = theme?.taskbar?.logoImage || '/zec-logo.svg';

  const [time, setTime] = useState<Date>(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsSubmenuOpen, setAppsSubmenuOpen] = useState(false);
  const [statsSubmenuOpen, setStatsSubmenuOpen] = useState(false);
  const [chartsSubmenuOpen, setChartsSubmenuOpen] = useState(false);
  const [gamesSubmenuOpen, setGamesSubmenuOpen] = useState(false);
  const [toolsSubmenuOpen, setToolsSubmenuOpen] = useState(false);
  const [privacySubmenuOpen, setPrivacySubmenuOpen] = useState(false);
  const [wirelessPopupOpen, setWirelessPopupOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  // Stop any preview tone when the volume dropdown closes.
  useEffect(() => { if (!volumeOpen) stopPreview(); }, [volumeOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const menuRef    = useRef<HTMLDivElement>(null);
  const wirelessRef = useRef<HTMLDivElement>(null);
  const volumeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setAppsSubmenuOpen(false);
        setStatsSubmenuOpen(false);
        setChartsSubmenuOpen(false);
        setGamesSubmenuOpen(false);
        setToolsSubmenuOpen(false);
        setPrivacySubmenuOpen(false);
      }
      if (wirelessRef.current && !wirelessRef.current.contains(e.target as Node)) {
        setWirelessPopupOpen(false);
      }
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setVolumeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setAppsSubmenuOpen(false);
    setStatsSubmenuOpen(false);
    setChartsSubmenuOpen(false);
    setGamesSubmenuOpen(false);
    setToolsSubmenuOpen(false);
    setPrivacySubmenuOpen(false);
  };

  const handleOpenApp = (item: MenuItem) => {
    if (item.disabled) {
      playClick();
      return;
    }
    playOpen();
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const position = calculateWindowPosition(windows, item.defaultSize, screenWidth, screenHeight);

    openWindow({
      id: item.id,
      type: item.type,
      title: item.title,
      position,
      size: item.defaultSize,
      minSize: item.minSize,
    });
    closeAllMenus();
  };

  const openAccountApp = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const size = { width: 620, height: 640 };
    const existing = windows.find(w => w.type === 'account');
    if (existing) { focusWindow(existing.id); return; }
    openWindow({
      id: 'account',
      type: 'account',
      title: 'Account',
      position: calculateWindowPosition(windows, size, screenWidth, screenHeight),
      size,
      minSize: { width: 460, height: 480 },
    });
  };

  const handleMenuToggle = () => {
    playClick();
    if (menuOpen) {
      closeAllMenus();
    } else {
      setMenuOpen(true);
    }
  };

  const handleAppsHover = () => {
    setAppsSubmenuOpen(true);
    setGamesSubmenuOpen(false);
    setToolsSubmenuOpen(false);
    setPrivacySubmenuOpen(false);
  };

  const handleGamesHover = () => {
    setGamesSubmenuOpen(true);
    setAppsSubmenuOpen(false);
    setToolsSubmenuOpen(false);
    setPrivacySubmenuOpen(false);
  };

  const handleToolsHover = () => {
    setToolsSubmenuOpen(true);
    setAppsSubmenuOpen(false);
    setGamesSubmenuOpen(false);
    setPrivacySubmenuOpen(false);
  };


  const handleStatsHover = () => {
    setStatsSubmenuOpen(true);
    setChartsSubmenuOpen(false);
    setPrivacySubmenuOpen(false);
  };

  const handleChartsHover = () => {
    setChartsSubmenuOpen(true);
    setStatsSubmenuOpen(false);
    setPrivacySubmenuOpen(false);
  };

  const handlePrivacyInAppsHover = () => {
    setPrivacySubmenuOpen(true);
    setStatsSubmenuOpen(false);
    setChartsSubmenuOpen(false);
  };

  const handleSoundToggle = () => {
    if (soundEnabled) playClick();
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) setTimeout(() => playClick(), 50);
  };

  const handleRetroToggle = () => {
    playClick();
    setRetroIcons(!retroIcons);
  };

  const healthColor = healthy === null ? 'var(--text-amber)' : healthy ? 'var(--accent-green)' : 'var(--accent-orange)';

  const icon = (emoji: string) => getIcon(emoji, retroIcons);

  // Position classes based on theme
  const positionClasses = taskbarPosition === 'bottom'
    ? 'fixed bottom-0 left-0 right-0 border-t-2'
    : 'fixed top-0 left-0 right-0 border-b-2';

  return (
    <div
      className={`
        ${positionClasses}
        bg-[var(--bg-titlebar)]
        border-[var(--border-dark)]
        flex items-center justify-between
        px-2
        z-[9999]
      `}
      style={{ height: `${taskbarHeight}px` }}
    >
      {/* Left: App Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleMenuToggle}
          className="
            btn-window px-3 py-2
            text-[var(--accent-gold)]
            flex items-center gap-2
          "
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-icon)' }}
        >
          {logoType === 'image' ? (
            <img src={logoImage} alt="Logo" className="h-6 w-6" />
          ) : (
            <span className={retroIcons ? 'text-[var(--text-primary)] text-sm' : ''}>{logoText}</span>
          )}
          <span style={{ fontSize: '10px' }}>▼</span>
        </button>

        {/* Main Dropdown Menu */}
        {menuOpen && (
          <div
            className="
              absolute top-full left-0 mt-1
              bg-[#1a1a2e]
              window-border
              min-w-52
              z-[9999]
            "
          >
            <div className="py-1">
              {/* About */}
              <button
                onClick={() => handleOpenApp(ABOUT_ITEM)}
                className="
                  w-full px-3 py-2 text-left
                  hover:bg-[var(--accent-gold)]/20
                  flex items-center gap-3
                  text-[var(--text-primary)]
                "
                style={{ fontSize: 'var(--font-size-menu)' }}
              >
                <span>{icon(ABOUT_ITEM.icon)}</span>
                <span>{ABOUT_ITEM.title}</span>
              </button>

              {/* Divider */}
              <div className="border-t border-[var(--border-window)] my-1" />

              {/* Apps Submenu */}
              <div
                className="relative"
                onMouseEnter={handleAppsHover}
              >
                <button
                  className="
                    w-full px-3 py-2 text-left
                    hover:bg-[var(--accent-gold)]/20
                    flex items-center justify-between
                    text-[var(--text-secondary)]
                  "
                  style={{ fontSize: 'var(--font-size-menu)' }}
                >
                  <span className="flex items-center gap-3">
                    <span>{icon('📊')}</span>
                    <span>Apps</span>
                  </span>
                  <span>▶</span>
                </button>

                {/* Apps Submenu Dropdown - contains Stats and Charts */}
                {appsSubmenuOpen && (
                  <div
                    className="
                      absolute left-full top-0
                      bg-[#1a1a2e]
                      window-border
                      min-w-40
                    "
                  >
                    {/* Stats Submenu */}
                    <div className="relative" onMouseEnter={handleStatsHover}>
                      <button
                        className="
                          w-full px-3 py-2 text-left
                          hover:bg-[var(--accent-gold)]/20
                          flex items-center justify-between
                          text-[var(--text-secondary)]
                        "
                        style={{ fontSize: 'var(--font-size-menu)' }}
                      >
                        <span className="flex items-center gap-3">
                          <span>{icon('📊')}</span>
                          <span>Stats</span>
                        </span>
                        <span>▶</span>
                      </button>

                      {statsSubmenuOpen && (
                        <div
                          className="
                            absolute left-full top-0
                            bg-[#1a1a2e]
                            window-border
                            min-w-48
                          "
                        >
                          {STATS_MENU.map((app) => (
                            <button
                              key={app.id}
                              onClick={() => handleOpenApp(app)}
                              className="
                                w-full px-3 py-2 text-left
                                hover:bg-[var(--accent-gold)]/20
                                flex items-center gap-3
                                text-[var(--text-primary)]
                              "
                              style={{ fontSize: 'var(--font-size-menu)' }}
                            >
                              <span>{icon(app.icon)}</span>
                              <span>{app.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Charts Submenu */}
                    <div className="relative" onMouseEnter={handleChartsHover}>
                      <button
                        className="
                          w-full px-3 py-2 text-left
                          hover:bg-[var(--accent-gold)]/20
                          flex items-center justify-between
                          text-[var(--text-secondary)]
                        "
                        style={{ fontSize: 'var(--font-size-menu)' }}
                      >
                        <span className="flex items-center gap-3">
                          <span>{icon('📈')}</span>
                          <span>Charts</span>
                        </span>
                        <span>▶</span>
                      </button>

                      {chartsSubmenuOpen && (
                        <div
                          className="
                            absolute left-full top-0
                            bg-[#1a1a2e]
                            window-border
                            min-w-48
                          "
                        >
                          {CHARTS_MENU.map((app) => (
                            <button
                              key={app.id}
                              onClick={() => handleOpenApp(app)}
                              className="
                                w-full px-3 py-2 text-left
                                hover:bg-[var(--accent-gold)]/20
                                flex items-center gap-3
                                text-[var(--text-primary)]
                              "
                              style={{ fontSize: 'var(--font-size-menu)' }}
                            >
                              <span>{icon(app.icon)}</span>
                              <span>{app.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Privacy Submenu (nested under Apps) */}
                    <div className="relative" onMouseEnter={handlePrivacyInAppsHover}>
                      <button
                        className="
                          w-full px-3 py-2 text-left
                          hover:bg-[var(--accent-gold)]/20
                          flex items-center justify-between
                          text-[var(--text-secondary)]
                        "
                        style={{ fontSize: 'var(--font-size-menu)' }}
                      >
                        <span className="flex items-center gap-3">
                          <span>{icon('🔒')}</span>
                          <span>Privacy</span>
                        </span>
                        <span>▶</span>
                      </button>

                      {privacySubmenuOpen && (
                        <div
                          className="
                            absolute left-full top-0
                            bg-[#1a1a2e]
                            window-border
                            min-w-48
                          "
                        >
                          {PRIVACY_MENU.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleOpenApp(item)}
                              className="
                                w-full px-3 py-2 text-left
                                hover:bg-[var(--accent-gold)]/20
                                flex items-center gap-3
                                text-[var(--text-primary)]
                              "
                              style={{ fontSize: 'var(--font-size-menu)' }}
                            >
                              <span>{icon(item.icon)}</span>
                              <span>{item.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Games Submenu */}
              <div
                className="relative"
                onMouseEnter={handleGamesHover}
              >
                <button
                  className="
                    w-full px-3 py-2 text-left
                    hover:bg-[var(--accent-gold)]/20
                    flex items-center justify-between
                    text-[var(--text-secondary)]
                  "
                  style={{ fontSize: 'var(--font-size-menu)' }}
                >
                  <span className="flex items-center gap-3">
                    <span>{icon('🎮')}</span>
                    <span>Games</span>
                  </span>
                  <span>▶</span>
                </button>

                {gamesSubmenuOpen && (
                  <div
                    className="
                      absolute left-full top-0
                      bg-[#1a1a2e]
                      window-border
                      min-w-48
                    "
                  >
                    {GAMES_MENU.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => handleOpenApp(game)}
                        className="
                          w-full px-3 py-2 text-left
                          hover:bg-[var(--accent-gold)]/20
                          flex items-center gap-3
                          text-[var(--text-primary)]
                        "
                        style={{ fontSize: 'var(--font-size-menu)' }}
                      >
                        <span>{icon(game.icon)}</span>
                        <span>{game.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tools Submenu */}
              <div
                className="relative"
                onMouseEnter={handleToolsHover}
              >
                <button
                  className="
                    w-full px-3 py-2 text-left
                    hover:bg-[var(--accent-gold)]/20
                    flex items-center justify-between
                    text-[var(--text-secondary)]
                  "
                  style={{ fontSize: 'var(--font-size-menu)' }}
                >
                  <span className="flex items-center gap-3">
                    <span>{icon('🔧')}</span>
                    <span>Tools</span>
                  </span>
                  <span>▶</span>
                </button>

                {/* Tools Submenu Dropdown */}
                {toolsSubmenuOpen && (
                  <div
                    className="
                      absolute left-full top-0
                      bg-[#1a1a2e]
                      window-border
                      min-w-48
                    "
                  >
                    {TOOLS_MENU.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleOpenApp(tool)}
                        className="
                          w-full px-3 py-2 text-left
                          hover:bg-[var(--accent-gold)]/20
                          flex items-center gap-3
                          text-[var(--text-primary)]
                        "
                        style={{ fontSize: 'var(--font-size-menu)' }}
                      >
                        <span>{icon(tool.icon)}</span>
                        <span>{tool.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Center: Minimized Windows */}
      <div className="flex-1 flex items-center gap-1 mx-4 overflow-x-auto">
        {windows
          .filter(w => w.minimized)
          .map((win) => (
            <button
              key={win.id}
              onClick={() => {
                playClick();
                focusWindow(win.id);
              }}
              className="
                btn-window px-3 py-2
                text-[var(--text-primary)]
                flex items-center gap-1
                max-w-40 truncate
              "
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              <span className="truncate">{win.title}</span>
            </button>
          ))}
      </div>

      {/* Stats Display */}
      <div className="flex items-center gap-5 px-4" style={{ fontSize: 'calc(var(--font-size-menu) * 0.78)' }}>
        {currentPrice && (
          <span className="text-[var(--accent-gold)]" title="ZEC/USD Price">
            <span className="text-[var(--accent-green)]">ZEC:</span> ${currentPrice.toFixed(2)}
          </span>
        )}
        <span className="text-[var(--accent-green)]" title="Shielded % of Total Supply">
          Shielded: <span className="text-[var(--accent-gold)]">{shieldedPercent}%</span>
        </span>
        {blockHeight > 0 && (
          <span className="text-[var(--text-primary)]" title="Current Block Height">
            Block Height: <span className="text-[var(--accent-gold)]">#{blockHeight.toLocaleString()}</span>
          </span>
        )}
        {isAuthenticated && (
          <span
            className="border-l border-[var(--border-window)] pl-4 flex items-center gap-2"
            title={walletAddress ?? 'Guest session'}
          >
            <span className="text-[var(--text-muted)]">logged in as </span>
            {isGuest ? (
              <span className="text-[var(--text-muted)] opacity-60">guest</span>
            ) : (
              <>
                <button
                  onClick={openAccountApp}
                  title="Open Account"
                  className="text-[var(--accent-green)] font-mono hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  {displayName
                    ? displayName
                    : walletAddress
                      ? `${walletAddress.slice(0, 8)}…${walletAddress.slice(-4)}`
                      : 'anon'}
                </button>
                <span
                  className="text-[var(--accent-gold)]"
                  style={{ fontSize: '10px' }}
                  title="Ownership verified — synced to server"
                >
                  · synced
                </span>
              </>
            )}
            <button
              onClick={() => { useAuthStore.getState().logout(); window.location.reload(); }}
              className="logout-btn flex items-center border border-transparent hover:border-[var(--border-window)] transition-colors"
              title="Log out"
              style={{ color: '#FF5555', padding: '1px 4px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </span>
        )}
      </div>

      {/* Right: Sound + Wireless + Date + Clock */}
      <div className="flex items-center gap-2">
        {/* Retro Icons Toggle */}
        <button
          onClick={handleRetroToggle}
          className="btn-window px-2 py-1 flex items-center"
          title={retroIcons ? 'Use emoji icons' : 'Use retro ASCII icons'}
          style={{ fontSize: 'var(--font-size-menu)' }}
        >
          <span className={retroIcons ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}>
            {retroIcons ? '[A]' : '😀'}
          </span>
        </button>

        {/* Volume control */}
        <div className="relative" ref={volumeRef}>
          <button
            onClick={() => { playClick(); setVolumeOpen(v => !v); }}
            className="btn-window px-2 py-1 flex items-center"
            title="Volume"
            style={{ fontSize: 'var(--font-size-menu)' }}
          >
            <span className={soundEnabled && volPct > 0 ? 'text-[var(--accent-green)]' : 'text-[var(--text-secondary)]'}>
              {icon(!soundEnabled || volPct === 0 ? '🔇' : volPct < 40 ? '🔉' : '🔊')}
            </span>
          </button>

          {volumeOpen && (
            <div
              className="absolute top-full right-0 mt-1 bg-[#1a1a2e] window-border p-3 z-[9999] flex flex-col items-center gap-2"
              style={{ width: '100px' }}
            >
              <span className="text-[var(--accent-gold)]" style={{ fontSize: 'var(--font-size-label)' }}>
                VOL {volPct}%
              </span>
              {/* Vertical slider — live-bound to the master volume */}
              <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volPct}
                  onChange={e => {
                    const v = Number(e.target.value);
                    if (v > 0 && !soundEnabled) setSoundEnabled(true);
                    setVolume(v / 100);                 // live: masterGain() reads this immediately
                    updatePreview();                    // realtime: tone tracks the level as you drag
                  }}
                  onPointerDown={startPreview}
                  onPointerUp={stopPreview}
                  onPointerLeave={stopPreview}
                  onPointerCancel={stopPreview}
                  onKeyDown={() => { if (!previewRef.current) startPreview(); }}
                  onKeyUp={stopPreview}
                  onBlur={stopPreview}
                  style={{
                    writingMode: 'vertical-lr' as React.CSSProperties['writingMode'],
                    direction: 'rtl',
                    width: '28px',
                    height: '90px',
                    cursor: 'pointer',
                    accentColor: 'var(--accent-gold)',
                  }}
                />
              </div>
              <button
                onClick={() => {
                  if (soundEnabled) playClick();
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) setTimeout(() => playClick(), 50);
                }}
                className={`btn-window w-full py-1 flex items-center justify-center ${soundEnabled ? 'text-[var(--accent-green)]' : 'text-[var(--text-secondary)]'}`}
                style={{ fontSize: 'var(--font-size-menu)' }}
                title={soundEnabled ? 'Mute' : 'Unmute'}
                aria-label={soundEnabled ? 'Mute' : 'Unmute'}
              >
                {icon(soundEnabled ? '🔊' : '🔇')}
              </button>
            </div>
          )}
        </div>

        {/* Wireless/Connection Status */}
        <div className="relative" ref={wirelessRef}>
          <button
            onClick={() => {
              playClick();
              setWirelessPopupOpen(!wirelessPopupOpen);
            }}
            className="btn-window px-2 py-1 flex items-center gap-1"
            title="API Connection Status"
            style={{ fontSize: 'var(--font-size-menu)' }}
          >
            <span style={{ color: healthColor }}>
              {icon(healthy ? '📶' : '📵')}
            </span>
          </button>

          {/* Wireless Popup */}
          {wirelessPopupOpen && (
            <div
              className="
                absolute top-full right-0 mt-1
                bg-[#1a1a2e]
                window-border
                p-3
                z-[9999]
              "
              style={{ width: '280px' }}
            >
              <div className="mb-3">
                <h3
                  className="text-[var(--accent-gold)]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-icon)' }}
                >
                  API Status
                </h3>
                <div className="text-[var(--text-muted)]" style={{ fontSize: 'calc(var(--font-size-label) * 0.7)' }}>
                  auto-updates every 30s · price every 60s
                </div>
              </div>

              <div className="space-y-2" style={{ fontSize: 'var(--font-size-label)' }}>
                <div className="flex justify-between gap-4">
                  <span className="text-[var(--text-secondary)]">Status:</span>
                  <span style={{ color: healthColor }}>
                    {healthy === null ? 'Checking...' : healthy ? 'Connected' : 'Offline'}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[var(--text-secondary)]">Latency:</span>
                  <span className={latency !== null && latency < 500 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-orange)]'}>
                    {latency !== null ? `${latency}ms` : '—'}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[var(--text-secondary)]">Last Update:</span>
                  <span className="text-[var(--text-primary)]">
                    {lastUpdate ? formatTime(lastUpdate, timeFormat) : '—'}
                  </span>
                </div>

                <div className="border-t border-[var(--border-window)] my-2 pt-2">
                  <div className="flex justify-between gap-4">
                    <span className="text-[var(--text-secondary)]">Block Height:</span>
                    <span className="text-[var(--accent-green)]">
                      {apiBlockHeight ? `#${apiBlockHeight.toLocaleString()}` : '—'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 mt-1">
                    <span className="text-[var(--text-secondary)]">ZEC Price:</span>
                    <span className="text-[var(--accent-green)]">
                      {priceUsd ? `$${priceUsd.toFixed(2)}` : '—'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 mt-1">
                    <span className="text-[var(--text-secondary)]">Shielded:</span>
                    <span className="text-[var(--accent-green)]">
                      {apiShieldedPercent !== null ? `${apiShieldedPercent.toFixed(1)}%` : '—'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 mt-1">
                    <span className="text-[var(--text-secondary)]">Total Shielded:</span>
                    <span className="text-[var(--accent-green)]">
                      {totalShielded ? `${(totalShielded / 1e6).toFixed(2)}M ZEC` : '—'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[var(--border-window)] mt-3 pt-3">
                  <button
                    onClick={() => {
                      setWirelessPopupOpen(false);
                      handleOpenApp(TOOLS_MENU.find(t => t.id === 'explorer')!);
                    }}
                    className="btn-window w-full py-2 text-[var(--accent-green)] hover:bg-[var(--accent-gold)]/20"
                    style={{ fontSize: 'var(--font-size-label)' }}
                  >
                    {icon('🔍')} Explore the Network
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date */}
        <div
          className="text-[var(--text-primary)] px-1 taskbar-date"
          style={{ fontFamily: 'var(--font-primary)', fontSize: 'calc(var(--font-size-clock) * 0.72)' }}
        >
          {formatDate(time, dateFormat)}
        </div>

        {/* Clock */}
        <div
          className="text-[var(--text-secondary)] px-1 taskbar-clock"
          style={{ fontFamily: 'var(--font-primary)', fontSize: 'calc(var(--font-size-clock) * 0.72)' }}
        >
          {formatTime(time, timeFormat)}
        </div>
      </div>
    </div>
  );
}
