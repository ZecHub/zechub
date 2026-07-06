import type { Preferences } from './types';

import { preferencesManager } from './preferences';

// Preferences (with hierarchy)
const preferences: Preferences =
  preferencesManager.getPreferences.apply(preferencesManager);

// Update Preferences
const updatePreferences =
  preferencesManager.updatePreferences.bind(preferencesManager);

// Reset Preferences
const resetPreferences =
  preferencesManager.resetPreferences.bind(preferencesManager);

const clearPreferencesCache =
  preferencesManager.clearCache.bind(preferencesManager);

// Initialised Preferences
const initPreferences =
  preferencesManager.initPreferences.bind(preferencesManager);

export {
  clearPreferencesCache,
  initPreferences,
  preferences,
  preferencesManager,
  resetPreferences,
  updatePreferences,
};

export * from './constants';
export type * from './types';
export * from './use-preferences';