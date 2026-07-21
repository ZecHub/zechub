'use client';

import { useEffect, useRef, useState } from 'react';
import { useSettingsStore, DateFormat, TimeFormat, FontSize } from '@/store/settingsStore';
import { useThemeStore, BackgroundType, BuiltinBackground } from '@/store/themeStore';
import { allThemes } from '@/themes';
import { useSound } from '@/hooks/useSound';

export function Settings() {
  const {
    dateFormat,
    timeFormat,
    fontSize,
    soundEnabled,
    volume,
    retroIcons,
    tipsEnabled,
    tipsIntervalMin,
    setDateFormat,
    setTimeFormat,
    setFontSize,
    setSoundEnabled,
    setVolume,
    setRetroIcons,
    setTipsEnabled,
    setTipsIntervalMin,
  } = useSettingsStore();

  const {
    currentTheme,
    backgroundType,
    backgroundColor,
    backgroundBuiltin,
    backgroundUrl,
    setTheme,
    setBackgroundType,
    setBackgroundColor,
    setBackgroundBuiltin,
    setBackgroundCustom,
    setBackgroundUrl,
  } = useThemeStore();

  const { playClick, playBeep } = useSound();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState(backgroundUrl || '');

  // Ensure font size attribute is synced and force style recalc
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  const handleFontSize = (size: FontSize) => {
    playClick();
    setFontSize(size);
  };

  const handleDateFormat = (format: DateFormat) => {
    playClick();
    setDateFormat(format);
  };

  const handleTimeFormat = (format: TimeFormat) => {
    playClick();
    setTimeFormat(format);
  };

  const handleSoundToggle = () => {
    if (soundEnabled) playClick();
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) setTimeout(() => playClick(), 50);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const sampleVolume = () => {
    // Play sample beep at the new volume so user can hear the level
    if (soundEnabled) playBeep();
  };

  const handleRetroToggle = () => {
    playClick();
    setRetroIcons(!retroIcons);
  };

  const handleThemeChange = (themeId: string) => {
    playClick();
    setTheme(themeId);
  };

  const handleBackgroundTypeChange = (type: BackgroundType) => {
    playClick();
    setBackgroundType(type);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handleBuiltinChange = (bg: BuiltinBackground) => {
    playClick();
    setBackgroundBuiltin(bg);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setBackgroundCustom(dataUrl);
        // Store in sessionStorage for persistence within session
        sessionStorage.setItem('zec-os-custom-bg', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    playClick();
    setBackgroundUrl(urlInput);
  };

  return (
    <div className="flex flex-col h-full p-2 overflow-y-auto">
      <h2
        className="text-[var(--accent-gold)] mb-4"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-title)' }}
      >
        System Settings
      </h2>

      {/* Font Size */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Font Size
        </label>
        <div className="flex gap-2">
          {(['small', 'medium', 'large', 'xl'] as FontSize[]).map((size) => (
            <button
              key={size}
              onClick={() => handleFontSize(size)}
              className={`
                btn-window px-3 py-2 capitalize
                ${fontSize === size ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
              `}
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              {size === 'xl' ? 'XL' : size}
            </button>
          ))}
        </div>
      </div>

      {/* Date Format */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Date Format
        </label>
        <div className="flex gap-2">
          {([
            { value: 'mdy', label: 'M/D/Y' },
            { value: 'dmy', label: 'D/M/Y' },
            { value: 'ymd', label: 'Y/M/D' },
          ] as { value: DateFormat; label: string }[]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleDateFormat(opt.value)}
              className={`
                btn-window px-3 py-2
                ${dateFormat === opt.value ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
              `}
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Format */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Time Format
        </label>
        <div className="flex gap-2">
          {([
            { value: '24h', label: '24hr' },
            { value: '12h', label: '12hr AM/PM' },
          ] as { value: TimeFormat; label: string }[]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleTimeFormat(opt.value)}
              className={`
                btn-window px-3 py-2
                ${timeFormat === opt.value ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
              `}
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sound */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Sound Effects
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSoundToggle}
            className={`btn-window px-3 py-2 ${soundEnabled ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            {soundEnabled ? 'ON' : 'OFF'}
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[var(--text-muted)] shrink-0" style={{ fontSize: 'var(--font-size-label)' }}>
              Vol
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              onMouseUp={sampleVolume}
              onTouchEnd={sampleVolume}
              disabled={!soundEnabled}
              className="flex-1"
              style={{
                accentColor: 'var(--accent-gold)',
                opacity: soundEnabled ? 1 : 0.35,
                cursor: soundEnabled ? 'pointer' : 'not-allowed',
                minWidth: 80,
              }}
            />
            <span
              className="text-[var(--text-secondary)] shrink-0 text-right"
              style={{ fontSize: 'var(--font-size-label)', minWidth: '2.2rem' }}
            >
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Retro Icons */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Icon Style
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleRetroToggle}
            className={`
              btn-window px-3 py-2
              ${!retroIcons ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
            `}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Modern
          </button>
          <button
            onClick={handleRetroToggle}
            className={`
              btn-window px-3 py-2
              ${retroIcons ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
            `}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            Retro [##]
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Tips
        </label>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => { playClick(); setTipsEnabled(true); }}
            className={`btn-window px-3 py-2 ${tipsEnabled ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            ON
          </button>
          <button
            onClick={() => { playClick(); setTipsEnabled(false); }}
            className={`btn-window px-3 py-2 ${!tipsEnabled ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}`}
            style={{ fontSize: 'var(--font-size-button)' }}
          >
            OFF
          </button>
        </div>
        <div className="flex items-center gap-3" style={{ opacity: tipsEnabled ? 1 : 0.35 }}>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={tipsIntervalMin}
            onChange={(e) => setTipsIntervalMin(Number(e.target.value))}
            disabled={!tipsEnabled}
            style={{ flex: 1, accentColor: 'var(--accent-gold)', cursor: tipsEnabled ? 'pointer' : 'not-allowed' }}
          />
          <span className="text-[var(--accent-gold)]" style={{ fontSize: 'var(--font-size-button)', minWidth: '92px', textAlign: 'right' }}>
            every {tipsIntervalMin} min
          </span>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Theme
        </label>
        <div className="flex flex-wrap gap-2">
          {allThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`
                btn-window px-3 py-2
                ${currentTheme === theme.id ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
              `}
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Background Type */}
      <div className="mb-4">
        <label className="text-[var(--text-secondary)] block mb-2" style={{ fontSize: 'var(--font-size-label)' }}>
          Background
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {([
            { value: 'color', label: 'Color' },
            { value: 'builtin', label: 'Builtin' },
            { value: 'custom', label: 'Upload' },
            { value: 'url', label: 'URL' },
          ] as { value: BackgroundType; label: string }[]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleBackgroundTypeChange(opt.value)}
              className={`
                btn-window px-3 py-2
                ${backgroundType === opt.value ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'}
              `}
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Background Options based on type */}
        {backgroundType === 'color' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={backgroundColor}
              onChange={handleColorChange}
              className="w-10 h-10 cursor-pointer border-2 border-[var(--border-window)]"
            />
            <span className="text-[var(--text-primary)]" style={{ fontSize: 'var(--font-size-button)' }}>
              {backgroundColor}
            </span>
          </div>
        )}

        {backgroundType === 'builtin' && (
          <div className="flex gap-2">
            {(['bg1', 'bg2', 'bg3'] as BuiltinBackground[]).map((bg) => (
              <button
                key={bg}
                onClick={() => handleBuiltinChange(bg)}
                className={`
                  btn-window p-1
                  ${backgroundBuiltin === bg ? 'ring-2 ring-[var(--accent-gold)]' : ''}
                `}
              >
                <div
                  className="w-16 h-12 bg-cover bg-center"
                  style={{ backgroundImage: `url(/backgrounds/${bg}.jpg)` }}
                />
              </button>
            ))}
          </div>
        )}

        {backgroundType === 'custom' && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-window px-3 py-2 text-[var(--text-primary)]"
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              Choose Image...
            </button>
            <p className="text-[var(--text-muted)] mt-1" style={{ fontSize: 'var(--font-size-icon)' }}>
              Stored in session only
            </p>
          </div>
        )}

        {backgroundType === 'url' && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="
                px-2 py-1
                bg-[var(--bg-window)]
                border-2 border-[var(--border-window)]
                text-[var(--text-primary)]
              "
              style={{ fontSize: 'var(--font-size-button)' }}
            />
            <button
              onClick={handleUrlSubmit}
              className="btn-window px-3 py-2 text-[var(--text-primary)] self-start"
              style={{ fontSize: 'var(--font-size-button)' }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
