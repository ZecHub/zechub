import type { Router } from 'vue-router';

declare global {
  interface Window {
    _hmt: any[];
  }
}

const HM_ID = import.meta.env.VITE_APP_BAIDU_CODE;

/**
 * Set 100-degree statistics* @param root
 */
function setupBaiduTongJi(router: Router) {
  // Do not set if 100-degree id is not configured
  if (!HM_ID) {
    return;
  }

  // _hmt: for root push
  window._hmt = window._hmt || [];

  router.afterEach((to) => {
    // Add to _hmt
    window._hmt.push(['_trackPageview', to.fullPath]);
  });
}

export { setupBaiduTongJi };