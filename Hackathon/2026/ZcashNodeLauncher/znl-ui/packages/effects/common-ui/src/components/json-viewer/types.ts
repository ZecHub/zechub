export interface JsonViewerProps {
  /** Structure data to be displayed */
  value: any;
  /** Expand Depth */
  expandDepth?: number;
  copyable?: boolean;
  /** Whether or not to sort */
  sort?: boolean;
  /** Show Borders */
  boxed?: boolean;
  /** Theme */
  theme?: string;
  /** Whether or not to expand */
  expanded?: boolean;
  /** Time formatting function */
  timeformat?: (time: Date | number | string) => string;
  /** Preview Mode */
  previewMode?: boolean;
  /** Show array index */
  showArrayIndex?: boolean;
  /** Show Double Quotes */
  showDoubleQuotes?: boolean;
}

export interface JsonViewerAction {
  action: string;
  text: string;
  trigger: HTMLElement;
}

export interface JsonViewerValue {
  value: any;
  path: string;
  depth: number;
  el: HTMLElement;
}

export interface JsonViewerToggle {
  /** Mouse Event */
  event: MouseEvent;
  /** Current status */
  open: boolean;
}
