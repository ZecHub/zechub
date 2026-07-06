import type { RouteRecordRaw } from 'vue-router';

// Define Module Type
interface RouteModuleType {
  default: RouteRecordRaw[];
}

/**
 * Merge the default export of the dynamic path module * @param routemodules dynamic import route import module objects * @returns merged route configuration arrays
 */
function mergeRouteModules(
  routeModules: Record<string, unknown>,
): RouteRecordRaw[] {
  const mergedRoutes: RouteRecordRaw[] = [];

  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.default ?? [];
    mergedRoutes.push(...moduleRoutes);
  }

  return mergedRoutes;
}

export { mergeRouteModules };

export type { RouteModuleType };