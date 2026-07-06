import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraFileConfigApi {
  /** File Client Configuration */
  export interface FileClientConfig {
    basePath: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    mode?: string;
    endpoint?: string;
    bucket?: string;
    accessKey?: string;
    accessSecret?: string;
    pathStyle?: boolean;
    enablePublicAccess?: boolean;
    domain: string;
  }

  /** File Profile Information */
  export interface FileConfig {
    id?: number;
    name: string;
    storage?: number;
    master: boolean;
    visible: boolean;
    config: FileClientConfig;
    remark: string;
    createTime?: Date;
  }
}

/** Query File Configuration List */
export function getFileConfigPage(params: PageParam) {
  return requestClient.get<PageResult<InfraFileConfigApi.FileConfig>>(
    '/infra/file-config/page',
    {
      params,
    },
  );
}

/** Query File Profile Details */
export function getFileConfig(id: number) {
  return requestClient.get<InfraFileConfigApi.FileConfig>(
    `/infra/file-config/get?id=${id}`,
  );
}

/** Update File Configuration as Main */
export function updateFileConfigMaster(id: number) {
  return requestClient.put(`/infra/file-config/update-master?id=${id}`);
}

/** New File Configuration */
export function createFileConfig(data: InfraFileConfigApi.FileConfig) {
  return requestClient.post('/infra/file-config/create', data);
}

/** Modify File Configuration */
export function updateFileConfig(data: InfraFileConfigApi.FileConfig) {
  return requestClient.put('/infra/file-config/update', data);
}

/** Remove File Profile */
export function deleteFileConfig(id: number) {
  return requestClient.delete(`/infra/file-config/delete?id=${id}`);
}

/** Batch Delete File Configuration */
export function deleteFileConfigList(ids: number[]) {
  return requestClient.delete(
    `/infra/file-config/delete-list?ids=${ids.join(',')}`,
  );
}

/** Test File Configuration */
export function testFileConfig(id: number) {
  return requestClient.get(`/infra/file-config/test?id=${id}`);
}