import type { AuthPermissionInfo } from '@vben/types';

import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** Login interface parameters */
  export interface LoginParams {
    password?: string;
    username?: string;
    captchaVerification?: string;
    // When binding social login, the following parameters need to be passed on
    socialType?: number;
    socialCode?: string;
    socialState?: string;
  }

  /** Login interface returns value */
  export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    userId: number;
    expiresTime: number;
  }

  /** Tenant Information Return Value */
  export interface TenantResult {
    id: number;
    name: string;
  }

  /** Cell phone authentication code acquisition interface parameters */
  export interface SmsCodeParams {
    mobile: string;
    scene: number;
  }

  /** Cell phone authentication code login interface parameters */
  export interface SmsLoginParams {
    mobile: string;
    code: string;
  }

  /** Registration interface parameters */
  export interface RegisterParams {
    username: string;
    password: string;
    captchaVerification: string;
  }

  /** Reset password interface parameters */
  export interface ResetPasswordParams {
    password: string;
    mobile: string;
    code: string;
  }

  /** Social fast-tracking interface parameters */
  export interface SocialLoginParams {
    type: number;
    code: string;
    state: string;
  }
}

/** Login */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/system/auth/login', data, {
    headers: {
      isEncrypt: false,
    },
  });
}

/** Refresh AccessToken */
export async function refreshTokenApi(refreshToken: string) {
  return baseRequestClient.post(
    `/system/auth/refresh-token?refreshToken=${refreshToken}`,
  );
}

/** Exit Login */
export async function logoutApi(accessToken: string) {
  return baseRequestClient.post(
    '/system/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

/** Can not open message */
export async function getAuthPermissionInfoApi() {
  return requestClient.get<AuthPermissionInfo>(
    '/system/auth/get-permission-info',
  );
}

/** Retrieve the tenant list */
export async function getTenantSimpleList() {
  return requestClient.get<AuthApi.TenantResult[]>(
    `/system/tenant/simple-list`,
  );
}

/** Use tenant domain names to obtain tenant information */
export async function getTenantByWebsite(website: string) {
  return requestClient.get<AuthApi.TenantResult>(
    `/system/tenant/get-by-website?website=${website}`,
  );
}

/** Get the authentication code */
export async function getCaptcha(data: any) {
  return baseRequestClient.post('/system/captcha/get', data);
}

/** Verify Authentication Code */
export async function checkCaptcha(data: any) {
  return baseRequestClient.post('/system/captcha/check', data);
}

/** Get Login Authentication */
export async function sendSmsCode(data: AuthApi.SmsCodeParams) {
  return requestClient.post('/system/auth/send-sms-code', data);
}

/** SMS Authentication Login */
export async function smsLogin(data: AuthApi.SmsLoginParams) {
  return requestClient.post('/system/auth/sms-login', data);
}

/** Registration */
export async function register(data: AuthApi.RegisterParams) {
  return requestClient.post('/system/auth/register', data);
}

/** Reset passwords by text */
export async function smsResetPassword(data: AuthApi.ResetPasswordParams) {
  return requestClient.post('/system/auth/reset-password', data);
}

/** Socially authorized jump */
export async function socialAuthRedirect(type: number, redirectUri: string) {
  return requestClient.get('/system/auth/social-auth-redirect', {
    params: {
      type,
      redirectUri,
    },
  });
}

/** Social Shortcut Login */
export async function socialLogin(data: AuthApi.SocialLoginParams) {
  return requestClient.post<AuthApi.LoginResult>(
    '/system/auth/social-login',
    data,
  );
}