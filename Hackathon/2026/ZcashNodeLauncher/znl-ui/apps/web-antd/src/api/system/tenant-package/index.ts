import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemTenantPackageApi {
  /** Tenant Suite Information */
  export interface TenantPackage {
    id: number;
    name: string;
    status: number;
    remark: string;
    creator: string;
    updater: string;
    updateTime: string;
    menuIds: number[];
    createTime: Date;
  }
}

/** Tenant Suite List */
export function getTenantPackagePage(params: PageParam) {
  return requestClient.get<PageResult<SystemTenantPackageApi.TenantPackage>>(
    '/system/tenant-package/page',
    { params },
  );
}

/** Ask for more information on the tenant package */
export function getTenantPackage(id: number) {
  return requestClient.get(`/system/tenant-package/get?id=${id}`);
}

/** New Tenant Suite */
export function createTenantPackage(
  data: SystemTenantPackageApi.TenantPackage,
) {
  return requestClient.post('/system/tenant-package/create', data);
}

/** Modify Tenant Suite */
export function updateTenantPackage(
  data: SystemTenantPackageApi.TenantPackage,
) {
  return requestClient.put('/system/tenant-package/update', data);
}

/** Remove Tenant Package */
export function deleteTenantPackage(id: number) {
  return requestClient.delete(`/system/tenant-package/delete?id=${id}`);
}

/** Batch Deleting Tenant Packages */
export function deleteTenantPackageList(ids: number[]) {
  return requestClient.delete(
    `/system/tenant-package/delete-list?ids=${ids.join(',')}`,
  );
}

/** List of streamlined information on acquiring tenant packages */
export function getTenantPackageList() {
  return requestClient.get<SystemTenantPackageApi.TenantPackage[]>(
    '/system/tenant-package/get-simple-list',
  );
}