import type { RequestClient } from '../request-client';
import type { RequestClientConfig } from '../types';

type DownloadRequestConfig = {
  /**
   * Define the type of data to be obtained. * Row: original AxiosResponse, including headers, status, etc. * body: only the BODY part of the response data (Blob)
   */
  responseReturn?: 'body' | 'raw';
} & Omit<RequestClientConfig, 'responseReturn'>;

class FileDownloader {
  private client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }
  /**
   * Download the full link to * @paramurl files * @paramconfig configuration, optional. * @returns returns Blob (default) if config. responseReturn is 'body', otherwise returns RequestResponse<Blob>
   */
  public async download<T = Blob>(
    url: string,
    config?: DownloadRequestConfig,
  ): Promise<T> {
    const finalConfig: DownloadRequestConfig = {
      responseReturn: 'body',
      ...config,
      responseType: 'blob',
    };

    const response = await this.client.get<T>(url, finalConfig);

    return response;
  }
}

export { FileDownloader };