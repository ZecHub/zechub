import type { Component, Ref } from 'vue';

import type { ClassType, MaybePromise } from '@vben-core/typings';

import type { DrawerApi } from './drawer-api';

export type DrawerPlacement = 'bottom' | 'left' | 'right' | 'top';

export type CloseIconPlacement = 'left' | 'right';

export interface DrawerProps {
  /**
   * Whether to mount into content *@default file
   */
  appendToMain?: boolean;
  /**
   * Cancel button text
   */
  cancelText?: string;
  class?: ClassType;
  /**
   * Whether to show off buttons@default true
   */
  closable?: boolean;
  /**
   * Close button position
   */
  closeIconPlacement?: CloseIconPlacement;
  /**
   * Whether to close the window by clicking on the window mask@default true
   */
  closeOnClickModal?: boolean;
  /**
   * Press the ESC key to close the window
   */
  closeOnPressEscape?: boolean;
  /**
   * Confirming buttonsloading *@default false
   */
  confirmLoading?: boolean;
  /**
   * OK button text
   */
  confirmText?: string;
  contentClass?: string;
  /**
   * Window description
   */
  description?: string;
  /**
   * Destroy drawers when closed
   */
  destroyOnClose?: boolean;
  /**
   * Whether to show bottom * @default true
   */
  footer?: boolean;
  /**
   * Bottom of the window style
   */
  footerClass?: ClassType;
  /**
   * Whether or not to show the topbar * @default true
   */
  header?: boolean;
  /**
   * Window Head Style
   */
  headerClass?: ClassType;
  /**
   * Whether or not to display a window *@default false
   */
  loading?: boolean;
  /**
   * Whether or not to show the mask* @default true
   */
  modal?: boolean;

  /**
   * Whether to focus automatically
   */
  openAutoFocus?: boolean;
  /**
   * Blur window mask effect
   */
  overlayBlur?: number;
  /**
   * The drawer position* @default right
   */
  placement?: DrawerPlacement;

  /**
   * Whether to show cancel buttons@default true
   */
  showCancelButton?: boolean;
  /**
   * Whether to show confirmation buttons@default true
   */
  showConfirmButton?: boolean;
  /**
   * Presented (locking drawer status)
   */
  submitting?: boolean;
  /**
   * Window Title
   */
  title?: string;
  /**
   * Popup Header Hint
   */
  titleTooltip?: string;
  /**
   * Drawer Level
   */
  zIndex?: number;
}

export interface DrawerState extends DrawerProps {
  /** Open window */
  isOpen?: boolean;
  /**
   * Share Data
   */
  sharedData?: Record<string, any>;
}

export type ExtendedDrawerApi = DrawerApi & {
  useStore: <T = NoInfer<DrawerState>>(
    selector?: (state: NoInfer<DrawerState>) => T,
  ) => Readonly<Ref<T>>;
};

export interface DrawerApiOptions extends DrawerState {
  /**
   * Independent drawer component
   */
  connectedComponent?: Component;
  /**
   * Backback before closing, return false to stop closing * @returns
   */
  onBeforeClose?: () => MaybePromise<boolean | undefined>;
  /**
   * Backbacks by Clicking on Cancel button
   */
  onCancel?: () => void;
  /**
   * Backback after the window closes animated @returns
   */
  onClosed?: () => void;
  /**
   * Resume by clicking on the OK button
   */
  onConfirm?: () => void;
  /**
   * Window change status echo * @param isOpen * @returns
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Backback after the window opens animated @returns
   */
  onOpened?: () => void;
}