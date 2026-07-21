'use client';

import { useThemeStore } from '@/store/themeStore';
import { allThemes } from '@/themes';
import { useSound } from '@/hooks/useSound';

export function Themes() {
  const { currentTheme, setTheme } = useThemeStore();
  const { playClick, playOpen } = useSound();

  const handleThemeSelect = (themeId: string) => {
    playOpen();
    setTheme(themeId);
  };

  return (
    <div className="flex flex-col h-full p-2 overflow-y-auto">
      <h2
        className="text-[var(--accent-gold)] mb-4"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-title)' }}
      >
        Theme Gallery
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {allThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeSelect(theme.id)}
            className={`
              window-border p-3 text-left transition-all
              ${currentTheme === theme.id ? 'ring-2 ring-[var(--accent-gold)]' : ''}
            `}
          >
            {/* Theme Preview */}
            <div
              className="w-full h-24 mb-3 relative overflow-hidden"
              style={{
                backgroundColor: theme.colors.bgDesktop,
                borderRadius: theme.borderRadius.small,
              }}
            >
              {/* Mini taskbar preview */}
              <div
                className="absolute left-0 right-0 flex items-center px-2"
                style={{
                  height: '16px',
                  backgroundColor: theme.colors.bgTitlebar,
                  top: theme.taskbar.position === 'top' ? 0 : undefined,
                  bottom: theme.taskbar.position === 'bottom' ? 0 : undefined,
                }}
              >
                <span
                  className="text-xs truncate"
                  style={{ color: theme.colors.accentGold, fontSize: '8px' }}
                >
                  {theme.taskbar.logoText}
                </span>
              </div>

              {/* Mini window preview */}
              <div
                className="absolute"
                style={{
                  left: '20%',
                  top: theme.taskbar.position === 'top' ? '24px' : '8px',
                  width: '60%',
                  height: '50px',
                  backgroundColor: theme.colors.bgWindow,
                  border: theme.borderStyle === 'beveled'
                    ? `2px outset ${theme.colors.borderLight}`
                    : theme.borderStyle === 'flat'
                    ? `1px solid ${theme.colors.borderDark}`
                    : `2px solid ${theme.colors.borderWindow}`,
                  borderRadius: theme.borderRadius.small,
                }}
              >
                <div
                  style={{
                    height: '12px',
                    background: theme.borderStyle === 'beveled'
                      ? `linear-gradient(90deg, #000080, #1084d0)`
                      : theme.borderStyle === 'flat'
                      ? `linear-gradient(180deg, #e8e8e8 0%, #cccccc 100%)`
                      : theme.colors.bgTitlebar,
                    borderRadius: theme.borderStyle === 'flat'
                      ? `${theme.borderRadius.small} ${theme.borderRadius.small} 0 0`
                      : undefined,
                  }}
                />
                {/* Dark content area with bright green text - all themes */}
                <div
                  className="p-1 text-xs"
                  style={{
                    backgroundColor: '#1a1a2e',
                    color: '#00ff88',
                    fontSize: '6px',
                    fontFamily: theme.fonts.mono,
                    height: 'calc(100% - 12px)',
                    borderRadius: theme.borderStyle === 'flat'
                      ? `0 0 ${theme.borderRadius.small} ${theme.borderRadius.small}`
                      : undefined,
                  }}
                >
                  Window content
                </div>
              </div>
            </div>

            {/* Theme Info */}
            <div>
              <h3
                className="mb-1"
                style={{
                  color: currentTheme === theme.id ? theme.colors.accentGold : theme.colors.textPrimary,
                  fontFamily: theme.fonts.display,
                  fontSize: 'var(--font-size-title)',
                }}
              >
                {theme.name}
              </h3>
              <p
                className="mb-1"
                style={{
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.primary,
                  fontSize: 'var(--font-size-button)',
                }}
              >
                {theme.era}
              </p>
              <p
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.primary,
                  fontSize: 'var(--font-size-icon)',
                }}
              >
                {theme.description}
              </p>
            </div>

            {/* Current indicator */}
            {currentTheme === theme.id && (
              <div
                className="mt-2 text-center"
                style={{
                  color: theme.colors.accentGreen,
                  fontFamily: theme.fonts.display,
                  fontSize: 'var(--font-size-icon)',
                }}
              >
                ✓ Active
              </div>
            )}
          </button>
        ))}
      </div>

    </div>
  );
}

export default Themes;
