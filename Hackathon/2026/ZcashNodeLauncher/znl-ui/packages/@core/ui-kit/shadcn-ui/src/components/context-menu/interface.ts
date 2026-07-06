import type { Component } from 'vue';

interface IContextMenuItem {
  /**
   * @zh_CN Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN Click Event Handling* @param Data
   */
  handler?: (data: any) => void;
  /**
   * @zh_CN Icon
   */
  icon?: Component;
  /**
   * @zh_CN Whether to display icons
   */
  inset?: boolean;
  /**
   * Unique ID for @zh_CN
   */
  key: string;
  /**
   * @zh_CN Whether to split lines
   */
  separator?: boolean;
  /**
   * @zh_CN Shortcut
   */
  shortcut?: string;
  /**
   * @zh_CN Title
   */
  text: string;
}
export type { IContextMenuItem };