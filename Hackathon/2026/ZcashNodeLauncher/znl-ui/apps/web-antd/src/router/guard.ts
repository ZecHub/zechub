import type { Router } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { $t } from '@vben/locales';
import { preferences } from '@vben/preferences';
import { useAccessStore, useDictStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { message } from 'ant-design-vue';

import { getSimpleDictDataList } from '#/api/system/dict/data';
import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * General Guard Configuration * @param rooter
 */
function setupCommonGuard(router: Router) {
  // Record already loaded pages
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // Page Load Progressbar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // Record whether pages are loaded or, if loaded, the effect of the subsequent page switch is not repeated

    loadedPaths.add(to.path);

    // Close Page Load Progressbar
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * Permissions to access guard configuration* @param rooter
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const dictStore = useDictStore();

    // Basic routes. These routes don't need access to intercept.
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
            userStore.userInfo?.homePath ||
            preferences.app.defaultHomePath,
        );
      }
      return true;
    }

    // AccessToken Check
    if (!accessStore.accessToken) {
      // You can have access if you make a clear statement that you ignore access rights.
      if (to.meta.ignoreAccess) {
        return true;
      }

      // Do not have access. Jump to the login page.
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // Delete query directly if not required
          query:
            to.fullPath === preferences.app.defaultHomePath
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // Carry the current jump page, re-hop the page after login
          replace: true,
        };
      }
      return to;
    }

    // Whether a dynamic route has been generated
    if (accessStore.isAccessChecked) {
      return true;
    }

    // Load Dictionary data (no blockloading)
    dictStore.setDictCacheByApi(getSimpleDictDataList);

    // Generate router
    let userInfo = userStore.userInfo;
    if (!userInfo) {
      const loading = message.loading({
        content: `${$t('common.loadingMenu')}...`,
      });
      try {
        const authPermissionInfo = await authStore.fetchUserInfo();
        if (authPermissionInfo) {
          userInfo = authPermissionInfo.user;
        }
      } finally {
        loading();
      }
    }
    const userRoles = userStore.userRoles ?? [];

    // Generate menus and routes
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      // is shown in the menu, but access is redirected to 403
      routes: accessRoutes,
    });

    // Save menu and route information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    userStore.setUserRoles(userRoles);
    const redirectPath = (from.query.redirect ??
      (to.path === preferences.app.defaultHomePath
        ? userInfo?.homePath || preferences.app.defaultHomePath
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * Project Guard Configuration * @param rooter
 */
function createRouterGuard(router: Router) {
  /** Universal */
  setupCommonGuard(router);
  /** Access */
  setupAccessGuard(router);
}

export { createRouterGuard };
