import type {
  AccessModeType,
  AuthPageLayoutType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  DeepPartial,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
} from '@vben-core/typings';

type SupportedLanguagesType = 'en-US' | 'zh-CN';

interface AppPreferences {
  /** Permission Mode */
  accessMode: AccessModeType;
  /** Login to registered page layout */
  authPageLayout: AuthPageLayoutType;
  /** Check update query time */
  checkUpdatesInterval: number;
  /** Whether to turn on grey mode */
  colorGrayMode: boolean;
  /** Whether or not to turn on weak color mode */
  colorWeakMode: boolean;
  /** Whether to start compact mode */
  compact: boolean;
  /** Whether to start content compact mode */
  contentCompact: ContentCompactType;
  /** Threshold Width */
  contentCompactWidth: number;
  /** Inner Margins of Content */
  contentPadding: number;
  /** Inner margin at the bottom of content */
  contentPaddingBottom: number;
  /** Contents to the left inner margin */
  contentPaddingLeft: number;
  /** Inner margin to the right of content */
  contentPaddingRight: number;
  /** Inner margin at top of content */
  contentPaddingTop: number;
  // /** Apply default header */
  defaultAvatar: string;
  /** Default homepage address */
  defaultHomePath: string;
  // /** Start dynamic title */
  dynamicTitle: boolean;
  /** Whether to open check for updates */
  enableCheckUpdates: boolean;
  /** Whether preferences should be shown */
  enablePreferences: boolean;
  /**
   * @zh_CN Whether to start refreshToken
   */
  enableRefreshToken: boolean;
  /**
   * @zh_CN Whether to turn on the top of the preferred navigation bar
   */
  enableStickyPreferencesNavigationBar: boolean;
  /** Whether or not to move the end */
  isMobile: boolean;
  /** Layout */
  layout: LayoutType;
  /** Supported Language */
  locale: SupportedLanguagesType;
  /** Login Expire Mode */
  loginExpiredMode: LoginExpiredModeType;
  /** Apply Name */
  name: string;
  /** Prefer button position */
  preferencesButtonPosition: PreferencesButtonPositionType;
  /**
   * @zh_CN Whether to turn on the watermark
   */
  watermark: boolean;
  /**
   * @zh_CN Watermark
   */
  watermarkContent: string;
  /** z-index */
  zIndex: number;
}

interface BreadcrumbPreferences {
  /** Whether bread crumbs are enabled */
  enable: boolean;
  /** Is there only one time to hide the bread crumbs? */
  hideOnlyOne: boolean;
  /** Is the baker's header icon visible? */
  showHome: boolean;
  /** Is Bread Shape Icon Visible */
  showIcon: boolean;
  /** Bread crumbs. */
  styleType: BreadcrumbStyleType;
}

interface CopyrightPreferences {
  /** Name of copyright company */
  companyName: string;
  /** Copyright company name link */
  companySiteLink: string;
  /** Copyright Date */
  date: string;
  /** Whether copyright is visible */
  enable: boolean;
  /** File number */
  icp: string;
  /** File Number Link */
  icpLink: string;
  /** Sets whether the panel should be displayed*/
  settingShow?: boolean;
}

interface FooterPreferences {
  /** Whether the bottom bar is visible */
  enable: boolean;
  /** Whether the bottom bar is fixed */
  fixed: boolean;
  /** Bottom Bar Height */
  height: number;
}

interface HeaderPreferences {
  /** Whether the top bar is enabled */
  enable: boolean;
  /** Top Bar Height */
  height: number;
  /** Whether the top bar is hidden, css-hidden */
  hidden: boolean;
  /** Top Bar Menu Position */
  menuAlign: LayoutHeaderMenuAlignType;
  /** Header display mode */
  mode: LayoutHeaderModeType;
}

interface LogoPreferences {
  /** Is Logo Visible? */
  enable: boolean;
  /** Logo Image Adaptation */
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Logo Address */
  source: string;
}

interface NavigationPreferences {
  /** Navigator Menu accordion Mode */
  accordion: boolean;
  /** Whether the navigation menu is cut, only playout=mixed-nav takes effect */
  split: boolean;
  /** Navigator Menu Style */
  styleType: NavigationStyleType;
}

interface SidebarPreferences {
  /** Automatically activate submenu when clicking on directory   */
  autoActivateChild: boolean;
  /** Whether sidebar folds */
  collapsed: boolean;
  /** Whether sidebar folding buttons are visible */
  collapsedButton: boolean;
  /** Whether to display title when sidebar folds */
  collapsedShowTitle: boolean;
  /** Sidebar Collapse Width */
  collapseWidth: number;
  /** Whether sidebars are visible */
  enable: boolean;
  /** Menu AutoSpanning Status */
  expandOnHover: boolean;
  /** Whether sidebar extension area folds */
  extraCollapse: boolean;
  /** Sidebar Extension Area Collapse Width */
  extraCollapsedWidth: number;
  /** Whether sidebar fixed buttons are visible */
  fixedButton: boolean;
  /** Whether sidebars are hidden -css */
  hidden: boolean;
  /** Mixed Sidebar Width */
  mixedWidth: number;
  /** Sidebar Width */
  width: number;
}

