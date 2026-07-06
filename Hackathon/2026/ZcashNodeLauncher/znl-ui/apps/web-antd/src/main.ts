import { initPreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences } from './preferences';

/**
 * Load page after application initialization is completed
 */
async function initApplication() {
  // Name used to specify the unique identity of the project
  // Key prefixes used to distinguish between different items and to store data and other data that need to be isolated
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // App Preferences Initialisation
  await initPreferences({
    namespace,
    overrides: overridesPreferences,
  });

  // Start application and mount
  // vue applies main logic and view
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  // Remove and destroy
  unmountGlobalLoading();
}

initApplication();