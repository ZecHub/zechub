import type { Component, VNode, VNodeArrayChildren } from 'vue';

import type { Recordable } from '@vben-core/typings';

import { createContext } from '@vben-core/shadcn-ui';

export type IconType = 'error' | 'info' | 'question' | 'success' | 'warning';

export type BeforeCloseScope = {
  isConfirm: boolean;
};

export type AlertProps = {
  /** Retrievals before closing, and if returns false, close */
  beforeClose?: (
    scope: BeforeCloseScope,
  ) => boolean | Promise<boolean | undefined> | undefined;
  /** Borders */
  bordered?: boolean;
  /**
   * Button Alignment * @default 'end '
   */
  buttonAlign?: 'center' | 'end' | 'start';
  /** Cancel the title of the button */
  cancelText?: string;
  /** Whether or not to middle */
  centered?: boolean;
  /** Title of the confirmation button */
  confirmText?: string;
  /** Additional style for window packagings */
  containerClass?: string;
  /** Bullettip Contents */
  content: Component | string;
  /** Additional Styles for the contents of the window */
  contentClass?: string;
  /** Show a loading mask in the content area during the beforeClose return*/
  contentMasking?: boolean;
  /** Bottom contents of the window (with buttons in the same container) */
  footer?: Component | string;
  /** Icon of the window (in front of the title) */
  icon?: Component | IconType;
  /**
   * Blur window mask effect
   */
  overlayBlur?: number;
  /** Whether to show cancel buttons */
  showCancel?: boolean;
  /** Window Title */
  title?: string;
};

/** Prompt Properties */
export type PromptProps<T = any> = {
  /** Retrievals before closing, and if returns false, close */
  beforeClose?: (scope: {
    isConfirm: boolean;
    value: T | undefined;
  }) => boolean | Promise<boolean | undefined> | undefined;
  /** Component to receive user input */
  component?: Component;
  /** Enter the properties of the component */
  componentProps?: Recordable<any>;
  /** Enter the plugin for the component */
  componentSlots?:
    | (() => any)
    | Recordable<unknown>
    | VNode
    | VNodeArrayChildren;
  /** Default value */
  defaultValue?: T;
  /** Enter a value attribute name for the component */
  modelPropName?: string;
} & Omit<AlertProps, 'beforeClose'>;

/**
 * Alert context
 */
export type AlertContext = {
  /** Execute Cancel Operation */
  doCancel: () => void;
  /** Execute Confirmation Operation */
  doConfirm: () => void;
};

export const [injectAlertContext, provideAlertContext] =
  createContext<AlertContext>('VbenAlertContext');

/**
 * Get Alert context* @returns AlertContext
 */
export function useAlertContext() {
  const context = injectAlertContext();
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
}