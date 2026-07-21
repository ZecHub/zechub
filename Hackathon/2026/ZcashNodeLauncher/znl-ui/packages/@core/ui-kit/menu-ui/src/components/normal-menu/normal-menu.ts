import type { MenuRecordRaw } from '@vben-core/typings';

interface NormalMenuProps {
  /**
   * Menu Data
   */
  activePath?: string;
  /**
   * Whether or not to fold
   */
  collapse?: boolean;
  /**
   * Menu Item
   */
  menus?: MenuRecordRaw[];
  /**
   * @zh_CN Whether it's round style @default true
   */
  rounded?: boolean;
  /**
   * Theme
   */
  theme?: 'dark' | 'light';
}

export type { NormalMenuProps };