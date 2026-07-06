import type { DescriptionsProps } from 'ant-design-vue/es/descriptions';
import type { JSX } from 'vue/jsx-runtime';

import type { CSSProperties, VNode } from 'vue';

import type { Recordable } from '@vben/types';

export interface DescriptionItemSchema {
  labelMinWidth?: number;
  contentMinWidth?: number;
  // Custom Tab Styles
  labelStyle?: CSSProperties;
  // Field name corresponding to data
  field: string;
  // Description of content
  label: JSX.Element | string | VNode;
  // Quantity of Include Columns
  span?: number;
  // Whether or not to display
  show?: (...arg: any) => boolean;
  // Slot Name
  slot?: string;
  // Customize what needs to be displayed
  render?: (
    val: any,
    data?: Recordable<any>,
  ) => Element | JSX.Element | number | string | undefined | VNode;
}

export interface DescriptionProps extends DescriptionsProps {
  // Whether to include card components
  useCard?: boolean;
  // Description Configuration
  schema: DescriptionItemSchema[];
  // Data
  data: Recordable<any>;
  // Title
  title?: string;
  // Whether to include borders
  bordered?: boolean;
  // Number of columns
  column?:
    | number
    | {
        lg: number;
        md: number;
        sm: number;
        xl: number;
        xs: number;
        xxl: number;
      };
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void;
}