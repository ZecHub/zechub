type LayoutType =
  | 'full-content'
  | 'header-mixed-nav'
  | 'header-nav'
  | 'header-sidebar-nav'
  | 'mixed-nav'
  | 'sidebar-mixed-nav'
  | 'sidebar-nav';

type ThemeModeType = 'auto' | 'dark' | 'light';

/**
 * Preferred set button position *fixed to the right * header topbar * auto
 */
type PreferencesButtonPositionType = 'auto' | 'fixed' | 'header';

type BuiltinThemeType =
  | 'custom'
  | 'deep-blue'
  | 'deep-green'
  | 'default'
  | 'gray'
  | 'green'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'red'
  | 'rose'
  | 'sky-blue'
  | 'slate'
  | 'stone'
  | 'violet'
  | 'yellow'
  | 'zinc'
  | (Record<never, never> & string);

type ContentCompactType = 'compact' | 'wide';

type LayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static';
type LayoutHeaderMenuAlignType = 'center' | 'end' | 'start';

/**
 * Login expired *modal window mode *page page mode
 */
type LoginExpiredModeType = 'modal' | 'page';

/**
 * Bread crumb style *background background *normal default
 */
type BreadcrumbStyleType = 'background' | 'normal';

/**
 * Permission mode *backend backend permission mode * frontend permission mode * mixed permission mode
 */
type AccessModeType = 'backend' | 'frontend' | 'mixed';

/**
 * Navigation style * plain plain * rounded
 */
type NavigationStyleType = 'plain' | 'rounded';

/**
 * Tab bar style * brisk light *card card * chrome Google * plain plain
 */
type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain';

/**
 * Page Switch Animation
 */
type PageTransitionType = 'fade' | 'fade-down' | 'fade-slide' | 'fade-up';

/**
 * Page Switch Animation *panel-center in centre layout *panel-left in left layout *panel-right in right layout
 */
type AuthPageLayoutType = 'panel-center' | 'panel-left' | 'panel-right';

export type {
  AccessModeType,
  AuthPageLayoutType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
};