import type { Component } from 'vue';

interface VbenDropdownMenuItem {
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
   * @zh_CN Title
   */
  label: string;
  /**
   * @zh_CN Whether to split lines
   */
  separator?: boolean;
  /**
   * Unique ID for @zh_CN
   */
  value: string;
}

interface DropdownMenuProps {
  menus: VbenDropdownMenuItem[];
}

export type { DropdownMenuProps, VbenDropdownMenuItem };