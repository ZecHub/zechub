import type { AsTag } from 'radix-vue';

import type { Component } from 'vue';

import type { ButtonVariants, ButtonVariantSize } from '../../ui';

export interface VbenButtonProps {
  /**
   * The element or component this component should render as. Can be overwrite by `asChild`
   * @defaultValue "div"
   */
  as?: AsTag | Component;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read our [Composition](https://www.radix-vue.com/guides/composition.html) guide for more details.
   */
  asChild?: boolean;
  class?: any;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonVariantSize;
  variant?: ButtonVariants;
}

export type CustomRenderType = (() => Component | string) | string;

export type ValueType = boolean | number | string;

export interface VbenButtonGroupProps
  extends Pick<VbenButtonProps, 'disabled'> {
  /** Allow clear selection under single mode */
  allowClear?: boolean;
  /** Backbacks before value changes */
  beforeChange?: (
    value: ValueType,
    isChecked: boolean,
  ) => boolean | PromiseLike<boolean | undefined> | undefined;
  /** Button Styles */
  btnClass?: any;
  /** Button Interval Distance */
  gap?: number;
  /** limit the maximum number of options in multi-option mode. */
  maxCount?: number;
  /** Whether multiples are allowed */
  multiple?: boolean;
  /** Options */
  options?: { [key: string]: any; label: CustomRenderType; value: ValueType }[];
  /** Show icons */
  showIcon?: boolean;
  /** Dimensions */
  size?: 'large' | 'middle' | 'small';
}