interface ShortcutKeyPreferences {
  /** Whether to enable shortcuts - global */
  enable: boolean;
  /** Whether global lock shortcuts are enabled */
  globalLockScreen: boolean;
  /** Whether to enable global write-off shortcuts */
  globalLogout: boolean;
  /** Whether global preferences set shortcuts are enabled */
  globalPreferences: boolean;
  /** Whether global search shortcuts are enabled */
  globalSearch: boolean;
}

interface TabbarPreferences {
  /** Whether to open multi-label drag */
  draggable: boolean;
  /** Whether multiple tabs should be opened */
  enable: boolean;
  /** Tab height */
  height: number;
  /** Open Tab Cache */
  keepAlive: boolean;
  /** Maximum number limited */
  maxCount: number;
  /** Whether to close tab on middle-click */
  middleClickToClose: boolean;
  
  persist: boolean;
  /** Whether to open multi-label icons */
  showIcon: boolean;
  /** Show Maximise Buttons */
  showMaximize: boolean;
  /** Show more buttons */
  showMore: boolean;
  /** Tab Style */
  styleType: TabsStyleType;
  /** Whether to turn on the mouse wheel response */
  wheelable: boolean;
}

interface ThemePreferences {
  /** Built subject names */
  builtinType: BuiltinThemeType;
  /** Error color */
  colorDestructive: string;
  /** Theme Color */
  colorPrimary: string;
  /** Success Color */
  colorSuccess: string;
  /** Warning Color */
  colorWarning: string;
  /** Current Theme */
  mode: ThemeModeType;
  /** Round Corner */
  radius: string;
  /** Whether to turn on half-deep header (effective only when theme= 'light') */
  semiDarkHeader: boolean;
  /** Whether to open a half-deep menu (effective only when theme=light') */
  semiDarkSidebar: boolean;
}

interface TransitionPreferences {
  /** Whether page animation is enabled */
  enable: boolean;
  // /** Whether to open page to load */
  loading: boolean;
  /** Page Switch Animation */
  name: PageTransitionType | string;
  /** Whether to open page to load progress animations */
  progress: boolean;
}

interface WidgetPreferences {
  /** Whether fullscreen widgets are enabled */
  fullscreen: boolean;
  /** Whether global search widgets are enabled */
  globalSearch: boolean;
  /** Whether language toggle widgets are enabled */
  languageToggle: boolean;
  /** Whether or not to turn on the lock feature */
  lockScreen: boolean;
  /** Whether to show notification widgets */
  notification: boolean;
  /** Show Refresh Buttons */
  refresh: boolean;
  /** Whether to show sidebar display/hidden widgets */
  sidebarToggle: boolean;
  /** Whether theme switch widgets should be shown */
  themeToggle: boolean;
}

interface Preferences {
  /** Global Configuration */
  app: AppPreferences;
  /** Top Bar Configuration */
  breadcrumb: BreadcrumbPreferences;
  /** Copyright Configuration */
  copyright: CopyrightPreferences;
  /** Bottom Bar Configuration */
  footer: FooterPreferences;
  /** Bread Shape Configuration */
  header: HeaderPreferences;
  /** Logo Configuration */
  logo: LogoPreferences;
  /** Navigation Configuration */
  navigation: NavigationPreferences;
  /** Shortcut Configuration */
  shortcutKeys: ShortcutKeyPreferences;
  /** Sidebar Configuration */
  sidebar: SidebarPreferences;
  /** Tab Configuration */
  tabbar: TabbarPreferences;
  /** Theme Configuration */
  theme: ThemePreferences;
  /** Animation Configuration */
  transition: TransitionPreferences;
  /** Function Configuration */
  widget: WidgetPreferences;
}

type PreferencesKeys = keyof Preferences;

interface InitialOptions {
  namespace: string;
  overrides?: DeepPartial<Preferences>;
}
export type {
  AppPreferences,
  BreadcrumbPreferences,
  FooterPreferences,
  HeaderPreferences,
  InitialOptions,
  LogoPreferences,
  NavigationPreferences,
  Preferences,
  PreferencesKeys,
  ShortcutKeyPreferences,
  SidebarPreferences,
  SupportedLanguagesType,
  TabbarPreferences,
  ThemePreferences,
  TransitionPreferences,
  WidgetPreferences,
};
