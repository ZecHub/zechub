import type { AxiosInstance, AxiosResponse } from 'axios';

import type { RequestClientConfig, RequestClientOptions } from './types';

import { bindMethods, isString, merge } from '@vben/utils';

import axios from 'axios';
import qs from 'qs';

import { FileDownloader } from './modules/downloader';
import { InterceptorManager } from './modules/interceptor';
import { SSE } from './modules/sse';
import { FileUploader } from './modules/uploader';

function getParamsSerializer(
  paramsSerializer: RequestClientOptions['paramsSerializer'],
) {
  if (isString(paramsSerializer)) {
    switch (paramsSerializer) {
      case 'brackets': {
        return (params: any) =>
          qs.stringify(params, { arrayFormat: 'brackets' });
      }
      case 'comma': {
        return (params: any) => qs.stringify(params, { arrayFormat: 'comma' });
      }
      case 'indices': {
        return (params: any) =>
          qs.stringify(params, { arrayFormat: 'indices' });
      }
      case 'repeat': {
        return (params: any) => qs.stringify(params, { arrayFormat: 'repeat' });
      }
    }
  }
  return paramsSerializer;
}

class RequestClient {
  public addRequestInterceptor: InterceptorManager['addRequestInterceptor'];

  public addResponseInterceptor: InterceptorManager['addResponseInterceptor'];
  public download: FileDownloader['download'];

  public readonly instance: AxiosInstance;
  // Whether token is being refreshed
  public isRefreshing = false;
  public postSSE: SSE['postSSE'];
  // Refresh Token Queue
  public refreshTokenQueue: ((token: string) => void)[] = [];
  public requestSSE: SSE['requestSSE'];
  public upload: FileUploader['upload'];

  /**
   * Construct function to create the Axios instance * @param options - Axios requested configuration, optional
   */
  constructor(options: RequestClientOptions = {}) {
    // Merge default and incoming configurations
    const defaultConfig: RequestClientOptions = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      responseReturn: 'raw',
      // Default timeout
      // timeout: 10_000,
      paramsSerializer: 'repeat',
    };
    const { ...axiosConfig } = options;
    const requestConfig = merge(axiosConfig, defaultConfig);
    requestConfig.paramsSerializer = getParamsSerializer(
      requestConfig.paramsSerializer,
    );
    this.instance = axios.create(requestConfig);

    bindMethods(this);

    // Example Interceptor Manager
    const interceptorManager = new InterceptorManager(this.instance);
    this.addRequestInterceptor =
      interceptorManager.addRequestInterceptor.bind(interceptorManager);
    this.addResponseInterceptor =
      interceptorManager.addResponseInterceptor.bind(interceptorManager);

    // Example File Uploader
    const fileUploader = new FileUploader(this);
    this.upload = fileUploader.upload.bind(fileUploader);
    // Example File Downloader
    const fileDownloader = new FileDownloader(this);
    this.download = fileDownloader.download.bind(fileDownloader);
    // Example SSE Module
    const sse = new SSE(this);
    this.postSSE = sse.postSSE.bind(sse);
    this.requestSSE = sse.requestSSE.bind(sse);
  }

  /**
   * DELETE Request Method
   */
  public delete<T = any>(
    url: string,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  /**
   * GET Request Method
   */
  public get<T = any>(url: string, config?: RequestClientConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * Get Basic URL
   */
  public getBaseUrl() {
    return this.instance.defaults.baseURL;
  }

  /**
   * POST Request Method
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'POST' });
  }

  /**
   * PUT Request Method
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'PUT' });
  }

  /**
   * Common approach to requests
   */
  public async request<T>(
    url: string,
    config: RequestClientConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
        ...(config.paramsSerializer
          ? { paramsSerializer: getParamsSerializer(config.paramsSerializer) }
          : {}),
      });
      return response as T;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  }
}

/**
 * Build Sort Fields, Process vxe Sorting Conditions
 */
export const buildSortingField = (sorts: any[]) => {
  if (!sorts || sorts.length === 0) {
    return {};
  }
  const result: Record<string, any> = {};
  sorts.forEach((sort: any, index: number) => {
    result[`sortingFields[${index}].field`] = sort.field;
    result[`sortingFields[${index}].order`] = sort.order;
  });
  return result;
};

export { RequestClient };
