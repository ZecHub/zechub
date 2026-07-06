import type { Router, RouteRecordName, RouteRecordRaw } from 'vue-router';

import { traverseTreeValues } from '@vben-core/shared/utils';

/**
 * @zh_CN reset all routes except for the specified white list
 */
export function resetStaticRoutes(router: Router, routes: RouteRecordRaw[]) {
  // Fetch the name of the static path by which all nodes contain sub-nodes and exclude the route for which the name field does not exist
  const staticRouteNames = traverseTreeValues<
    RouteRecordRaw,
    RouteRecordName | undefined
  >(routes, (route) => {
    // These paths need to be specified by name, so that they cannot be deleted without a name when the route is reset
    if (!route.name) {
      console.warn(
        `The route with the path ${route.path} needs to have the field name specified.`,
      );
    }
    return route.name;
  });

  const { getRoutes, hasRoute, removeRoute } = router;
  const allRoutes = getRoutes();
  allRoutes.forEach(({ name }) => {
    // It's in the route list and it's not the white list that needs to be deleted.
    if (name && !staticRouteNames.includes(name) && hasRoute(name)) {
      removeRoute(name);
    }
  });
}