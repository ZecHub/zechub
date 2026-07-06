import type { PageParam, PageResult } from '@vben/request';
import type { Dayjs } from 'dayjs';

import { requestClient } from '#/api/request';

export namespace ZcashInstallationScriptApi {
  /** Installation script Information */
  export interface InstallationScript {
    id: number; // ID
    name?: string; // Name
    url?: string; // url
    sort?: number; // Show Order
    remark: string; // Remarks
  }
}

/** Query Installation script Pagination */
export function getInstallationScriptPage(params: PageParam) {
  return requestClient.get<PageResult<ZcashInstallationScriptApi.InstallationScript>>(
    '/zcash/installation-script/page',
    { params },
  );
}

/** Query Installation script Details */
export function getInstallationScript(id: number) {
  return requestClient.get<ZcashInstallationScriptApi.InstallationScript>(
    `/zcash/installation-script/get?id=${id}`,
  );
}

/** Create Installation script */
export function createInstallationScript(data: ZcashInstallationScriptApi.InstallationScript) {
  return requestClient.post('/zcash/installation-script/create', data);
}

/** Update Installation script */
export function updateInstallationScript(data: ZcashInstallationScriptApi.InstallationScript) {
  return requestClient.put('/zcash/installation-script/update', data);
}

/** Delete Installation script */
export function deleteInstallationScript(id: number) {
  return requestClient.delete(`/zcash/installation-script/delete?id=${id}`);
}

/** Batch Delete Installation script */
export function deleteInstallationScriptList(ids: number[]) {
  return requestClient.delete(
    `/zcash/installation-script/delete-list?ids=${ids.join(',')}`,
  );
}

/** Export Installation script */
export function exportInstallationScript(params: any) {
  return requestClient.download('/zcash/installation-script/export-excel', { params });
}
