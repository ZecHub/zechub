import type { Component, Ref } from 'vue';

import type { MenuRecordBadgeRaw, ThemeModeType } from '@vben-core/typings';

interface MenuProps {
  /**
   * @zh_CN Whether to turn on accordion mode @default true
   */
  accordion?: boolean;
  /**
   * @zh_CN Menu Collapse @default false
   */
  collapse?: boolean;

  /**
   * Whether menu names should be displayed when the menu is folded
   */
  collapseShowTitle?: boolean;

  /**
   * @zh_CN Default Active Menu
   */
  defaultActive?: string;

  /**
   * Menu for the default expansion of @zh_CN
   */
  defaultOpeneds?: string[];

  /**
   * @zh_CN menu mode @default vertical
   */
  mode?: 'horizontal' | 'vertical';

  /**
   * @zh_CN Whether it's round style @default true
   */
  rounded?: boolean;

  /**
   * @zh_CN Whether to scroll automatically to active menu entry @default frame
   */
  scrollToActive?: boolean;

  /**
   * @zh_CN menu theme @default dark
   */
  theme?: ThemeModeType;
}

interface SubMenuProps extends MenuRecordBadgeRaw {
  /**
   * @zh_CN Activate Icon
   */
  activeIcon?: string;
  /**
   * @zh_CN Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN Icon
   */
  icon?: Component | string;
  /**
   * @zh_CNsubmenu Name
   */
  path: string;
}

interface MenuItemProps extends MenuRecordBadgeRaw {
  /**
   * @zh_CN Icon
   */
  activeIcon?: string;
  /**
   * @zh_CN Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN Icon
   */
  icon?: Component | string;
  /**
   * @zh_CNmenuitem Name
   */
  path: string;
}

interface MenuItemRegistered {
  active: boolean;
  parentPaths: string[];
  path: string;
}

interface MenuItemClicked {
  parentPaths: string[];
  path: string;
}

interface MenuProvider {
  activePath?: string;
  addMenuItem: (item: MenuItemRegistered) => void;

  addSubMenu: (item: MenuItemRegistered) => void;
  closeMenu: (path: string, parentLinks: string[]) => void;
  handleMenuItemClick: (item: MenuItemClicked) => void;
  handleSubMenuClick: (subMenu: MenuItemRegistered) => void;
  isMenuPopup: boolean;
  items: Record<string, MenuItemRegistered>;

  openedMenus: string[];
  openMenu: (path: string, parentLinks: string[]) => void;
  props: MenuProps;
  removeMenuItem: (item: MenuItemRegistered) => void;

  removeSubMenu: (item: MenuItemRegistered) => void;

  subMenus: Record<string, MenuItemRegistered>;
  theme: string;
}

interface SubMenuProvider {
  addSubMenu: (item: MenuItemRegistered) => void;
  handleMouseleave?: (deepDispatch: boolean) => void;
  level: number;
  mouseInChild: Ref<boolean>;
  removeSubMenu: (item: MenuItemRegistered) => void;
}

export type {
  MenuItemClicked,
  MenuItemProps,
  MenuItemRegistered,
  MenuProps,
  MenuProvider,
  SubMenuProps,
  SubMenuProvider,
};