import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { resetStaticRoutes } from '@vben/utils';

import { createRouterGuard } from './guard';
import { routes } from './routes';
import { setupBaiduTongJi } from './tongji';

/**
 *  @zh_CN Create vue-rooter instance
 */
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  // Should be added to the initial route list.
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 };
  },
  // Whether the tail slash should be banned.
  // strict: true,
});

const resetRoutes = () => resetStaticRoutes(router, routes);

// Create route guards
createRouterGuard(router);
// Set 100-degree statistics
setupBaiduTongJi(router);

export { resetRoutes, router };