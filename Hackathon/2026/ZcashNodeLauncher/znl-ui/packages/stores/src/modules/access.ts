import type { RouteRecordRaw } from 'vue-router';

import type { MenuRecordRaw } from '@vben-core/typings';

import { acceptHMRUpdate, defineStore } from 'pinia';

type AccessToken = null | string;

interface AccessState {
  /**
   * Permission Code
   */
  accessCodes: string[];
  /**
   * List of accessible menus
   */
  accessMenus: MenuRecordRaw[];
  /**
   * List of accessible routes
   */
  accessRoutes: RouteRecordRaw[];
  /**
   * AccessToken
   */
  accessToken: AccessToken;
  /**

   */
  isAccessChecked: boolean;
  /**
   * Whether or not to lock screen status
   */
  isLockScreen: boolean;
  /**
   * Lock screen password
   */
  lockScreenPassword?: string;
  /**
   * Expiration of login
   */
  loginExpired: boolean;
  /**
   * AccessToken
   */
  refreshToken: AccessToken;
  /**
   * Login Tenant Number
   */
  tenantId: null | number;
  /**
   * Visit Tenant Number
   */
  visitTenantId: null | number;
}

/**
 * @zh_CN access-related
 */
export const useAccessStore = defineStore('core-access', {
  actions: {
    getMenuByPath(path: string) {
      function findMenu(
        menus: MenuRecordRaw[],
        path: string,
      ): MenuRecordRaw | undefined {
        for (const menu of menus) {
          if (menu.path === path) {
            return menu;
          }
          if (menu.children) {
            const matched = findMenu(menu.children, path);
            if (matched) {
              return matched;
            }
          }
        }
      }
      return findMenu(this.accessMenus, path);
    },
    lockScreen(password: string) {
      this.isLockScreen = true;
      this.lockScreenPassword = password;
    },
    setAccessCodes(codes: string[]) {
      this.accessCodes = codes;
    },
    setAccessMenus(menus: MenuRecordRaw[]) {
      this.accessMenus = menus;
    },
    setAccessRoutes(routes: RouteRecordRaw[]) {
      this.accessRoutes = routes;
    },
    setAccessToken(token: AccessToken) {
      this.accessToken = token;
    },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked;
    },
    setLoginExpired(loginExpired: boolean) {
      this.loginExpired = loginExpired;
    },
    setRefreshToken(token: AccessToken) {
      this.refreshToken = token;
    },
    setTenantId(tenantId: null | number) {
      this.tenantId = tenantId;
    },
    setVisitTenantId(visitTenantId: number) {
      this.visitTenantId = visitTenantId;
    },
    unlockScreen() {
      this.isLockScreen = false;
      this.lockScreenPassword = undefined;
    },
  },
  persist: {
    // Persistence
    pick: [
      'accessToken',
      'refreshToken',
      'accessCodes',
      'tenantId',
      'visitTenantId',
      'isLockScreen',
      'lockScreenPassword',
    ],
  },
  state: (): AccessState => ({
    accessCodes: [],
    accessMenus: [],
    accessRoutes: [],
    accessToken: null,
    isAccessChecked: false,
    isLockScreen: false,
    lockScreenPassword: undefined,
    loginExpired: false,
    refreshToken: null,
    tenantId: null,
    visitTenantId: null,
  }),
});

// Addressing the heat update problem
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot));
}
