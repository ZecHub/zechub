import type {
  ContentCompactType,
  LayoutHeaderModeType,
  LayoutType,
  ThemeModeType,
} from '@vben-core/typings';

interface VbenLayoutProps {
  /**
   * Content Area Width@default 'wide '
   */
  contentCompact?: ContentCompactType;
  /**
   * Set Wide Layout Width * @default 1200
   */
  contentCompactWidth?: number;
  /**
   * padding
   * @default 16
   */
  contentPadding?: number;
  /**
   * paddingBottom
   * @default 16
   */
  contentPaddingBottom?: number;
  /**
   * paddingLeft
   * @default 16
   */
  contentPaddingLeft?: number;
  /**
   * paddingRight
   * @default 16
   */
  contentPaddingRight?: number;
  /**
   * paddingTop
   * @default 16
   */
  contentPaddingTop?: number;
  /**
   * Whether or not the footer is visible*
   */
  footerEnable?: boolean;
  /**
   * Whether or not the footer is fixed* @default true
   */
  footerFixed?: boolean;
  /**
   * Footer Height* @default 32
   */
  footerHeight?: number;

  /**
   * Header height* @default 48
   */
  headerHeight?: number;
  /**
   * Whether the topbar is hidden*
   */
  headerHidden?: boolean;
  /**
   * Header Display Mode *@default 'fixed '
   */
  headerMode?: LayoutHeaderModeType;
  /**
   * header topbar theme
   */
  headerTheme?: ThemeModeType;
  /**
   * Whether to show header toggle sidebar buttons @default
   */
  headerToggleSidebarButton?: boolean;
  /**
   * Whether header displays *@default true
   */
  headerVisible?: boolean;
  /**
   * Whether or not to move the end display * @default false
   */
  isMobile?: boolean;
  /**
   * Layout *sidebar-nav side menu layout * header-nav top menu layout * mixed sidebar-mixed-nav side menu layout * full-content full-screen layout @default sidebar-nav
   */
  layout?: LayoutType;
  /**
   * Side Menu Collapse State
   */
  sidebarCollapse?: boolean;
  /**
   * Side Menu Collapse Button
   */
  sidebarCollapsedButton?: boolean;
  /**
   * Whether side menus are displayed when folding * @default true
   */
  sidebarCollapseShowTitle?: boolean;
  /**
   * Whether sidebars are visible*@default true
   */
  sidebarEnable?: boolean;
  /**
   * Side Menu Collapse Extra Width@default 48
   */
  sidebarExtraCollapsedWidth?: number;
  /**
   * Whether side menu folding buttons are fixed
   */
  sidebarFixedButton?: boolean;
  /**
   * Whether sidebars are hidden
   */
  sidebarHidden?: boolean;
  /**
   * Mixed Sidebar Width *@default 80
   */
  sidebarMixedWidth?: number;
  /**
   * Sidebar * @default dark
   */
  sidebarTheme?: ThemeModeType;
  /**
   * Sidebar Width *@default 210
   */
  sidebarWidth?: number;
  /**
   *  Side Menu Collapse Width@default 48
   */
  sideCollapseWidth?: number;
  /**
   * @default true
   */
  tabbarEnable?: boolean;
  /**
   * Tab Height * @default 30
   */
  tabbarHeight?: number;
  /**
   * zIndex
   * @default 100
   */
  zIndex?: number;
}
export type { VbenLayoutProps };