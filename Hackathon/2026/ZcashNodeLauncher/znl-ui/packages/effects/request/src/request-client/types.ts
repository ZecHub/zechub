import type {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

type ExtendOptions<T = any> = {
  /**
   * Parameters are sequenced. Preset is
   * - brackets: ids[]=1&ids[]=2&ids[]=3
   * - comma: ids=1,2,3
   * - indices: ids[0]=1&ids[1]=2&ids[2]=3
   * - repeat: ids=1&ids=2&ids=3
   */
  paramsSerializer?:
    | 'brackets'
    | 'comma'
    | 'indices'
    | 'repeat'
    | AxiosRequestConfig<T>['paramsSerializer'];
  /**
   * * - raw: The original AxiosResponse, including headers, status, etc., does not check whether the request is successful. * - body: returns the BODY part of the response data (only on the basis of the status check whether the request is successful and ignores the judgement on code, in which case the caller should check whether the request is successful). * - Data: deconstructs the response BODY data and only returns the data of the Data node (which will check whether the status and code are successful).
   */
  responseReturn?: 'body' | 'data' | 'raw';
};
type RequestClientConfig<T = any> = AxiosRequestConfig<T> & ExtendOptions<T>;

type RequestResponse<T = any> = AxiosResponse<T> & {
  config: RequestClientConfig<T>;
};

type RequestContentType =
  | 'application/json;charset=utf-8'
  | 'application/octet-stream;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=utf-8'
  | 'multipart/form-data;charset=utf-8';

type RequestClientOptions = CreateAxiosDefaults & ExtendOptions;

/**
 * SSE Request Options
 */
interface SseRequestOptions extends RequestInit {
  onMessage?: (message: string) => void;
  onEnd?: () => void;
}

interface RequestInterceptorConfig {
  fulfilled?: (
    config: ExtendOptions & InternalAxiosRequestConfig,
  ) =>
    | (ExtendOptions & InternalAxiosRequestConfig<any>)
    | Promise<ExtendOptions & InternalAxiosRequestConfig<any>>;
  rejected?: (error: any) => any;
}

interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: RequestResponse<T>,
  ) => Promise<RequestResponse> | RequestResponse;
  rejected?: (error: any) => any;
}

type MakeErrorMessageFn = (message: string, error: any) => void;

interface HttpResponse<T = any> {
  /**
   * *0 means success, others means failure
   */
  code: number;
  data: T;
  msg: string;
}

interface PageParam {
  [key: string]: any;
  pageNo: number;
  pageSize: number;
}

interface PageResult<T> {
  list: T[];
  total: number;
}

export type {
  HttpResponse,
  MakeErrorMessageFn,
  PageParam,
  PageResult,
  RequestClientConfig,
  RequestClientOptions,
  RequestContentType,
  RequestInterceptorConfig,
  RequestResponse,
  ResponseInterceptorConfig,
  SseRequestOptions,
};