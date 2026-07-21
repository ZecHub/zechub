'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { useChainData, useCurrentPrice } from '@/hooks/useZecData';
import { calculateWindowPosition } from '@/utils/windowPlacement';

interface HistoryEntry {
  command: string;
  output: string[];
  isError?: boolean;
}

// Simple virtual filesystem
const FILESYSTEM: Record<string, string[] | string> = {
  '/': ['home', 'etc', 'var', 'usr', 'tmp'],
  '/home': ['zec'],
  '/home/zec': ['documents', 'downloads', '.bashrc', '.zecrc'],
  '/home/zec/documents': ['readme.txt', 'notes.md'],
  '/home/zec/downloads': [],
  '/etc': ['passwd', 'hosts', 'zec.conf'],
  '/var': ['log'],
  '/var/log': ['system.log', 'zec.log'],
  '/usr': ['bin', 'lib'],
  '/usr/bin': [],
  '/usr/lib': [],
  '/tmp': [],
  // File contents
  '/home/zec/documents/readme.txt': 'Welcome to ZEC-OS Terminal!\n\nThis is a basic shell emulator.\nType "help" for available commands.',
  '/home/zec/documents/notes.md': '# Notes\n\n- ZEC is privacy-focused\n- Shielded transactions FTW\n- WAGMI',
  '/home/zec/.bashrc': 'export PATH=/usr/bin:$PATH\nexport PS1="[zec@zec-os]$ "',
  '/home/zec/.zecrc': '# ZEC configuration\nnetwork=mainnet\nnode=localhost:8232',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nzec:x:1000:1000:ZEC User:/home/zec:/bin/bash',
  '/etc/hosts': '127.0.0.1 localhost\n::1 localhost\n192.168.1.182 zec-node',
  '/etc/zec.conf': 'rpcuser=zec\nrpcpassword=******\nrpcport=8232',
  '/var/log/system.log': '[INFO] System started\n[INFO] ZEC-OS v1.0 initialized\n[OK] All systems operational',
  '/var/log/zec.log': '[INFO] zcashd connected\n[INFO] Block height: synced\n[INFO] Shielded pool: active',
};

const OPEN_APPS: Record<string, { id: string; type: string; title: string; defaultSize: { width: number; height: number }; minSize: { width: number; height: number } }> = {
  'price':           { id: 'price-ticker',    type: 'price-ticker',    title: 'ZEC Price',       defaultSize: { width: 300, height: 180 }, minSize: { width: 200, height: 120 } },
  'price-ticker':    { id: 'price-ticker',    type: 'price-ticker',    title: 'ZEC Price',       defaultSize: { width: 300, height: 180 }, minSize: { width: 200, height: 120 } },
  'blockheight':     { id: 'block-height',    type: 'block-height',    title: 'Block Height',    defaultSize: { width: 300, height: 170 }, minSize: { width: 200, height: 120 } },
  'block-height':    { id: 'block-height',    type: 'block-height',    title: 'Block Height',    defaultSize: { width: 300, height: 170 }, minSize: { width: 200, height: 120 } },
  'difficulty':      { id: 'difficulty',      type: 'difficulty',      title: 'Difficulty',      defaultSize: { width: 320, height: 170 }, minSize: { width: 220, height: 120 } },
  'pools':           { id: 'pools',           type: 'pools',           title: 'Pools',           defaultSize: { width: 320, height: 260 }, minSize: { width: 260, height: 200 } },
  'supply':          { id: 'total-supply',    type: 'total-supply',    title: 'Total Supply',    defaultSize: { width: 300, height: 220 }, minSize: { width: 240, height: 180 } },
  'total-supply':    { id: 'total-supply',    type: 'total-supply',    title: 'Total Supply',    defaultSize: { width: 300, height: 220 }, minSize: { width: 240, height: 180 } },
  'shielded':        { id: 'total-shielded',  type: 'total-shielded',  title: 'Total Shielded',  defaultSize: { width: 300, height: 220 }, minSize: { width: 240, height: 180 } },
  'shielded-pool':   { id: 'shielded-pool',   type: 'shielded-pool',   title: 'Shielded Pool',   defaultSize: { width: 340, height: 200 }, minSize: { width: 240, height: 140 } },
  'chart':           { id: 'price-chart',     type: 'price-chart',     title: 'Price Chart',     defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
  'price-chart':     { id: 'price-chart',     type: 'price-chart',     title: 'Price Chart',     defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
  'shielded-chart':  { id: 'shielded-chart',  type: 'shielded-chart',  title: 'Shielded Chart',  defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
  'pools-chart':     { id: 'pools-chart',     type: 'pools-chart',     title: 'Pools Chart',     defaultSize: { width: 560, height: 500 }, minSize: { width: 420, height: 360 } },
  'supply-chart':    { id: 'supply-chart',    type: 'supply-chart',    title: 'Supply Chart',    defaultSize: { width: 520, height: 460 }, minSize: { width: 380, height: 320 } },
  'calculator':      { id: 'calculator',      type: 'calculator',      title: 'Calculator',      defaultSize: { width: 260, height: 360 }, minSize: { width: 180, height: 260 } },
  'settings':        { id: 'settings',        type: 'settings',        title: 'Settings',        defaultSize: { width: 400, height: 500 }, minSize: { width: 300, height: 380 } },
  'explorer':        { id: 'explorer',        type: 'explorer',        title: 'Explorer',        defaultSize: { width: 560, height: 520 }, minSize: { width: 480, height: 400 } },
  'shmup':           { id: 'shmup',           type: 'shmup',           title: 'Shmup',           defaultSize: { width: 440, height: 600 }, minSize: { width: 420, height: 560 } },
  'pong':            { id: 'pong',            type: 'pong',            title: 'Pong',            defaultSize: { width: 440, height: 400 }, minSize: { width: 420, height: 360 } },
  'bbs':             { id: 'bbs-rpg',         type: 'bbs-rpg',         title: 'The Dark Forest BBS', defaultSize: { width: 480, height: 580 }, minSize: { width: 420, height: 480 } },
  'bbs-rpg':         { id: 'bbs-rpg',         type: 'bbs-rpg',         title: 'The Dark Forest BBS', defaultSize: { width: 480, height: 580 }, minSize: { width: 420, height: 480 } },
  'compare':          { id: 'block-comparison', type: 'block-comparison', title: 'Block Comparison', defaultSize: { width: 900, height: 780 }, minSize: { width: 620, height: 520 } },
  'block-comparison': { id: 'block-comparison', type: 'block-comparison', title: 'Block Comparison', defaultSize: { width: 900, height: 780 }, minSize: { width: 620, height: 520 } },
};

const COMMANDS = {
  help: () => [
    'Available commands:',
    '  help           - Show this help message',
    '  ls             - List directory contents',
    '  cd             - Change directory',
    '  pwd            - Print working directory',
    '  cat            - Display file contents',
    '  echo           - Echo text',
    '  clear          - Clear terminal',
    '  whoami         - Display current user',
    '  date           - Display current date/time',
    '  uname          - System information',
    '  neofetch       - System info (fancy)',
    '  zec            - ZEC live blockchain info',
    '  open <app>     - Open an app',
    '  exit           - Close terminal',
    '',
    'Apps: price, blockheight, difficulty, pools, shielded,',
    '       supply, chart, pools-chart, supply-chart,',
    '       calculator, settings, explorer, shmup, pong',
  ],
  whoami: () => ['zec'],
  date: () => [new Date().toString()],
  uname: (args: string[]) => {
    if (args.includes('-a')) {
      return ['ZEC-OS 1.0.0 zec-os x86_64 GNU/Linux'];
    }
    return ['ZEC-OS'];
  },
  neofetch: () => [
    '        ⠀⠀⠀⠀⠀⣀⣤⣤⣄⡀⠀⠀⠀⠀⠀        zec@zec-os',
    '      ⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀        -----------',
    '      ⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀        OS: ZEC-OS 1.0',
    '      ⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀        Kernel: NextJS',
    '      ⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀        Shell: zsh',
    '      ⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀        Terminal: ZEC-Term',
    '      ⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀        CPU: Zcash Node',
    '      ⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀        Memory: Shielded',
    '      ⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀',
  ],
};

export function Terminal({ windowId }: { windowId?: string }) {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const { data: chainData, loading: chainLoading } = useChainData();
  const { price, loading: priceLoading } = useCurrentPrice();

  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: ['ZEC-OS Terminal v1.0', 'Type "help" for available commands.', ''] },
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/zec');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const resolvePath = (path: string): string => {
    if (path.startsWith('/')) return path;
    if (path === '..') {
      const parts = cwd.split('/').filter(Boolean);
      parts.pop();
      return '/' + parts.join('/') || '/';
    }
    if (path === '.') return cwd;
    return cwd === '/' ? `/${path}` : `${cwd}/${path}`;
  };

  const executeCommand = useCallback((cmd: string): { output: string[]; isError?: boolean; shouldExit?: boolean } => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    if (!command) return { output: [] };

    switch (command) {
      case 'help':
        return { output: COMMANDS.help() };

      case 'clear':
        setHistory([]);
        return { output: [] };

      case 'pwd':
        return { output: [cwd] };

      case 'whoami':
        return { output: COMMANDS.whoami() };

      case 'date':
        return { output: COMMANDS.date() };

      case 'uname':
        return { output: COMMANDS.uname(args) };

      case 'neofetch':
        return { output: COMMANDS.neofetch() };

      case 'echo':
        return { output: [args.join(' ')] };

      case 'exit':
        return { output: ['Goodbye!'], shouldExit: true };

      case 'ls': {
        const targetPath = args[0] ? resolvePath(args[0]) : cwd;
        const contents = FILESYSTEM[targetPath];
        if (Array.isArray(contents)) {
          return { output: contents.length > 0 ? contents : ['(empty directory)'] };
        }
        if (typeof contents === 'string') {
          return { output: [`ls: ${targetPath}: Not a directory`], isError: true };
        }
        return { output: [`ls: ${targetPath}: No such file or directory`], isError: true };
      }

      case 'cd': {
        if (!args[0] || args[0] === '~') {
          setCwd('/home/zec');
          return { output: [] };
        }
        const targetPath = resolvePath(args[0]);
        if (Array.isArray(FILESYSTEM[targetPath])) {
          setCwd(targetPath);
          return { output: [] };
        }
        return { output: [`cd: ${args[0]}: No such directory`], isError: true };
      }

      case 'cat': {
        if (!args[0]) {
          return { output: ['cat: missing operand'], isError: true };
        }
        const targetPath = resolvePath(args[0]);
        const content = FILESYSTEM[targetPath];
        if (typeof content === 'string') {
          return { output: content.split('\n') };
        }
        if (Array.isArray(content)) {
          return { output: [`cat: ${args[0]}: Is a directory`], isError: true };
        }
        return { output: [`cat: ${args[0]}: No such file`], isError: true };
      }

      case 'zec': {
        if (chainLoading || priceLoading) {
          return { output: ['Loading blockchain data...'] };
        }
        const h = chainData?.height ?? '—';
        const diff = chainData?.difficulty != null ? chainData.difficulty.toFixed(2) : '—';
        const transparent = chainData?.pools?.transparent != null ? chainData.pools.transparent.toFixed(2) + ' ZEC' : '—';
        const sapling = chainData?.pools?.sapling != null ? chainData.pools.sapling.toFixed(2) + ' ZEC' : '—';
        const orchard = chainData?.pools?.orchard != null ? chainData.pools.orchard.toFixed(2) + ' ZEC' : '—';
        const priceStr = price != null ? '$' + price.toFixed(2) : '—';
        return {
          output: [
            '┌─────────────────────────────────────┐',
            '│         ZEC Blockchain Info         │',
            '├─────────────────────────────────────┤',
            `│  Block Height:  ${String(h).padEnd(19)}│`,
            `│  Difficulty:    ${String(diff).padEnd(19)}│`,
            `│  Price (USD):   ${String(priceStr).padEnd(19)}│`,
            '├─────────────────────────────────────┤',
            `│  Transparent:   ${String(transparent).padEnd(19)}│`,
            `│  Sapling:       ${String(sapling).padEnd(19)}│`,
            `│  Orchard:       ${String(orchard).padEnd(19)}│`,
            '└─────────────────────────────────────┘',
          ],
        };
      }

      case 'open': {
        if (!args[0]) {
          return { output: ['Usage: open <app>  (try: price, blockheight, pools, chart, explorer, compare, shmup, pong...)'], isError: true };
        }
        const appKey = args[0].toLowerCase();
        const appConfig = OPEN_APPS[appKey];
        if (!appConfig) {
          return { output: [`open: unknown app "${args[0]}". Type "help" for a list.`], isError: true };
        }
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        const position = calculateWindowPosition(windows, appConfig.defaultSize, screenWidth, screenHeight);
        openWindow({ id: appConfig.id, type: appConfig.type, title: appConfig.title, position, size: appConfig.defaultSize, minSize: appConfig.minSize });
        return { output: [`Opening ${appConfig.title}...`] };
      }

      case 'mkdir':
      case 'touch':
      case 'rm':
      case 'mv':
      case 'cp':
        return { output: [`${command}: Operation not permitted (read-only filesystem)`], isError: true };

      case 'sudo':
        return { output: ['Nice try! No root access in ZEC-OS 😎'], isError: true };

      case 'vim':
      case 'nano':
      case 'emacs':
        return { output: [`${command}: Editor not installed. This is a minimal shell.`], isError: true };

      default:
        return { output: [`${command}: command not found`], isError: true };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainData, chainLoading, price, priceLoading, cwd, openWindow, windows, windowId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cmd = input.trim();
    if (cmd) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    const result = executeCommand(cmd);

    setHistory(prev => [...prev, { command: cmd, output: result.output, isError: result.isError }]);

    if (result.shouldExit && windowId) {
      closeWindow(windowId);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for paths
      const parts = input.split(/\s+/);
      const lastPart = parts[parts.length - 1];
      if (lastPart) {
        const targetDir = lastPart.includes('/') ? resolvePath(lastPart.substring(0, lastPart.lastIndexOf('/'))) : cwd;
        const prefix = lastPart.includes('/') ? lastPart.substring(lastPart.lastIndexOf('/') + 1) : lastPart;
        const contents = FILESYSTEM[targetDir];
        if (Array.isArray(contents)) {
          const matches = contents.filter(c => c.startsWith(prefix));
          if (matches.length === 1) {
            parts[parts.length - 1] = lastPart.includes('/')
              ? lastPart.substring(0, lastPart.lastIndexOf('/') + 1) + matches[0]
              : matches[0];
            setInput(parts.join(' '));
          }
        }
      }
    }
  };

  const prompt = `[zec@zec-os ${cwd === '/home/zec' ? '~' : cwd}]$ `;

  return (
    <div
      className="flex flex-col h-full bg-[#0a0a1a] font-mono text-sm overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={containerRef} className="flex-1 overflow-y-auto p-2">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.command !== undefined && entry.command !== '' && (
              <div className="text-[var(--text-green)]">
                <span className="text-[var(--text-amber)] mr-2 whitespace-pre">{prompt}</span>
                {entry.command}
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} className={entry.isError ? 'text-[var(--accent-orange)]' : 'text-[var(--text-green)]'}>
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex">
          <span className="text-[var(--text-amber)] mr-2 whitespace-pre">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[var(--text-green)] outline-none border-none"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}

export default Terminal;
