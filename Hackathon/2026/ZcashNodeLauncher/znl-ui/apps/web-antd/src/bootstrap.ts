import { createApp, watchEffect } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import { registerAccessDirective } from '@vben/access';
import { registerLoadingDirective } from '@vben/common-ui/es/loading';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/antd';

import { useTitle } from '@vueuse/core';

import { $t, setupI18n } from '#/locales';
import { setupFormCreate } from '#/plugins/form-create';

import { initComponentAdapter } from './adapter/component';
import { initSetupVbenForm } from './adapter/form';
import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  // Initialization component adapter
  await initComponentAdapter();

  // Initialize Form Component
  await initSetupVbenForm();

  // / / Set the default configuration of the window
  // setDefaultModalProps({
  //   fullscreenButton: false,
  // });
  // / / Set the default configuration for drawers
  // setDefaultDrawerProps({
  //   zIndex: 1020,
  // });

  const app = createApp(App);
  app.use(VueDOMPurifyHTML);

  // Registering v-loading instructions
  registerLoadingDirective(app, {
    loading: 'loading', // Here you can customize the name of the command, or you can explicitly provide the message that the command is not registered.
    spinning: 'spinning',
  });

  // Internationalize i18n configuration
  await setupI18n(app);

  // Configure pinia-store
  await initStores(app, { namespace });

  // Install permissions command
  registerAccessDirective(app);

  // Initialize tippy
  const { initTippy } = await import('@vben/common-ui/es/tippy');
  initTippy(app);

  // Configure route and route guards
  app.use(router);

  // formCreate
  setupFormCreate(app);

  // Configure Motion Plugins
  const { MotionPlugin } = await import('@vben/plugins/motion');
  app.use(MotionPlugin);

  // Dynamic Update Title
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };