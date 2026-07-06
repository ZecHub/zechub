import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemDictDataApi {
  /** Dictionary Data */
  export type DictData = {
    colorType: string;
    createTime: Date;
    cssClass: string;
    dictType: string;
    id?: number;
    label: string;
    remark: string;
    sort?: number;
    status: number;
    value: string;
  };
}

// Query Dictionary Data (Simplified) List
export function getSimpleDictDataList() {
  return requestClient.get<SystemDictDataApi.DictData[]>(
    '/system/dict-data/simple-list',
  );
}

// Query Dictionary Data List
export function getDictDataPage(params: PageParam) {
  return requestClient.get<PageResult<SystemDictDataApi.DictData>>(
    '/system/dict-data/page',
    { params },
  );
}

// Query dictionary data details
export function getDictData(id: number) {
  return requestClient.get<SystemDictDataApi.DictData>(
    `/system/dict-data/get?id=${id}`,
  );
}

// Add Dictionary Data
export function createDictData(data: SystemDictDataApi.DictData) {
  return requestClient.post('/system/dict-data/create', data);
}

// Modify Dictionary Data
export function updateDictData(data: SystemDictDataApi.DictData) {
  return requestClient.put('/system/dict-data/update', data);
}

// Remove Dictionary Data
export function deleteDictData(id: number) {
  return requestClient.delete(`/system/dict-data/delete?id=${id}`);
}

// Batch Delete Dictionary Data
export function deleteDictDataList(ids: number[]) {
  return requestClient.delete(
    `/system/dict-data/delete-list?ids=${ids.join(',')}`,
  );
}

// Export Dictionary Type Data
export function exportDictData(params: any) {
  return requestClient.download('/system/dict-data/export-excel', { params });
}