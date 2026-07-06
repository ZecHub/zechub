import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemOAuth2TokenApi {
  /** OAuth 2.0 token information */
  export interface OAuth2Token {
    id?: number;
    accessToken: string;
    refreshToken: string;
    userId: number;
    userType: number;
    clientId: string;
    createTime?: Date;
    expiresTime?: Date;
  }
}

/** Query OAuth 2.0 List of Decorations */
export function getOAuth2TokenPage(params: PageParam) {
  return requestClient.get<PageResult<SystemOAuth2TokenApi.OAuth2Token>>(
    '/system/oauth2-token/page',
    {
      params,
    },
  );
}

/** Remove OAuth 2.0 Decorator */
export function deleteOAuth2Token(accessToken: string) {
  return requestClient.delete(
    `/system/oauth2-token/delete?accessToken=${accessToken}`,
  );
}