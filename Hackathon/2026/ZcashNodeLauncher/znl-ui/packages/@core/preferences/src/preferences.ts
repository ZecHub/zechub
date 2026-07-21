import type { DeepPartial } from '@vben-core/typings';

import type { InitialOptions, Preferences } from './types';

import { markRaw, reactive, readonly, watch } from 'vue';

import { StorageManager } from '@vben-core/shared/cache';
import { isMacOs, merge } from '@vben-core/shared/utils';

import {
  breakpointsTailwind,
  useBreakpoints,
  useDebounceFn,
} from '@vueuse/core';

import { defaultPreferences } from './config';
import { updateCSSVariables } from './update-css-variables';

const STORAGE_KEY = 'preferences';
const STORAGE_KEY_LOCALE = `${STORAGE_KEY}-locale`;
const STORAGE_KEY_THEME = `${STORAGE_KEY}-theme`;

class PreferenceManager {
  private cache: null | StorageManager = null;
  // private flattenedState: Flatten<Preferences>;
  private initialPreferences: Preferences = defaultPreferences;
  private isInitialized: boolean = false;
  private savePreferences: (preference: Preferences) => void;
  private state: Preferences = reactive<Preferences>({
    ...this.loadPreferences(),
  });
  constructor() {
    this.cache = new StorageManager();

    // Avoid frequent operation caches
    this.savePreferences = useDebounceFn(
      (preference: Preferences) => this._savePreferences(preference),
      150,
    );
  }

  clearCache() {
    [STORAGE_KEY, STORAGE_KEY_LOCALE, STORAGE_KEY_THEME].forEach((key) => {
      this.cache?.removeItem(key);
    });
  }

  public getInitialPreferences() {
    return this.initialPreferences;
  }

  public getPreferences() {
    return readonly(this.state);
  }

  /**
   * Overwrite preferences * overrides preferences to overwrite *namespace namespace
   */
  public async initPreferences({ namespace, overrides }: InitialOptions) {
    // Whether initialized
    if (this.isInitialized) {
      return;
    }
    // Initialize storage manager
    this.cache = new StorageManager({ prefix: namespace });
    // Merge initial preferences
    this.initialPreferences = merge({}, overrides, defaultPreferences);

    // Load and merge the current storage preferences
    const mergedPreference = merge(
      {},
      // overrides,
      this.loadCachedPreferences() || {},
      this.initialPreferences,
    );

    // Update Preferences
    this.updatePreferences(mergedPreference);

    this.setupWatcher();

    this.initPlatform();
    // Mark as Initialised
    this.isInitialized = true;
  }

  /**
   * Reset preferences * Preferences * will be reset to initial values and removed from localStorages. * @example * Hypothetical Preferences are assumed to be {theme: 'light', langage: 'en'} * Current state is {theme: 'dark', language: 'fr'} * this.resetPreferences(); * When called, state will be reset to {women: 'light', langage: 'en'} * and the corresponding entry in localStorage will be removed
   */
  resetPreferences() {
    // Reset Status to Initial Preferences
    Object.assign(this.state, this.initialPreferences);
    // Save reset preferences
    this.savePreferences(this.state);
    // Remove preferred settings from storage
    [STORAGE_KEY, STORAGE_KEY_THEME, STORAGE_KEY_LOCALE].forEach((key) => {
      this.cache?.removeItem(key);
    });
    this.updatePreferences(this.state);
  }

  /**
   * Update Preferences * @param updates - Preferences to update
   */
  public updatePreferences(updates: DeepPartial<Preferences>) {
    const mergedState = merge({}, updates, markRaw(this.state));

    Object.assign(this.state, mergedState);

    // Perform the corresponding action according to the updated key
    this.handleUpdates(updates);
    this.savePreferences(this.state);
  }

  /**
   * Save Preferences * @param{Preferences} preference - Preferences to Save
   */
  private _savePreferences(preference: Preferences) {
    this.cache?.setItem(STORAGE_KEY, preference);
    this.cache?.setItem(STORAGE_KEY_LOCALE, preference.app.locale);
    this.cache?.setItem(STORAGE_KEY_THEME, preference.theme.mode);
  }

  /**
   * Process updated key values * Perform the corresponding actions according to the updated key values. * @param{DeepPartial<Preferences} updates - partial update preferences
   */
  private handleUpdates(updates: DeepPartial<Preferences>) {
    const themeUpdates = updates.theme || {};
    const appUpdates = updates.app || {};
    if (themeUpdates && Object.keys(themeUpdates).length > 0) {
      updateCSSVariables(this.state);
    }

    if (
      Reflect.has(appUpdates, 'colorGrayMode') ||
      Reflect.has(appUpdates, 'colorWeakMode')
    ) {
      this.updateColorMode(this.state);
    }
  }

  private initPlatform() {
    const dom = document.documentElement;
    dom.dataset.platform = isMacOs() ? 'macOs' : 'window';
  }

  /**
   *  Load preferences from the cache. If no corresponding preferences are found in the cache, the default preferences are returned.
   */
  private loadCachedPreferences() {
    return this.cache?.getItem<Preferences>(STORAGE_KEY);
  }

  /**
   * Load preferences settings * @returns{Preferences}
   */
  private loadPreferences(): Preferences {
    return this.loadCachedPreferences() || { ...defaultPreferences };
  }

  /**
   * Changes in listening status and system preferences.
   */
  private setupWatcher() {
    if (this.isInitialized) {
      return;
    }

    // Listen to breakpoints to determine whether or not to move the end
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller('md');
    watch(
      () => isMobile.value,
      (val) => {
        this.updatePreferences({
          app: { isMobile: val },
        });
      },
      { immediate: true },
    );

    // Changes in the thematic preferences of the listening system
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        // Update with the system if the theme pattern in the preferred settings is autu
        if (this.state.theme.mode === 'auto') {
          this.updatePreferences({
            theme: { mode: isDark ? 'dark' : 'light' },
          });
          // Restore to autu mode
          this.updatePreferences({
            theme: { mode: 'auto' },
          });
        }
      });
  }

  /**
   * Update page colour mode (grey, weak colour) * @param preference
   */
  private updateColorMode(preference: Preferences) {
    if (preference.app) {
      const { colorGrayMode, colorWeakMode } = preference.app;
      const dom = document.documentElement;
      const COLOR_WEAK = 'invert-mode';
      const COLOR_GRAY = 'grayscale-mode';
      colorWeakMode
        ? dom.classList.add(COLOR_WEAK)
        : dom.classList.remove(COLOR_WEAK);
      colorGrayMode
        ? dom.classList.add(COLOR_GRAY)
        : dom.classList.remove(COLOR_GRAY);
    }
  }
}

const preferencesManager = new PreferenceManager();
export { PreferenceManager, preferencesManager };