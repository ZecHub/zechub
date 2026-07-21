'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useWindowStore } from '@/store/windowStore';
import { useSettingsStore, getIcon } from '@/store/settingsStore';
import { useIsAdmin } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { Window } from '@/components/Window/Window';
import { WindowErrorBoundary } from '@/components/Window/WindowErrorBoundary';
import { DesktopIcon, GRID_SIZE } from './DesktopIcon';
import { DesktopFolder } from './DesktopFolder';
import { useSound } from '@/hooks/useSound';

// App registry - defines all available apps
export interface AppConfig {
  id: string;
  type: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  component: React.ComponentType;
  showOnDesktop?: boolean;
  category?: 'stats' | 'charts' | 'games' | 'privacy' | 'tools' | 'widgets';
  adminOnly?: boolean; // only listed for the verified sysop
}

// Import app components
import { PriceTicker } from '@/components/apps/PriceTicker';
import { BlockHeight } from '@/components/apps/BlockHeight';
import { Difficulty } from '@/components/apps/Difficulty';
import { TransparentPool } from '@/components/apps/TransparentPool';
import { ShieldedPool } from '@/components/apps/ShieldedPool';
import { PriceChart } from '@/components/apps/PriceChart';
import { About } from '@/components/apps/About';
import { Settings } from '@/components/apps/Settings';
import { Calculator } from '@/components/apps/Calculator';
import { Themes } from '@/components/apps/Themes';
import { Pools } from '@/components/apps/Pools';
import { TotalSupply } from '@/components/apps/TotalSupply';
import { TotalShielded } from '@/components/apps/TotalShielded';
import { ShieldedPercent } from '@/components/apps/ShieldedPercent';
import { TotalTxs } from '@/components/apps/TotalTxs';
import { ShieldedChart } from '@/components/apps/ShieldedChart';
import { PoolsChart } from '@/components/apps/PoolsChart';
import { SupplyChart } from '@/components/apps/SupplyUsdChart';
import { Readme } from '@/components/apps/Readme';
import {
  StatsFolderContents,
  ChartsFolderContents,
  ToolsFolderContents,
  GamesFolderContents,
  PrivacyFolderContents,
  WidgetsFolderContents,
} from '@/components/apps/FolderContents';

// Lazy-loaded components (games, terminal, explorer, privacy, widgets - only load when opened)
const Terminal = dynamic(() => import('@/components/apps/Terminal'), { ssr: false });
const Pong = dynamic(() => import('@/components/apps/games/Pong'), { ssr: false });
const Explorer = dynamic(() => import('@/components/apps/Explorer'), { ssr: false });
const BlockMap = dynamic(() => import('@/components/apps/BlockMap'), { ssr: false });
const ChainPulse = dynamic(() => import('@/components/apps/ChainPulse'), { ssr: false });
const PrivacyCoach = dynamic(() => import('@/components/apps/privacy/PrivacyCoach'), { ssr: false });
const NetworkData = dynamic(() => import('@/components/apps/widgets/NetworkData'), { ssr: false });
const ChartsDashboard = dynamic(() => import('@/components/apps/widgets/ChartsDashboard'), { ssr: false });
const Mining = dynamic(() => import('@/components/apps/Mining'), { ssr: false });
const UaDecoder = dynamic(() => import('@/components/apps/tools/UaDecoder'), { ssr: false });
const Account = dynamic(() => import('@/components/apps/tools/Account'), { ssr: false });
const Watchlist = dynamic(() => import('@/components/apps/Watchlist'), { ssr: false });
const HalvingWidget = dynamic(() => import('@/components/apps/widgets/HalvingWidget'), { ssr: false });
const BlockComparison = dynamic(() => import('@/components/apps/BlockComparison'), { ssr: false });
const TxGraph = dynamic(() => import('@/components/apps/TxGraph'), { ssr: false });
const Mempool = dynamic(() => import('@/components/apps/Mempool'), { ssr: false });
import BlockTicker from '@/components/Desktop/BlockTicker';
import { GuestPrompt } from '@/components/GuestPrompt/GuestPrompt';
import { useWatchlistSync } from '@/hooks/useWatchlistSync';
import { useSettingsSync } from '@/hooks/useSettingsSync';
import { useOsStateSync } from '@/hooks/useOsStateSync';

