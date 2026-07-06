import type { RouteLocationNormalized } from 'vue-router';

export interface TabDefinition extends RouteLocationNormalized {
  /**
   * Key for tabs
   */
  key?: string;
}