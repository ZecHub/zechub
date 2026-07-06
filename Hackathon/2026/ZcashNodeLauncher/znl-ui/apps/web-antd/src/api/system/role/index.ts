import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemRoleApi {
  /** Role Information */
  export interface Role {
    id?: number;
    name: string;
    code: string;
    sort: number;
    status: number;
    type: number;
    dataScope: number;
    dataScopeDeptIds: number[];
    createTime?: Date;
  }
}

/** Query Role List */
export function getRolePage(params: PageParam) {
  return requestClient.get<PageResult<SystemRoleApi.Role>>(
    '/system/role/page',
    { params },
  );
}

/** Query Roles (Simplification) List */
export function getSimpleRoleList() {
  return requestClient.get<SystemRoleApi.Role[]>('/system/role/simple-list');
}

/** Query role details */
export function getRole(id: number) {
  return requestClient.get<SystemRoleApi.Role>(`/system/role/get?id=${id}`);
}

/** Add Role */
export function createRole(data: SystemRoleApi.Role) {
  return requestClient.post('/system/role/create', data);
}

/** Modify Role */
export function updateRole(data: SystemRoleApi.Role) {
  return requestClient.put('/system/role/update', data);
}

/** Remove Role */
export function deleteRole(id: number) {
  return requestClient.delete(`/system/role/delete?id=${id}`);
}

/** Batch Delete Roles */
export function deleteRoleList(ids: number[]) {
  return requestClient.delete(`/system/role/delete-list?ids=${ids.join(',')}`);
}

/** Export role */
export function exportRole(params: any) {
  return requestClient.download('/system/role/export-excel', {
    params,
  });
}