export const APP_REGISTRY: AppConfig[] = [
  // Stats Apps
  {
    id: 'price-ticker',
    type: 'price-ticker',
    title: 'ZEC Price',
    icon: '💰',
    defaultSize: { width: 360, height: 260 },
    minSize: { width: 240, height: 160 },
    component: PriceTicker,
    category: 'stats',
  },
  {
    id: 'block-height',
    type: 'block-height',
    title: 'Block Height',
    icon: '📦',
    defaultSize: { width: 360, height: 260 },
    minSize: { width: 240, height: 160 },
    component: BlockHeight,
    category: 'stats',
  },
  {
    id: 'difficulty',
    type: 'difficulty',
    title: 'Difficulty',
    icon: '⚡',
    defaultSize: { width: 380, height: 260 },
    minSize: { width: 260, height: 160 },
    component: Difficulty,
    category: 'stats',
  },
  {
    id: 'transparent-pool',
    type: 'transparent-pool',
    title: 'Transparent Pool',
    icon: '🔓',
    defaultSize: { width: 380, height: 260 },
    minSize: { width: 260, height: 160 },
    component: TransparentPool,
    category: 'stats',
  },
  {
    id: 'shielded-pool',
    type: 'shielded-pool',
    title: 'Shielded Pool',
    icon: '🛡️',
    defaultSize: { width: 400, height: 300 },
    minSize: { width: 280, height: 180 },
    component: ShieldedPool,
    category: 'stats',
  },
  {
    id: 'pools',
    type: 'pools',
    title: 'Pools',
    icon: '🏊',
    defaultSize: { width: 380, height: 380 },
    minSize: { width: 300, height: 260 },
    component: Pools,
    category: 'stats',
  },
  {
    id: 'total-supply',
    type: 'total-supply',
    title: 'Total Supply',
    icon: '💎',
    defaultSize: { width: 360, height: 340 },
    minSize: { width: 280, height: 220 },
    component: TotalSupply,
    category: 'stats',
  },
  {
    id: 'total-shielded',
    type: 'total-shielded',
    title: 'Total Shielded',
    icon: '🔒',
    defaultSize: { width: 360, height: 340 },
    minSize: { width: 280, height: 220 },
    component: TotalShielded,
    category: 'stats',
  },
  {
    id: 'shielded-percent',
    type: 'shielded-percent',
    title: 'Shielded %',
    icon: '📉',
    defaultSize: { width: 360, height: 380 },
    minSize: { width: 280, height: 240 },
    component: ShieldedPercent,
    category: 'stats',
  },
  {
    id: 'total-txs',
    type: 'total-txs',
    title: 'Total TXs',
    icon: '🧾',
    defaultSize: { width: 340, height: 320 },
    minSize: { width: 260, height: 200 },
    component: TotalTxs,
    category: 'stats',
  },
  // Mining
  {
    id: 'mining',
    type: 'mining',
    title: 'Mining',
    icon: '⛏',
    defaultSize: { width: 1200, height: 960 },
    minSize: { width: 760, height: 580 },
    component: Mining,
    category: 'tools',
  },
  // Charts
  {
    id: 'price-chart',
    type: 'price-chart',
    title: 'Price Chart',
    icon: '📈',
    defaultSize: { width: 640, height: 660 },
    minSize: { width: 440, height: 420 },
    component: PriceChart,
    category: 'charts',
  },
  {
    id: 'shielded-chart',
    type: 'shielded-chart',
    title: 'Shielded Chart',
    icon: '📗',
    defaultSize: { width: 640, height: 660 },
    minSize: { width: 440, height: 420 },
    component: ShieldedChart,
    category: 'charts',
  },
  {
    id: 'pools-chart',
    type: 'pools-chart',
    title: 'Pools Chart',
    icon: '🌊',
    defaultSize: { width: 680, height: 700 },
    minSize: { width: 480, height: 440 },
    component: PoolsChart,
    category: 'charts',
  },
  {
    id: 'supply-chart',
    type: 'supply-chart',
    title: 'Supply Chart',
    icon: '💵',
    defaultSize: { width: 640, height: 660 },
    minSize: { width: 440, height: 420 },
    component: SupplyChart,
    category: 'charts',
  },
  // Tools
  {
    id: 'about',
    type: 'about',
    title: 'About ZEC-OS',
    icon: 'ℹ️',
    defaultSize: { width: 660, height: 680 },
    minSize: { width: 440, height: 460 },
    component: About,
    category: 'tools',
  },
  {
    id: 'settings',
    type: 'settings',
    title: 'Settings',
    icon: '⚙️',
    defaultSize: { width: 500, height: 660 },
    minSize: { width: 360, height: 480 },
    component: Settings,
    category: 'tools',
  },
  {
    id: 'calculator',
    type: 'calculator',
    title: 'Calculator',
    icon: '🔢',
    defaultSize: { width: 300, height: 460 },
    minSize: { width: 220, height: 320 },
    component: Calculator,
    category: 'tools',
  },
  {
    id: 'themes',
    type: 'themes',
    title: 'Themes',
    icon: '🎨',
    defaultSize: { width: 500, height: 660 },
    minSize: { width: 380, height: 480 },
    component: Themes,
    category: 'tools',
  },
  {
    id: 'terminal',
    type: 'terminal',
    title: 'Terminal',
    icon: '💻',
    defaultSize: { width: 720, height: 600 },
    minSize: { width: 480, height: 360 },
    component: Terminal,
    category: 'tools',
  },
  {
    id: 'explorer',
    type: 'explorer',
    title: 'Explorer',
    icon: '🔍',
    defaultSize: { width: 860, height: 880 },
    minSize: { width: 580, height: 580 },
    component: Explorer,
    category: 'tools',
  },
  {
    id: 'ua-decoder',
    type: 'ua-decoder',
    title: 'Address Decoder',
    icon: '🔓',
    defaultSize: { width: 740, height: 700 },
    minSize: { width: 520, height: 480 },
    component: UaDecoder,
    category: 'tools',
  },
  {
    id: 'account',
    type: 'account',
    title: 'Account',
    icon: '👤',
    defaultSize: { width: 620, height: 640 },
    minSize: { width: 460, height: 480 },
    component: Account,
    category: 'tools',
  },
  {
    id: 'watchlist',
    type: 'watchlist',
    title: 'Watchlist',
    icon: '👁',
    defaultSize: { width: 680, height: 720 },
    minSize: { width: 480, height: 480 },
    component: Watchlist,
    category: 'tools',
  },
  {
    id: 'block-comparison',
    type: 'block-comparison',
    title: 'Block Comparison',
    icon: '⚖️',
    defaultSize: { width: 900, height: 780 },
    minSize: { width: 620, height: 520 },
    component: BlockComparison,
    category: 'tools',
  },
  // Privacy Radar
  {
    id: 'privacy-coach',
    type: 'privacy-coach',
    title: 'Privacy Coach',
    icon: '🛡️',
    defaultSize: { width: 600, height: 780 },
    minSize: { width: 440, height: 580 },
    component: PrivacyCoach,
    category: 'privacy',
  },
  // Sysop-only
  // Games
  {
    id: 'pong',
    type: 'pong',
    title: 'Pong',
    icon: '🏓',
    defaultSize: { width: 440, height: 400 },
    minSize: { width: 420, height: 360 },
    component: Pong,
    category: 'games',
  },
  // Block visualizations (opened programmatically from Explorer)
  {
    id: 'block-map',
    type: 'block-map',
    title: 'Block Map',
    icon: '🗺️',
    defaultSize: { width: 920, height: 880 },
    minSize: { width: 580, height: 520 },
    component: BlockMap,
  },
  {
    id: 'chain-pulse',
    type: 'chain-pulse',
    title: 'Chain Pulse',
    icon: '✨',
    defaultSize: { width: 920, height: 920 },
    minSize: { width: 580, height: 580 },
    component: ChainPulse,
  },
  {
    id: 'tx-graph',
    type: 'tx-graph',
    title: 'TX Graph',
    icon: '🕸',
    defaultSize: { width: 1060, height: 800 },
    minSize: { width: 740, height: 540 },
    component: TxGraph,
    category: 'tools',
  },
  {
    id: 'mempool',
    type: 'mempool',
    title: 'Mempool',
    icon: '⏳',
    defaultSize: { width: 980, height: 820 },
    minSize: { width: 640, height: 520 },
    component: Mempool,
    category: 'tools',
  },
  // README (desktop file, no category)
  {
    id: 'readme',
    type: 'readme',
    title: 'README.txt',
    icon: '📄',
    defaultSize: { width: 780, height: 780 },
    minSize: { width: 480, height: 420 },
    component: Readme,
  },
  // Folder windows
  {
    id: 'stats-folder',
    type: 'stats-folder',
    title: 'Stats',
    icon: '📊',
    defaultSize: { width: 520, height: 580 },
    minSize: { width: 360, height: 380 },
    component: StatsFolderContents,
  },
  {
    id: 'charts-folder',
    type: 'charts-folder',
    title: 'Charts',
    icon: '📈',
    defaultSize: { width: 460, height: 500 },
    minSize: { width: 320, height: 320 },
    component: ChartsFolderContents,
  },
  {
    id: 'tools-folder',
    type: 'tools-folder',
    title: 'Tools',
    icon: '🔧',
    defaultSize: { width: 520, height: 560 },
    minSize: { width: 360, height: 360 },
    component: ToolsFolderContents,
  },
  {
    id: 'games-folder',
    type: 'games-folder',
    title: 'Games',
    icon: '🎮',
    defaultSize: { width: 400, height: 420 },
    minSize: { width: 280, height: 280 },
    component: GamesFolderContents,
  },
  {
    id: 'privacy-folder',
    type: 'privacy-folder',
    title: 'Privacy',
    icon: '🔒',
    defaultSize: { width: 400, height: 420 },
    minSize: { width: 280, height: 280 },
    component: PrivacyFolderContents,
  },
  {
    id: 'widgets-folder',
    type: 'widgets-folder',
    title: 'Widgets',
    icon: '🧩',
    defaultSize: { width: 440, height: 460 },
    minSize: { width: 300, height: 300 },
    component: WidgetsFolderContents,
  },
  // Widget Apps
  {
    id: 'network-data',
    type: 'network-data',
    title: 'Network Data',
    icon: '📡',
    defaultSize: { width: 680, height: 680 },
    minSize: { width: 520, height: 480 },
    component: NetworkData,
    category: 'widgets',
  },
  {
    id: 'charts-dashboard',
    type: 'charts-dashboard',
    title: 'Charts Dashboard',
    icon: '📊',
    defaultSize: { width: 1080, height: 900 },
    minSize: { width: 760, height: 580 },
    component: ChartsDashboard,
    category: 'widgets',
  },
  {
    id: 'halving-widget',
    type: 'halving-widget',
    title: 'Halving Countdown',
    icon: '⏳',
    defaultSize: { width: 560, height: 700 },
    minSize: { width: 400, height: 480 },
    component: HalvingWidget,
    category: 'widgets',
  },
  {
    id: 'block-ticker',
    type: 'block-ticker',
    title: 'Block Ticker',
    icon: '📺',
    defaultSize: { width: 0, height: 0 },
    minSize: { width: 0, height: 0 },
    component: null as unknown as React.ComponentType,
    category: 'widgets',
  },
];

