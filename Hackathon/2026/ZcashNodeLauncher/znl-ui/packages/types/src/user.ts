import type { AppRouteRecordRaw, BasicUserInfo } from '@vben-core/typings';

/** User Information */
interface UserInfo extends BasicUserInfo {
  /**
   * Home Page Address
   */
  homePath: string;
}


interface AuthPermissionInfo {
  user: UserInfo;
  roles: string[];
  permissions: string[];
  menus: AppRouteRecordRaw[];
}

export type { AuthPermissionInfo, UserInfo };
