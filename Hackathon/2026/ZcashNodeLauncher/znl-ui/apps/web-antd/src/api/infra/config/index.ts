import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraConfigApi {
  /** Parameter Configuration Information */
  export interface Config {
    id?: number;
    category: string;
    name: string;
    key: string;
    value: string;
    type: number;
    visible: boolean;
    remark: string;
    createTime?: Date;
  }
}

/** Query Parameter List */
export function getConfigPage(params: PageParam) {
  return requestClient.get<PageResult<InfraConfigApi.Config>>(
    '/infra/config/page',
    {
      params,
    },
  );
}

/** Query Parameter Details */
export function getConfig(id: number) {
  return requestClient.get<InfraConfigApi.Config>(`/infra/config/get?id=${id}`);
}

/** Query parameter values by parameter keyname */
export function getConfigKey(configKey: string) {
  return requestClient.get<string>(
    `/infra/config/get-value-by-key?key=${configKey}`,
  );
}

/** Add Parameter */
export function createConfig(data: InfraConfigApi.Config) {
  return requestClient.post('/infra/config/create', data);
}

/** Modify Parameters */
export function updateConfig(data: InfraConfigApi.Config) {
  return requestClient.put('/infra/config/update', data);
}

/** Remove Parameter */
export function deleteConfig(id: number) {
  return requestClient.delete(`/infra/config/delete?id=${id}`);
}

/** Batch Remove Arguments */
export function deleteConfigList(ids: number[]) {
  return requestClient.delete(`/infra/config/delete-list?ids=${ids.join(',')}`);
}

/** Export Parameters */
export function exportConfig(params: any) {
  return requestClient.download('/infra/config/export-excel', {
    params,
  });
}