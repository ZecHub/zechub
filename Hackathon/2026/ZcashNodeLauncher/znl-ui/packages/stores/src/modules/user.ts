import { acceptHMRUpdate, defineStore } from 'pinia';

interface BasicUserInfo {
  [key: string]: any;
  /**
   * The head.
   */
  avatar: string;
  /**
   * Email
   */
  email?: string;
  /**
   * Nickname
   */
  nickname: string;
  /**
   * User id
   */
  userId: string;
  /**
   * Username
   */
  username: string;
}

interface AccessState {
  /**
   * User Information
   */
  userInfo: BasicUserInfo | null;
  /**
   * User Role
   */
  userRoles: string[];
}

/**
 * @zh_CN User Information Relevant
 */
export const useUserStore = defineStore('core-user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo | null) {
      this.userInfo = userInfo;
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles;
    },
  },
  state: (): AccessState => ({
    userInfo: null,
    userRoles: [],
  }),
});

// Addressing the heat update problem
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
