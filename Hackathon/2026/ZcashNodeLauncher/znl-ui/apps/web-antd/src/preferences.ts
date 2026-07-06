import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description Project Profile * only needs to overwrite some of the configurations in the project, not the required configurations, and will automatically use the default configuration *!!!! Please empty the cache after changing the configuration, otherwise it may not be effective
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    /** Backend route mode */
    accessMode: 'backend',
    name: import.meta.env.VITE_APP_TITLE,
    enableRefreshToken: true,
  },
  footer: {
    /** Turns the footer off by default because there is a certain shield. */
    enable: false,
    fixed: false,
  },
  copyright: {
    companyName: import.meta.env.VITE_APP_TITLE,
    companySiteLink: 'https://github.com/zcashjava/ZcashNodeLauncher',
  },
});