// Folder definitions
interface FolderDef {
  id: string;
  label: string;
  icon: string;
  category: AppConfig['category'];
}

const FOLDERS: FolderDef[] = [
  { id: 'stats-folder', label: 'Stats', icon: '📊', category: 'stats' },
  { id: 'charts-folder', label: 'Charts', icon: '📈', category: 'charts' },
  { id: 'tools-folder', label: 'Tools', icon: '🔧', category: 'tools' },
  { id: 'games-folder', label: 'Games', icon: '🎮', category: 'games' },
  { id: 'privacy-folder', label: 'Privacy', icon: '🔒', category: 'privacy' },
  { id: 'widgets-folder', label: 'Widgets', icon: '🧩', category: 'widgets' },
];

export function Desktop() {
  const { windows, openWindow } = useWindowStore();
  const { retroIcons } = useSettingsStore();
  const isAdmin = useIsAdmin();
  const { playOpen } = useSound();

  useWatchlistSync();
  useSettingsSync();
  useOsStateSync(APP_REGISTRY);

  // Theme-aware values
  const getTheme = useThemeStore((state) => state.getTheme);
  const theme = getTheme();
  const backgroundType = useThemeStore((state) => state.backgroundType);
  const backgroundColor = useThemeStore((state) => state.backgroundColor);
  const backgroundBuiltin = useThemeStore((state) => state.backgroundBuiltin);
  const backgroundCustom = useThemeStore((state) => state.backgroundCustom);
  const backgroundUrl = useThemeStore((state) => state.backgroundUrl);

  const taskbarHeight = theme?.taskbar?.height || 54;
  const taskbarPosition = theme?.taskbar?.position || 'top';

  // Calculate initial positions for folders
  const initialFolderPositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const padding = 20;

    FOLDERS.forEach((folder, index) => {
      positions[folder.id] = {
        x: padding,
        y: padding + index * GRID_SIZE,
      };
    });

    // README icon position (after folders)
    positions['readme'] = {
      x: padding,
      y: padding + FOLDERS.length * GRID_SIZE,
    };
    positions['darkforest-manual'] = {
      x: padding,
      y: padding + (FOLDERS.length + 1) * GRID_SIZE,
    };

    // Second column: Terminal, Dark Forest, Explorer — to the right of the first column
    const col2x = padding + GRID_SIZE;
    positions['terminal-shortcut'] = { x: col2x, y: padding };
    positions['bbs-rpg-shortcut2'] = { x: col2x, y: padding + GRID_SIZE };
    positions['explorer-shortcut']  = { x: col2x, y: padding + 2 * GRID_SIZE };
    positions['tournament-admin-shortcut'] = { x: col2x, y: padding + 3 * GRID_SIZE };

    return positions;
  }, []);

  const [folderPositions, setFolderPositions] = useState<Record<string, { x: number; y: number }>>(initialFolderPositions);

  const handleFolderPositionChange = (folderId: string, newPos: { x: number; y: number }) => {
    setFolderPositions(prev => ({
      ...prev,
      [folderId]: newPos,
    }));
  };

  const handleOpenApp = (app: AppConfig) => {
    playOpen();
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const position = calculateWindowPosition(
      windows,
      app.defaultSize,
      screenWidth,
      screenHeight
    );

    openWindow({
      id: app.id,
      type: app.type,
      title: app.title,
      position,
      size: app.defaultSize,
      minSize: app.minSize,
    });
  };

  // Open a folder window
  const handleOpenFolder = (folder: FolderDef) => {
    const folderConfig = APP_REGISTRY.find(app => app.id === folder.id);
    if (!folderConfig) return;

    playOpen();
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const position = calculateWindowPosition(windows, folderConfig.defaultSize, screenWidth, screenHeight);

    openWindow({
      id: folderConfig.id,
      type: folderConfig.type,
      title: folderConfig.title,
      position,
      size: folderConfig.defaultSize,
      minSize: folderConfig.minSize,
    });
  };

  // Handle README open
  const handleOpenReadme = () => {
    playOpen();
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const defaultSize = { width: 780, height: 780 };

    const position = calculateWindowPosition(windows, defaultSize, screenWidth, screenHeight);

    openWindow({
      id: 'readme',
      type: 'readme',
      title: 'README.txt',
      position,
      size: defaultSize,
      minSize: { width: 480, height: 420 },
    });
  };

  // Calculate background style based on settings
  const getBackgroundStyle = (): React.CSSProperties => {
    switch (backgroundType) {
      case 'color':
        return { backgroundColor: backgroundColor || 'var(--bg-desktop)' };
      case 'builtin':
        return {
          backgroundImage: `url(/backgrounds/${backgroundBuiltin}.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'custom':
        if (backgroundCustom) {
          return {
            backgroundImage: `url(${backgroundCustom})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          };
        }
        return { backgroundColor: 'var(--bg-desktop)' };
      case 'url':
        if (backgroundUrl) {
          return {
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          };
        }
        return { backgroundColor: 'var(--bg-desktop)' };
      default:
        return { backgroundColor: 'var(--bg-desktop)' };
    }
  };

  // Position style based on taskbar position
  const positionStyle: React.CSSProperties = taskbarPosition === 'bottom'
    ? { top: 0, bottom: `${taskbarHeight}px` }
    : { top: `${taskbarHeight}px`, bottom: 0 };

  return (
    <div
      className="absolute left-0 right-0 overflow-hidden"
      style={{
        ...positionStyle,
        ...getBackgroundStyle(),
      }}
    >
      {/* Desktop Folders Container - z-index 1 */}
      <div className="absolute inset-0 z-[1]">
        {FOLDERS.map((folder) => (
          <DesktopFolder
            key={folder.id}
            label={folder.label}
            icon={getIcon(folder.icon, retroIcons)}
            onOpen={() => handleOpenFolder(folder)}
            position={folderPositions[folder.id] || initialFolderPositions[folder.id]}
            onPositionChange={(pos) => handleFolderPositionChange(folder.id, pos)}
          />
        ))}
        {/* README Icon */}
        <DesktopIcon
          label="README"
          icon={getIcon('📄', retroIcons)}
          onOpen={handleOpenReadme}
          position={folderPositions['readme'] || initialFolderPositions['readme']}
          onPositionChange={(pos) => handleFolderPositionChange('readme', pos)}
        />
        {/* Second column shortcuts */}
        <DesktopIcon
          label="Terminal"
          icon={getIcon('💻', retroIcons)}
          onOpen={() => handleOpenApp(APP_REGISTRY.find(a => a.id === 'terminal')!)}
          position={folderPositions['terminal-shortcut'] || initialFolderPositions['terminal-shortcut']}
          onPositionChange={(pos) => handleFolderPositionChange('terminal-shortcut', pos)}
        />
        <DesktopIcon
          label="Explorer"
          icon={getIcon('🔍', retroIcons)}
          onOpen={() => handleOpenApp(APP_REGISTRY.find(a => a.id === 'explorer')!)}
          position={folderPositions['explorer-shortcut'] || initialFolderPositions['explorer-shortcut']}
          onPositionChange={(pos) => handleFolderPositionChange('explorer-shortcut', pos)}
        />
        {/* Sysop-only shortcut — configure & fire tournaments */}
      </div>

      {/* Windows Layer - z-index 10+ for windows */}
      {windows.map((win) => {
        const appConfig = APP_REGISTRY.find(a => a.type === win.type);
        if (!appConfig || !appConfig.component) return null;

        const AppComponent = appConfig.component as React.ComponentType<{ windowId?: string }>;

        return (
          <Window key={win.id} id={win.id}>
            <WindowErrorBoundary title={appConfig.title}>
              <AppComponent windowId={win.id} />
            </WindowErrorBoundary>
          </Window>
        );
      })}

      {/* Block arrival ticker — always-on floating strip at the bottom */}
      <BlockTicker />

      {/* Guest sign-in prompt — shown when guest tries a persistent feature */}
      <GuestPrompt />
    </div>
  );
}
