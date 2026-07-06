import type { Component } from 'vue';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';

/** Router Info */
interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  children?: AppRouteRecordRaw[];
  component?: any;
  componentName?: string;
  components?: any;
  fullPath?: string;
  icon?: string;
  id?: any;
  keepAlive?: boolean;
  meta: RouteMeta;
  name: string;
  parentId?: number;
  props?: any;
  sort?: number;
  visible?: boolean;
}

/**
 * Extend route to original objects
 */
type ExRouteRecordRaw = RouteRecordRaw & {
  parent?: string;
  parents?: string[];
  path?: any;
};

interface MenuRecordBadgeRaw {
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
  badgeVariants?: 'destructive' | 'primary' | string;
}

/**
 * Menu Original Object
 */
interface MenuRecordRaw extends MenuRecordBadgeRaw {
  /**
   * Icon name when active
   */
  activeIcon?: string;
  /**
   * Submenu
   */
  children?: MenuRecordRaw[];
  /**
   */
  disabled?: boolean;
  /**
   * Icon Name
   */
  icon?: Component | string;
  /**
   * Menu Name
   */
  name: string;
  /**
   * Sort Number
   */
  order?: number;
  /**
   * Parent Path
   */
  parent?: string;
  /**
   * All Parent Paths
   */
  parents?: string[];
  /**
   * Menu Path, only, to be used as Key
   */
  path: string;
  /**
   * Whether menus should be displayed* @default true
   */
  show?: boolean;
}

export type {
  AppRouteRecordRaw,
  ExRouteRecordRaw,
  MenuRecordBadgeRaw,
  MenuRecordRaw,
};
