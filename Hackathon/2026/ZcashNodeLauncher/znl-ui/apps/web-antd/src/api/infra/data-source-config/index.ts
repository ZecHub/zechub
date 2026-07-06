import { requestClient } from '#/api/request';

export namespace InfraDataSourceConfigApi {
  /** Data Source Configuration Information */
  export interface DataSourceConfig {
    id?: number;
    name: string;
    url: string;
    username: string;
    password: string;
    createTime?: Date;
  }
}

/** Query data source configuration list */
export function getDataSourceConfigList() {
  return requestClient.get<InfraDataSourceConfigApi.DataSourceConfig[]>(
    '/infra/data-source-config/list',
  );
}

/** Query data source configuration details */
export function getDataSourceConfig(id: number) {
  return requestClient.get<InfraDataSourceConfigApi.DataSourceConfig>(
    `/infra/data-source-config/get?id=${id}`,
  );
}

/** New Data Source Configuration */
export function createDataSourceConfig(
  data: InfraDataSourceConfigApi.DataSourceConfig,
) {
  return requestClient.post('/infra/data-source-config/create', data);
}

/** Modify Data Source Configuration */
export function updateDataSourceConfig(
  data: InfraDataSourceConfigApi.DataSourceConfig,
) {
  return requestClient.put('/infra/data-source-config/update', data);
}

/** Remove Data Source Configuration */
export function deleteDataSourceConfig(id: number) {
  return requestClient.delete(`/infra/data-source-config/delete?id=${id}`);
}

/** Batch delete data source configuration */
export function deleteDataSourceConfigList(ids: number[]) {
  return requestClient.delete(
    `/infra/data-source-config/delete-list?ids=${ids.join(',')}`,
  );
}