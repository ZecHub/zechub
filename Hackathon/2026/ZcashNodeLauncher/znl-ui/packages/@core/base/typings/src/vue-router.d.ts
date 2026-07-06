import type { Component } from 'vue';
import type { Router, RouteRecordRaw } from 'vue-router';

interface RouteMeta {
  /**
   * Activate Icons (menu/tab)
   */
  activeIcon?: string;
  /**
   * The currently active menu sometimes does not want to activate the existing menu and needs to be used to activate the parent menu
   */
  activePath?: string;
  /**
   * Whether or not to fix tab * @default page
   */
  affixTab?: boolean;
  /**
   * Fixed tab order * @default0
   */
  affixTabOrder?: number;
  /**
   * You need a specific character to access *@default[]
   */
  authority?: string[];
  /**
   * Logo
   */
  badge?: string;
  /**
   * Logo Type
   */
  badgeType?: 'dot' | 'normal';
  /**
   * Logo Colours
   */
  badgeVariants?:
    | 'default'
    | 'destructive'
    | 'primary'
    | 'success'
    | 'warning'
    | string;
  /**
   * Full path of route as key (default True)
   */
  fullPathKey?: boolean;
  /**
   * The sublevel of the current route is not displayed in the menu
   */
  hideChildrenInMenu?: boolean;
  /**
   * The current route is not displayed in bread crumbs
   */
  hideInBreadcrumb?: boolean;
  /**
   * Current route is not displayed in menu
   */
  hideInMenu?: boolean;
  /**
   * Current route is not displayed on tab
   */
  hideInTab?: boolean;
  /**
   * Icon (menu/tab)
   */
  icon?: Component | string;
  /**
   * Iframe Address
   */
  iframeSrc?: string;
  /**
   * Ignore permissions to directly access *
   */
  ignoreAccess?: boolean;
  /**
   * Turn on the Keep Alive cache.
   */
  keepAlive?: boolean;
  /**
   * Outlink - Jump Path
   */
  link?: string;
  /**
   * Has the route been loaded?
   */
  loaded?: boolean;
  /**
   * Maximum number of tab openings* @default-1
   */
  maxNumOfOpenTab?: number;
  /**
   * The menu can see it, but access can be redirected to 403.
   */
  menuVisibleWithForbidden?: boolean;
  /**
   * Do not use base layout (effective only at the top level)
   */
  noBasicLayout?: boolean;
  /**
   * Open in New Window
   */
  openInNewWindow?: boolean;
  /**
   * Sort for route-> menus
   */
  order?: number;
  /**
   * Parameters carried in the menu
   */
  query?: Recordable;
  /**
   * Title Name
   */
  title: string;
}

// Define Recursive Type to change the Component attribute of RootRecordRaw to String
type RouteRecordStringComponent<T = string> = Omit<
  RouteRecordRaw,
  'children' | 'component'
> & {
  children?: RouteRecordStringComponent<T>[];
  component: T;
};

type ComponentRecordType = Record<string, () => Promise<Component>>;

interface GenerateMenuAndRoutesOptions {
  fetchMenuListAsync?: () => Promise<RouteRecordStringComponent[]>;
  forbiddenComponent?: RouteRecordRaw['component'];
  layoutMap?: ComponentRecordType;
  pageMap?: ComponentRecordType;
  roles?: string[];
  router: Router;
  routes: RouteRecordRaw[];
}

export type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
  RouteMeta,
  RouteRecordRaw,
  RouteRecordStringComponent,
};