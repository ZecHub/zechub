<script lang="ts" setup>
import type { VNode } from 'vue';
import type {
  RouteLocationNormalizedLoaded,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

import { computed } from 'vue';
import { RouterView } from 'vue-router';

import { preferences, usePreferences } from '@vben/preferences';
import { getTabKey, storeToRefs, useTabbarStore } from '@vben/stores';

import { IFrameRouterView } from '../../iframe';

defineOptions({ name: 'LayoutContent' });

const tabbarStore = useTabbarStore();
const { keepAlive } = usePreferences();

const { getCachedTabs, getExcludeCachedTabs, renderRouteView } =
  storeToRefs(tabbarStore);

/**
 * Whether to use animations
 */
const getEnabledTransition = computed(() => {
  const { transition } = preferences;
  const transitionName = transition.name;
  return transitionName && transition.enable;
});

// Page Switch Animation
function getTransitionName(_route: RouteLocationNormalizedLoaded) {
  // Do not use animation if preferred settings are not set
  const { tabbar, transition } = preferences;
  const transitionName = transition.name;
  if (!transitionName || !transition.enable) {
    return;
  }

  // Use global configuration animations when tabs are not enabled or caches are not turned on
  if (!tabbar.enable || !keepAlive) {
    return transitionName;
  }

  // Do not use animation if page has been loaded
  // if (route.meta.loaded) {
  //   return;
  // }
  // Pages that have been opened and loaded do not use animation
  // const inTabs = getCachedTabs.value.includes(route.name as string);

  // return inTabs && route.meta.loaded ? undefined : transitionName;
  return transitionName;
}

/**
 * Convert component, automatically add name *@paramcompont
 */
function transformComponent(
  component: VNode,
  route: RouteLocationNormalizedLoadedGeneric,
) {
  // Component view not found. If set back view is available, the backup view is returned or, if not, the error is thrown
  if (!component) {
    console.error(
      'Component view not found，please check the route configuration',
    );
    return undefined;
  }

  const routeName = route.name as string;
  // If component does not have a name, return directly
  if (!routeName) {
    return component;
  }
  const componentName = (component?.type as any)?.name;

  // The name has been set and returns directly
  if (componentName) {
    return component;
  }

  // ComponentName is the same as rootName and returns directly
  if (componentName === routeName) {
    return component;
  }

  // Set Name
  component.type ||= {};
  (component.type as any).name = routeName;

  return component;
}
</script>

<template>
  <div class="relative h-full">
    <IFrameRouterView />
    <RouterView v-slot="{ Component, route }">
      <Transition
        v-if="getEnabledTransition"
        :name="getTransitionName(route)"
        appear
        mode="out-in"
      >
        <KeepAlive
          v-if="keepAlive"
          :exclude="getExcludeCachedTabs"
          :include="getCachedTabs"
        >
          <component
            :is="transformComponent(Component, route)"
            v-if="renderRouteView"
            v-show="!route.meta.iframeSrc"
            :key="getTabKey(route)"
          />
        </KeepAlive>
        <component
          :is="Component"
          v-else-if="renderRouteView"
          :key="getTabKey(route)"
        />
      </Transition>
      <template v-else>
        <KeepAlive
          v-if="keepAlive"
          :exclude="getExcludeCachedTabs"
          :include="getCachedTabs"
        >
          <component
            :is="transformComponent(Component, route)"
            v-if="renderRouteView"
            v-show="!route.meta.iframeSrc"
            :key="getTabKey(route)"
          />
        </KeepAlive>
        <component
          :is="Component"
          v-else-if="renderRouteView"
          :key="getTabKey(route)"
        />
      </template>
    </RouterView>
  </div>
</template>