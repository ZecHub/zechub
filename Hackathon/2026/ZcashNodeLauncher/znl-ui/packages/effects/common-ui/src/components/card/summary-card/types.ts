import type { Component } from 'vue';

export interface SummaryCardProps {
  /** Title */
  title: string;
  /** Can not open message */
  tooltip?: string;
  /** Icon */
  icon?: Component | string;
  /** Icon Colour */
  iconColor?: string;
  /** Icon Background Color */
  iconBgColor?: string;
  /** Prefix */
  prefix?: string;
  /** Value */
  value?: number;
  /** Decimal places */
  decimals?: number;
  /** Percentage */
  percent?: number | string;
}