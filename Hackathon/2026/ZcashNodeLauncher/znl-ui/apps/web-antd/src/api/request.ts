/**
 * The document is self-adjusted according to business logic
 */
import type { RequestClientOptions } from '@vben/request';

import { isTenantEnable, useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  defaultResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';
import { createApiEncrypt } from '@vben/utils';

import { message } from 'ant-design-vue';

import { useAuthStore } from '#/store';

import { refreshTokenApi } from './core';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
const tenantEnable = isTenantEnable();
const apiEncrypt = createApiEncrypt(import.meta.env);

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
  });

  /**
   * Revalidate Logic
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * Refresh Token Logic
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const refreshToken = accessStore.refreshToken as string;
    if (!refreshToken) {
      throw new Error('Refresh token is null!');
    }
    const resp = await refreshTokenApi(refreshToken);
    const newToken = resp?.data?.data?.accessToken;
    if (!newToken) {
      throw resp.data;
    }
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // The request is processed.
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      // Add Tenant Number
      config.headers['tenant-id'] = tenantEnable
        ? accessStore.tenantId
        : undefined;
      // Email
      config.headers['visit-tenant-id'] = tenantEnable
        ? accessStore.visitTenantId
        : undefined;

      // Whether API encryption
      if ((config.headers || {}).isEncrypt) {
        try {
          // Encryption Request Data
          if (config.data) {
            config.data = apiEncrypt.encryptRequest(config.data);
            // Set Encryption ID header
            config.headers[apiEncrypt.getEncryptHeader()] = 'true';
          }
        } catch (error) {
          console.error('error', error);
          throw error;
        }
      }
      return config;
    },
  });

  // API Decrypt Response Interceptor
  client.addResponseInterceptor({
    fulfilled: (response) => {
      // Check whether decryption response data is required
      const encryptHeader = apiEncrypt.getEncryptHeader();
      const isEncryptResponse =
        response.headers[encryptHeader] === 'true' ||
        response.headers[encryptHeader.toLowerCase()] === 'true';
      if (isEncryptResponse && typeof response.data === 'string') {
        try {
          // Decrypt Response Data
          response.data = apiEncrypt.decryptResponse(response.data);
        } catch (error) {
          console.error('Error', error);
          throw new Error(
            `Response data decryption failed: ${(error as Error).message}`,
          );
        }
      }
      return response;
    },
  });

  // Respond Data Format to Process Returns
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: 'code',
      dataField: 'data',
      successCode: 0,
    }),
  );

  // Expired token processing
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // Universal bug processing. If you don't get into the error processing logic, you get in here.
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // This can be customised according to business, and you can customize the information in error and make different tips based on different code instead of directly using message.error hints msg
      // The error field returned by the current mok interface is error or message
      const responseData = error?.response?.data ?? {};
      const errorMessage =
        responseData?.error ?? responseData?.message ?? responseData.msg ?? '';
      if (error?.data?.code === 401) {
        return;
      }
      // If no error information is found, the hint is based on the status code.
      message.error(errorMessage || msg);
    }),
  );

  return client;
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
baseRequestClient.addRequestInterceptor({
  fulfilled: (config) => {
    const accessStore = useAccessStore();
    // Add Tenant Number
    config.headers['tenant-id'] = tenantEnable
      ? accessStore.tenantId
      : undefined;
    // Email
    config.headers['visit-tenant-id'] = tenantEnable
      ? accessStore.visitTenantId
      : undefined;
    return config;
  },
});
