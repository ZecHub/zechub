import type {
  ApplicationConfig,
  VbenAdminProAppConfigRaw,
} from '@vben/types/global';

/**
 * Global configuration by vite-inject-app-config
 */
export function useAppConfig(
  env: Record<string, any>,
  isProduction: boolean,
): ApplicationConfig {
  // Direct use of global variables in production environment, Windows._VBEN_ADMIN_PRO_APP_CONF_
  const config = isProduction
    ? window._VBEN_ADMIN_PRO_APP_CONF_
    : (env as VbenAdminProAppConfigRaw);

  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_AUTH_DINGDING_CORP_ID,
    VITE_GLOB_AUTH_DINGDING_CLIENT_ID,
  } = config;

  const applicationConfig: ApplicationConfig = {
    apiURL: VITE_GLOB_API_URL,
    auth: {},
  };
  if (VITE_GLOB_AUTH_DINGDING_CORP_ID && VITE_GLOB_AUTH_DINGDING_CLIENT_ID) {
    applicationConfig.auth.dingding = {
      clientId: VITE_GLOB_AUTH_DINGDING_CLIENT_ID,
      corpId: VITE_GLOB_AUTH_DINGDING_CORP_ID,
    };
  }

  return applicationConfig;
}

export function isTenantEnable(): boolean {
  return import.meta.env.VITE_APP_TENANT_ENABLE === 'true';
}

export function isTenantSwitchVisible(): boolean {
  return import.meta.env.VITE_APP_TENANT_SWITCH_VISIBLE === 'true';
}

export function isCaptchaEnable(): boolean {
  return import.meta.env.VITE_APP_CAPTCHA_ENABLE === 'true';
}

export function isDocAlertEnable(): boolean {
  return import.meta.env.VITE_APP_DOCALERT_ENABLE !== 'false';
}