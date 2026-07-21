import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemTenantApi {
  /** Tenant Information */
  export interface Tenant {
    id?: number;
    name: string;
    packageId: number;
    contactName: string;
    contactMobile: string;
    accountCount: number;
    expireTime: Date;
    websites: string[];
    status: number;
  }
}

/** Tenant List */
export function getTenantPage(params: PageParam) {
  return requestClient.get<PageResult<SystemTenantApi.Tenant>>(
    '/system/tenant/page',
    { params },
  );
}

/** Get a tenant's list of streamlined information */
export function getSimpleTenantList() {
  return requestClient.get<SystemTenantApi.Tenant[]>(
    '/system/tenant/simple-list',
  );
}

/**  */
export function getTenant(id: number) {
  return requestClient.get<SystemTenantApi.Tenant>(
    `/system/tenant/get?id=${id}`,
  );
}

/** Get a tenant's list of streamlined information */
export function getTenantList() {
  return requestClient.get<SystemTenantApi.Tenant[]>(
    '/system/tenant/simple-list',
  );
}

/** New Tenant */
export function createTenant(data: SystemTenantApi.Tenant) {
  return requestClient.post('/system/tenant/create', data);
}

/** Modify Tenant */
export function updateTenant(data: SystemTenantApi.Tenant) {
  return requestClient.put('/system/tenant/update', data);
}

/** Remove Tenant */
export function deleteTenant(id: number) {
  return requestClient.delete(`/system/tenant/delete?id=${id}`);
}

/** Batch Remove Tenant */
export function deleteTenantList(ids: number[]) {
  return requestClient.delete(
    `/system/tenant/delete-list?ids=${ids.join(',')}`,
  );
}

/** Releasing Retrieves */
export function exportTenant(params: any) {
  return requestClient.download('/system/tenant/export-excel', {
    params,
  });
}
