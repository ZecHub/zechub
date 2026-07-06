import type { CubicBezierPoints, EasingFunction } from '@vueuse/core';

import type { StyleValue } from 'vue';

import { TransitionPresets as TransitionPresetsData } from '@vueuse/core';

export type TransitionPresets = keyof typeof TransitionPresetsData;

export const TransitionPresetsKeys = Object.keys(
  TransitionPresetsData,
) as TransitionPresets[];

export interface CountToProps {
  /** Initial value */
  startVal?: number;
  /** Current value */
  endVal: number;
  /** Disable Animation */
  disabled?: boolean;
  /** Delay the animation start */
  delay?: number;
  /** Duration  */
  duration?: number;
  /** Decimal places  */
  decimals?: number;
  /** Decimal Points  */
  decimal?: string;
  /** Separator  */
  separator?: string;
  /** Prefix  */
  prefix?: string;
  /** Suffix  */
  suffix?: string;
  /** Transition effects  */
  transition?: CubicBezierPoints | EasingFunction | TransitionPresets;
  /** Catalogue name for the integer part */
  mainClass?: string;
  /** Classes for decimal parts */
  decimalClass?: string;
  /** Class name for the prefix */
  prefixClass?: string;
  /** Class name for the suffix */
  suffixClass?: string;

  /** Styles for integer parts */
  mainStyle?: StyleValue;
  /** Thumbnail Styles for Fractions */
  decimalStyle?: StyleValue;
  /** Style for the prefix */
  prefixStyle?: StyleValue;
  /** Style of the suffix */
  suffixStyle?: StyleValue;
}