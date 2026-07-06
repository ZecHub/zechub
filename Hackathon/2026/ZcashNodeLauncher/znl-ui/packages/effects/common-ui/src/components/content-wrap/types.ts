export interface ContentWrapProps {
  title?: string;
  description?: string;
  message?: string;
  contentClass?: string;
  /**
   * It's self-adapted by the visual height of the content.
   */
  autoContentHeight?: boolean;
  headerClass?: string;
  footerClass?: string;
  /**
   * Custom height offset value (in pixels) to adjust content area sizing
   * when used with autoContentHeight
   * @default 0
   */
  heightOffset?: number;
}