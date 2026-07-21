interface BasicOption {
  label: string;
  value: string;
}

type SelectOption = BasicOption;

type TabOption = BasicOption;

interface BasicUserInfo {
  /**
   * The head.
   */
  avatar: string;
  /**
   * Nickname
   */
  nickname: string;
  /**
   * User Role
   */
  roles?: string[];
  /**
   * Userid
   */
  userId: string;
  /**
   * Username
   */
  username: string;
}

type ClassType = Array<object | string> | object | string;

export type { BasicOption, BasicUserInfo, ClassType, SelectOption, TabOption };
