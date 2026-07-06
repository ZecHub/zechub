import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemDictTypeApi {
  /** Dictionary Type */
  export type DictType = {
    createTime: Date;
    id?: number;
    name: string;
    remark: string;
    status: number;
    type: string;
  };
}

// Query Dictionary (Simplified) List
export function getSimpleDictTypeList() {
  return requestClient.get<SystemDictTypeApi.DictType[]>(
    '/system/dict-type/list-all-simple',
  );
}

// Query Dictionary List
export function getDictTypePage(params: PageParam) {
  return requestClient.get<PageResult<SystemDictTypeApi.DictType>>(
    '/system/dict-type/page',
    { params },
  );
}

// Query dictionary details
export function getDictType(id: number) {
  return requestClient.get<SystemDictTypeApi.DictType>(
    `/system/dict-type/get?id=${id}`,
  );
}

// New Dictionary
export function createDictType(data: SystemDictTypeApi.DictType) {
  return requestClient.post('/system/dict-type/create', data);
}

// Modify Dictionary
export function updateDictType(data: SystemDictTypeApi.DictType) {
  return requestClient.put('/system/dict-type/update', data);
}

// Remove Dictionary
export function deleteDictType(id: number) {
  return requestClient.delete(`/system/dict-type/delete?id=${id}`);
}

// Batch Remove Dictionary
export function deleteDictTypeList(ids: number[]) {
  return requestClient.delete(
    `/system/dict-type/delete-list?ids=${ids.join(',')}`,
  );
}

// Export Dictionary Type
export function exportDictType(params: any) {
  return requestClient.download('/system/dict-type/export-excel', { params });
}