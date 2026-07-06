interface FallbackProps {
  /**
   * Description
   */
  description?: string;
  /**
   *  @zh_CN First Page Route Address* @default/
   */
  homePath?: string;
  /**
   * Image displayed by default @default pageNotFoundSvg
   */
  image?: string;
  /**
   *  @zh_CN Internal Type
   */
  status?: '403' | '404' | '500' | 'coming-soon' | 'offline';
  /**
   *  @zh_CN page tip
   */
  title?: string;
}
export type { FallbackProps };