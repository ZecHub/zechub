import type { ComputedRef } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

import { useRoute, useRouter } from 'vue-router';

import { useTabbarStore } from '@vben/stores';

export function useTabs() {
  const router = useRouter();
  const route = useRoute();
  const tabbarStore = useTabbarStore();

  async function closeLeftTabs(tab?: RouteLocationNormalized) {
    await tabbarStore.closeLeftTabs(tab || route);
  }

  async function closeAllTabs() {
    await tabbarStore.closeAllTabs(router);
  }

  async function closeRightTabs(tab?: RouteLocationNormalized) {
    await tabbarStore.closeRightTabs(tab || route);
  }

  async function closeOtherTabs(tab?: RouteLocationNormalized) {
    await tabbarStore.closeOtherTabs(tab || route);
  }

  async function closeCurrentTab(tab?: RouteLocationNormalized) {
    await tabbarStore.closeTab(tab || route, router);
  }

  async function pinTab(tab?: RouteLocationNormalized) {
    await tabbarStore.pinTab(tab || route);
  }

  async function unpinTab(tab?: RouteLocationNormalized) {
    await tabbarStore.unpinTab(tab || route);
  }

  async function toggleTabPin(tab?: RouteLocationNormalized) {
    await tabbarStore.toggleTabPin(tab || route);
  }

  async function refreshTab(name?: string) {
    await tabbarStore.refresh(name || router);
  }

  async function openTabInNewWindow(tab?: RouteLocationNormalized) {
    await tabbarStore.openTabInNewWindow(tab || route);
  }

  async function closeTabByKey(key: string) {
    await tabbarStore.closeTabByKey(key, router);
  }

  /**
   * Sets the title of the current tab* * @description supports the setting of static title strings or dynamic computing titles * @description dynamic headers are recalculated at each rendering and apply to headings related to multiple languages or states * * @paramtitle - title content * - static headers: Sending Strings * - Dynamic Heading: Entering Computer Ref * * @example
   * // Static Title
   * SetTabTitle('Label ')
   *
   * // Dynamic title (multilingual)
   * setTabTitle(computed(() => t('page.title')))
   */
  async function setTabTitle(title: ComputedRef<string> | string) {
    tabbarStore.setUpdateTime();
    await tabbarStore.setTabTitle(route, title);
  }

  async function resetTabTitle() {
    tabbarStore.setUpdateTime();
    await tabbarStore.resetTabTitle(route);
  }

  /**
   * Get operation disabled * @param tab
   */
  function getTabDisableState(tab: RouteLocationNormalized = route) {
    const tabs = tabbarStore.getTabs;
    const affixTabs = tabbarStore.affixTabs;
    const index = tabs.findIndex((item) => item.path === tab.path);

    const disabled = tabs.length <= 1;

    const { meta } = tab;
    const affixTab = meta?.affixTab ?? false;
    const isCurrentTab = route.path === tab.path;

    // The number currently on the leftmost or minus fixed tabs equals 0
    const disabledCloseLeft =
      index === 0 || index - affixTabs.length <= 0 || !isCurrentTab;

    const disabledCloseRight = !isCurrentTab || index === tabs.length - 1;

    const disabledCloseOther =
      disabled || !isCurrentTab || tabs.length - affixTabs.length <= 1;
    return {
      disabledCloseAll: disabled,
      disabledCloseCurrent: !!affixTab || disabled,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledRefresh: !isCurrentTab,
    };
  }

  return {
    closeAllTabs,
    closeCurrentTab,
    closeLeftTabs,
    closeOtherTabs,
    closeRightTabs,
    closeTabByKey,
    getTabDisableState,
    openTabInNewWindow,
    pinTab,
    refreshTab,
    resetTabTitle,
    setTabTitle,
    toggleTabPin,
    unpinTab,
  };
}