import { defineAsyncComponent } from 'vue';

const modules = import.meta.glob('../views/**/*.{vue,tsx}');

/**
 * Register an asymmetric component * @paramcomponentPath Example: /bpm/ oa/ leave/detail
 */
export function registerComponent(componentPath: string) {
  for (const item in modules) {
    if (item.includes(componentPath)) {
      // Dynamically load components using asynchronous components
      return defineAsyncComponent(modules[item] as any);
    }
  }
}