import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemSocialClientApi {
  /** Social Client Information */
  export interface SocialClient {
    id?: number;
    name: string;
    socialType: number;
    userType: number;
    clientId: string;
    clientSecret: string;
    agentId?: string;
    status: number;
    createTime?: Date;
  }
}

/** Query social client list */
export function getSocialClientPage(params: PageParam) {
  return requestClient.get<PageResult<SystemSocialClientApi.SocialClient>>(
    '/system/social-client/page',
    { params },
  );
}

/** Query social client details */
export function getSocialClient(id: number) {
  return requestClient.get<SystemSocialClientApi.SocialClient>(
    `/system/social-client/get?id=${id}`,
  );
}

/** Add Social Client */
export function createSocialClient(data: SystemSocialClientApi.SocialClient) {
  return requestClient.post('/system/social-client/create', data);
}

/** Modify social client */
export function updateSocialClient(data: SystemSocialClientApi.SocialClient) {
  return requestClient.put('/system/social-client/update', data);
}

/** Remove Social Client */
export function deleteSocialClient(id: number) {
  return requestClient.delete(`/system/social-client/delete?id=${id}`);
}

/** Batch delete social client */
export function deleteSocialClientList(ids: number[]) {
  return requestClient.delete(
    `/system/social-client/delete-list?ids=${ids.join(',')}`,
  );
}