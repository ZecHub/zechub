import type { Router, RouteRecordRaw } from 'vue-router';

import type {
  AppRouteRecordRaw,
  ExRouteRecordRaw,
  MenuRecordRaw,
  RouteMeta,
  RouteRecordStringComponent,
} from '@vben-core/typings';

import { filterTree, isHttpUrl, mapTree } from '@vben-core/shared/utils';

/**
 * Generating menus based on rootes * @param rootes - route configuration list * @param rooter - Vue Router instance * @returns menu list
 */
function generateMenus(
  routes: RouteRecordRaw[],
  router: Router,
): MenuRecordRaw[] {
  // Convert route list to an object map with name key
  const finalRoutesMap: { [key: string]: string } = Object.fromEntries(
    router.getRoutes().map(({ name, path }) => [name, path]),
  );

  let menus = mapTree<ExRouteRecordRaw, MenuRecordRaw>(routes, (route) => {
    // Retrieve the final route
    const path = finalRoutesMap[route.name as string] ?? route.path ?? '';

    const {
      meta = {} as RouteMeta,
      name: routeName,
      redirect,
      children = [],
    } = route;
    const {
      activeIcon,
      badge,
      badgeType,
      badgeVariants,
      hideChildrenInMenu = false,
      icon,
      link,
      order,
      title = '',
    } = meta;

    // Ensure that menu names are not empty
    const name = (title || routeName || '') as string;

    // Handle Submenu
    const resultChildren = hideChildrenInMenu
      ? []
      : ((children as MenuRecordRaw[]) ?? []);

    // Set the paternity of the submenu
    if (resultChildren.length > 0) {
      resultChildren.forEach((child) => {
        child.parents = [...(route.parents ?? []), path];
        child.parent = path;
      });
    }

    // Determine Final Path
    const resultPath = hideChildrenInMenu ? redirect || path : link || path;

    return {
      activeIcon,
      badge,
      badgeType,
      badgeVariants,
      icon,
      name,
      order,
      parent: route.parent,
      parents: route.parents,
      path: resultPath,
      show: !meta.hideInMenu,
      children: resultChildren,
    };
  });

  // Sort menus to avoid replacing them with 999 at 0 = 0
  menus = menus.sort((a, b) => (a?.order ?? 999) - (b?.order ?? 999));

  // Filter hidden menu entries
  return filterTree(menus, (menu) => !!menu.show);
}

/**
 * Convert backend menu data to route data * @param menuList backend menu data * @param parent parent menu * @param nameSet to track used names to prevent repetition * @returns route data
 */
function convertServerMenuToRouteRecordStringComponent(
  menuList: AppRouteRecordRaw[],
  parent = '',
  nameSet: Set<string> = new Set(),
): RouteRecordStringComponent[] {
  const menus: RouteRecordStringComponent[] = [];
  menuList.forEach((menu) => {
    // Process the top-level link menu
    if (isHttpUrl(menu.path) && menu.parentId === 0) {
      const urlMenu: RouteRecordStringComponent = {
        component: 'IFrameView',
        meta: {
          hideInMenu: !menu.visible,
          icon: menu.icon,
          link: menu.path,
          orderNo: menu.sort,
          title: menu.name,
        },
        name: menu.name,
        path: `/${menu.path}/index`,
      };
      menus.push(urlMenu);
      return;
    } else if (menu.children && menu.parentId === 0) {
      menu.component = 'BasicLayout';
    } else if (!menu.children) {
      menu.component = menu.component as string;
    }
    if (menu.component === 'Layout') {
      menu.component = 'BasicLayout';
    }

    if (menu.children && menu.parentId !== 0) {
      menu.component = '';
    }

    // path
    if (parent) {
      menu.path = `${parent}/${menu.path}`;
    }

    if (!menu.path.startsWith('/')) {
      menu.path = `/${menu.path}`;
    }

    let finalName = menu.componentName || menu.name;
    if (nameSet.has(finalName)) {
      finalName = menu.name + menu.id;
      console.error(`menu name duplicate: ${menu.name}, id: ${menu.id}`, menu);
    }
    nameSet.add(finalName);

    const buildMenu: RouteRecordStringComponent = {
      component: menu.component,
      meta: {
        hideInMenu: !menu.visible,
        icon: menu.icon,
        keepAlive: menu.keepAlive,
        orderNo: menu.sort,
        title: menu.name,
      },
      name: finalName,
      path: menu.path,
    };

    if (menu.children && menu.children.length > 0) {
      buildMenu.children = convertServerMenuToRouteRecordStringComponent(
        menu.children,
        menu.path,
        nameSet,
      );
    }

    menus.push(buildMenu);
  });
  return menus;
}

export { convertServerMenuToRouteRecordStringComponent, generateMenus };