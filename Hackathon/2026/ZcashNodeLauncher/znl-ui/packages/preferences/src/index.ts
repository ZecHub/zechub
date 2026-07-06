import type { Preferences } from '@vben-core/preferences';
import type { DeepPartial } from '@vben-core/typings';

/**
 * If you want all apps to use the same default preferences, you can define * here instead of changing the default preferences in @vben-core/preferences* @param preferences @returns
 */

function defineOverridesPreferences(preferences: DeepPartial<Preferences>) {
  return preferences;
}

export { defineOverridesPreferences };

export * from '@vben-core/preferences';