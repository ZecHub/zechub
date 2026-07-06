import type { Arrayable } from '@vueuse/core';
import type { FlattenedItem } from 'radix-vue';

import type { Recordable } from '@vben-core/typings';

export interface TreeProps {
  /** Allow to cancel existing options when single options are selected */
  allowClear?: boolean;
  /** Automatically select a higher node for unconnected selection */
  autoCheckParent?: boolean;
  /** Show Borders */
  bordered?: boolean;
  /** Cancel parent association selection */
  checkStrictly?: boolean;
  /** Sublevel Field Name */
  childrenField?: string;
  /** Default Expand Keys */
  defaultExpandedKeys?: Array<number | string>;
  /** The level of the default roll-out (priority is higher than defaultExpandedKeys) */
  defaultExpandedLevel?: number;
  /** Default value */
  defaultValue?: Arrayable<number | string>;
  /** Disable */
  disabled?: boolean;
  /** Disable field names */
  disabledField?: string;
  /** Custom Node Class Name */
  getNodeClass?: (item: FlattenedItem<Recordable<any>>) => string;
  iconField?: string;
  /** Label field */
  labelField?: string;
  /** Whether or not to choose more options */
  multiple?: boolean;
  /** Show icons specified by iconField */
  showIcon?: boolean;
  /** Enable the expansion of the contraction animation */
  transition?: boolean;
  /** Tree Data */
  treeData: Recordable<any>[];
  /** Value Fields */
  valueField?: string;
}

export function treePropsDefaults() {
  return {
    allowClear: false,
    autoCheckParent: true,
    bordered: false,
    checkStrictly: false,
    defaultExpandedKeys: () => [],
    defaultExpandedLevel: 0,
    disabled: false,
    disabledField: 'disabled',
    iconField: 'icon',
    labelField: 'label',
    multiple: false,
    showIcon: true,
    transition: true,
    valueField: 'value',
    childrenField: 'children',
  };
}