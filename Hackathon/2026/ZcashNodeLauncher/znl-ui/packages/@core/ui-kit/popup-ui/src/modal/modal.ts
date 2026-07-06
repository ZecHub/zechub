import type { Component, Ref } from 'vue';

import type { MaybePromise } from '@vben-core/typings';

import type { ModalApi } from './modal-api';

export interface ModalProps {
  /**
   * Animation Type * @default'slide'
   */
  animationType?: 'scale' | 'slide';
  /**
   * Whether to mount to content area
   */
  appendToMain?: boolean;
  /**
   * Whether to show borders * @default frame
   */
  bordered?: boolean;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Whether or not to centre * @default corner
   */
  centered?: boolean;

  class?: string;

  /**
   * Whether to show close buttons at the top right corner @default true
   */
  closable?: boolean;
  /**
   * Whether to close the window by clicking on the window mask@default true
   */
  closeOnClickModal?: boolean;
  /**
   * Press the ESC key to close the window
   */
  closeOnPressEscape?: boolean;
  /**
   * Disable confirmation button
   */
  confirmDisabled?: boolean;
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
   * Destroy windows when closed
   */
  destroyOnClose?: boolean;
  /**
   * Can you drag * @default false
   */
  draggable?: boolean;
  /**
   * Whether to show bottom * @default true
   */
  footer?: boolean;
  footerClass?: string;
  /**
   * Whether or not fullscreen * @default false
   */
  fullscreen?: boolean;
  /**
   * Whether to show fullscreen buttons@default true
   */
  fullscreenButton?: boolean;
  /**
   * Whether or not to show the topbar * @default true
   */
  header?: boolean;
  headerClass?: string;
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
   * Whether to show cancel buttons@default true
   */
  showCancelButton?: boolean;
  /**
   * Whether to show confirmation buttons@default true
   */
  showConfirmButton?: boolean;
  /**
   * Presented (locking window status)
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
   * Window Level
   */
  zIndex?: number;
}

export interface ModalState extends ModalProps {
  /** Open window */
  isOpen?: boolean;
  /**
   * Share Data
   */
  sharedData?: Record<string, any>;
}

export type ExtendedModalApi = ModalApi & {
  useStore: <T = NoInfer<ModalState>>(
    selector?: (state: NoInfer<ModalState>) => T,
  ) => Readonly<Ref<T>>;
};

export interface ModalApiOptions extends ModalState {
  /**
   * Separate window components
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