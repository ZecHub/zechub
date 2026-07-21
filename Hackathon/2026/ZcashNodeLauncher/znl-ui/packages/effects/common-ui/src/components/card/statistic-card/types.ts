export interface StatisticCardProps {
  /** Title */
  title: string;
  /** Can not open message */
  tooltip?: string;
  /** Prefix */
  prefix?: string;
  /** Value */
  value?: number;
  /** Decimal places */
  decimals?: number;
  /** Ring percentage */
  percent?: number | string;
  /** Ring Tab Text */
  percentLabel?: string;
}