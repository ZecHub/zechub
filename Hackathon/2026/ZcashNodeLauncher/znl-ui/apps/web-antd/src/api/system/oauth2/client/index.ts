import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemOAuth2ClientApi {
  /** OAuth 2.0 Client Information */
  export interface OAuth2Client {
    id?: number;
    clientId: string;
    secret: string;
    name: string;
    logo: string;
    description: string;
    status: number;
    accessTokenValiditySeconds: number;
    refreshTokenValiditySeconds: number;
    redirectUris: string[];
    autoApprove: boolean;
    authorizedGrantTypes: string[];
    scopes: string[];
    authorities: string[];
    resourceIds: string[];
    additionalInformation: string;
    isAdditionalInformationJson: boolean;
    createTime?: Date;
  }
}

/** Query OAuth 2.0 client list */
export function getOAuth2ClientPage(params: PageParam) {
  return requestClient.get<PageResult<SystemOAuth2ClientApi.OAuth2Client>>(
    '/system/oauth2-client/page',
    { params },
  );
}

/** Query OAuth 2.0 client details */
export function getOAuth2Client(id: number) {
  return requestClient.get<SystemOAuth2ClientApi.OAuth2Client>(
    `/system/oauth2-client/get?id=${id}`,
  );
}

/** New OAuth 2.0 client */
export function createOAuth2Client(data: SystemOAuth2ClientApi.OAuth2Client) {
  return requestClient.post('/system/oauth2-client/create', data);
}

/** Modify OAuth 2.0 Client */
export function updateOAuth2Client(data: SystemOAuth2ClientApi.OAuth2Client) {
  return requestClient.put('/system/oauth2-client/update', data);
}

/** Remove OAuth 2.0 Client */
export function deleteOAuth2Client(id: number) {
  return requestClient.delete(`/system/oauth2-client/delete?id=${id}`);
}

/** Batch delete OAuth 2.0 client */
export function deleteOAuth2ClientList(ids: number[]) {
  return requestClient.delete(
    `/system/oauth2-client/delete-list?ids=${ids.join(',')}`,
  );
}