import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import type { ConfigEnv, PluginOption, UserConfig } from 'vite';
import type { PluginOptions } from 'vite-plugin-dts';
import type { Options as PwaPluginOptions } from 'vite-plugin-pwa';

/**
 * ImportMap Configuration Interface *Description is used to configure the module import map to support custom import paths and ranges * *example * `typescript* { {imports { { 'vue': 'https://unpkg.com/vu@3.2.47/dist/vu.esm-browser.js' *, scopes: {https://site.com/': {https://unpkg.com/vue@3.2.47/dist.esm-browser.js' *}
 */
interface IImportMap {
  /** Module Import Map */
  imports?: Record<string, string>;
  /** Field-specific import map */
  scopes?: {
    [scope: string]: Record<string, string>;
  };
}

/**
 * Print Plugin Configuration Options * @description to configure print information on the Console
 */
interface PrintPluginOptions {
  /**
   * Print data map * @description key-to-form data will be printed on the Console * @example* ``typescript * {AppVersion': '1.0.0', * 'Build Time': '2024-01-01'
   */
  infoMap?: Record<string, string | undefined>;
}

/**
 * Nitro Mock Plugin Configuration Options * @description to configure Nitro Mock's behavior
 */
interface NitroMockPluginOptions {
  /**
   * Mock Server Package *@default '@vbenjs/nitro-mock'
   */
  mockServerPackage?: string;

  /**
   * Mock Service Port * @default 3000
   */
  port?: number;

  /**
   * Whether or not to print the Mock Log * @default page
   */
  verbose?: boolean;
}

/**
 * Archive Plugin Configuration Options * @description to configure the compressed archive of construction products
 */
interface ArchiverPluginOptions {
  /**
   * Output filename *@default 'dist '
   */
  name?: string;
  /**
   * Output Directory * @default '.'
   */
  outputDir?: string;
}

/**
 * ImportMap Plugin Configuration * @description for CDN import to configure modules
 */
interface ImportmapPluginOptions {
  /**
   * CDN vendor * @default 'jspm.io' * @description supports both CDN suppliers.sh and jspm.io
   */
  defaultProvider?: 'esm.sh' | 'jspm.io';
  /**
   * ImportMap Configuration Array * @description Configure Packages that need to be imported from CDN * @example * `typescript *[* {name: 'vu'}, * {name: 'pinia', range: '2.0.0'} *  `
   */
  importmap?: Array<{ name: string; range?: string }>;
  /**
   * Manually Configure ImportMap * @description Customise ImportMap Configuration
   */
  inputMap?: IImportMap;
}

/**
 * Conditional Plugin Configuration * @description to load plugins dynamically according to conditions
 */
interface ConditionPlugin {
  /**
   * Sensitisation * @description Load plugins when condition is true
   */
  condition?: boolean;
  /**
   * Plugin Object * @description returns plugin array or Promise
   */
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}

/**
 * Common plugin configuration options * @description All plugins share base configurations
 */
interface CommonPluginOptions {
  /**
   * Whether to turn on the development tool* @default false
   */
  devtools?: boolean;
  /**
   * Environment Variable * @description Customise Environment Variables
   */
  env?: Record<string, any>;
  /**
   * Whether to inject metadata*
   */
  injectMetadata?: boolean;
  /**
   * Whether to build mode *
   */
  isBuild?: boolean;
  /**
   * Build Mode *@default 'development'
   */
  mode?: string;
  /**
   * Whether to start dependence analysis * @default false * @description use rollup-plugin-visualizer to analyze dependence
   */
  visualizer?: boolean | PluginVisualizerOptions;
}

/**
 * Apply plugin configuration options * @description to configure plugin options for application build
 */
interface ApplicationPluginOptions extends CommonPluginOptions {
  /**
   * Whether to open compressed archive * @default file * @description will then package directory to generate zip files
   */
  archiver?: boolean;
  /**
   * Compress archive plugin configuration * behaviour of @description configuration compression archive
   */
  archiverPluginOptions?: ArchiverPluginOptions;
  /**
   * Whether to turn on the compression * @default frame * @description supports gzip and brotli compression
   */
  compress?: boolean;
  /**
   * Compress type * @default ['gzip'] * @description optional compression type
   */
  compressTypes?: ('brotli' | 'gzip')[];
  /**
   * Whether to remove profile * @default file * @description
   */
  extraAppConfig?: boolean;
  /**
   * Whether to turn on the HTML plugin @default true
   */
  html?: boolean;
  /**
   * Whether to start internationalization @default false
   */
  i18n?: boolean;
  /**
   * Whether or not to open ImportMap CDN*@default frame
   */
  importmap?: boolean;
  /**
   * ImportMap Plugin Configuration
   */
  importmapOptions?: ImportmapPluginOptions;
  /**
   * Whether to inject application load animation @default true
   */
  injectAppLoading?: boolean;
  /**
   * Whether to inject global SCSS * @default true
   */
  injectGlobalScss?: boolean;
  /**
   * Whether to inject copyright information*
   */
  license?: boolean;
  /**
   * Whether to turn Nitro Mock on @default false
   */
  nitroMock?: boolean;
  /**
   * Nitro Mock Plugin Configuration
   */
  nitroMockOptions?: NitroMockPluginOptions;
  /**
   * Whether to turn on the control pad for printing * @default false
   */
  print?: boolean;
  /**
   * Print Plugin Configuration
   */
  printInfoMap?: PrintPluginOptions['infoMap'];
  /**
   * Whether PWA * @default frame
   */
  pwa?: boolean;
  /**
   * PWA Plugin Configuration
   */
  pwaOptions?: Partial<PwaPluginOptions>;
  /**
   * Whether to turn on VXEtable Lazy Load * @default frame
   */
  vxeTableLazyImport?: boolean;
}

/**
 * Library Plugin Configuration Options * @description Plugin Options to configure library build
 */
interface LibraryPluginOptions extends CommonPluginOptions {
  /**
   * Whether to open DTS output* @default true* @description to generate TypeScript type statement files
   */
  dts?: boolean | PluginOptions;
}

/**
 * Apply configuration options type
 */
type ApplicationOptions = ApplicationPluginOptions;

/**
 * Library Configuration Options Type
 */
type LibraryOptions = LibraryPluginOptions;

/**
 * Apply configuration defined function type * @description to define application build configuration
 */
type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  /** Apply Plugin Configuration */
  application?: ApplicationOptions;
  /** Vite Configuration */
  vite?: UserConfig;
}>;

/**
 * Library Configuration Defines Function Type * @description to define library build configuration
 */
type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
  /** Library Plugin Configuration */
  library?: LibraryOptions;
  /** Vite Configuration */
  vite?: UserConfig;
}>;

/**
 * Configure definition type * Configuration definition for @description application or library
 */
type DefineConfig = DefineApplicationOptions | DefineLibraryOptions;

export type {
  ApplicationPluginOptions,
  ArchiverPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  DefineApplicationOptions,
  DefineConfig,
  DefineLibraryOptions,
  IImportMap,
  ImportmapPluginOptions,
  LibraryPluginOptions,
  NitroMockPluginOptions,
  PrintPluginOptions,
};