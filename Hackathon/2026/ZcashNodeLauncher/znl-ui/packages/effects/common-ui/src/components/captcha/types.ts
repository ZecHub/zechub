import type { CSSProperties } from 'vue';

import type { ClassType } from '@vben/types';

export interface CaptchaData {
  /**
   * x
   */
  x: number;
  /**
   * y
   */
  y: number;
  /**
   * Time stamp
   */
  t: number;
}
export interface CaptchaPoint extends CaptchaData {
  /**
   * Data Index
   */
  i: number;
}
export interface PointSelectionCaptchaCardProps {
  /**

   */
  captchaImage: string;
  /**

   */
  height?: number | string;
  /**
   * Horizontal insider * @default '12px'
   */
  paddingX?: number | string;
  /**
   * Vertical Inner Margin *@default '16px'
   */
  paddingY?: number | string;
  /**
   * Title * @default 'Please click by graph'
   */
  title?: string;
  /**

   */
  width?: number | string;
}

export interface PointSelectionCaptchaProps
  extends PointSelectionCaptchaCardProps {
  /**
   * Whether or not to display the OK button *
   */
  showConfirm?: boolean;
  /**
   * Hint Image * @default ''
   */
  hintImage?: string;
  /**
   * Hint Text@default '
   */
  hintText?: string;
}

export interface SliderCaptchaProps {
  class?: ClassType;
  /**
   * Style of @description slider* @default
   */
  actionStyle?: CSSProperties;

  /**
   * Style of @description slidebar* @default
   */
  barStyle?: CSSProperties;

  /**
   * Style for @description content * @default {}
   */
  contentStyle?: CSSProperties;

  /**
   * Style of the @description component * @default {}
   */
  wrapperStyle?: CSSProperties;

  /**
   * @description Whether to be used as a slot for connecting components, can refer to rotation check components *Default false
   */
  isSlot?: boolean;

  /**
   * @description Confirms Successful Tip @default 'Vertify Pass '
   */
  successText?: string;

  /**
   * @description reminder text @default 'Please hold the slide to drag '
   */
  text?: string;
}

export interface SliderRotateCaptchaProps {
  /**
   * @description rotation angle @default 20
   */
  diffDegree?: number;

  /**
   * Width of @description Image * @default 260
   */
  imageSize?: number;

  /**
   * Style for @description pictures * @default {}
   */
  imageWrapperStyle?: CSSProperties;

  /**
   * @description Maximum rotation angle @default 270
   */
  maxDegree?: number;

  /**
   * @description Minimum rotation angle @default 90
   */
  minDegree?: number;

  /**
   * Address of @description pictures
   */
  src?: string;
  /**
   * @description Default Hint Text
   */
  defaultTip?: string;
}

export interface SliderTranslateCaptchaProps {
  /**
   * Width of the puzzle @default 420
   */
  canvasWidth?: number;
  /**
   * Height of the @description puzzle @default 280
   */
  canvasHeight?: number;
  /**
   * @description Cut the length of squares above a block @default 42
   */
  squareLength?: number;
  /**
   * @description Cut the radius of a circle @default 10
   */
  circleRadius?: number;
  /**
   * Address of @description pictures
   */
  src?: string;
  /**
   * @description Maximum Gap allowed @default 3
   */
  diffDistance?: number;
  /**
   * @description Default Hint Text
   */
  defaultTip?: string;
}

export interface CaptchaVerifyPassingData {
  isPassing: boolean;
  time: number | string;
}

export interface SliderCaptchaActionType {
  resume: () => void;
}

export interface SliderRotateVerifyPassingData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}
