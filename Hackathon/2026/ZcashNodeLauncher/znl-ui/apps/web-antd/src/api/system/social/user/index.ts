import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemSocialUserApi {
  /** Social User Information */
  export interface SocialUser {
    id?: number;
    type: number;
    openid: string;
    token: string;
    rawTokenInfo: string;
    nickname: string;
    avatar: string;
    rawUserInfo: string;
    code: string;
    state: string;
    createTime?: Date;
    updateTime?: Date;
  }

  /** Socially binding requests */
  export interface SocialUserBindReqVO {
    type: number;
    code: string;
    state: string;
  }

  /** Cancel the request for social binding. */
  export interface SocialUserUnbindReqVO {
    type: number;
    openid: string;
  }
}

/** Query social user list */
export function getSocialUserPage(params: PageParam) {
  return requestClient.get<PageResult<SystemSocialUserApi.SocialUser>>(
    '/system/social-user/page',
    { params },
  );
}

/** Query social user details */
export function getSocialUser(id: number) {
  return requestClient.get<SystemSocialUserApi.SocialUser>(
    `/system/social-user/get?id=${id}`,
  );
}

/** Social binding, use code */
export function socialBind(data: SystemSocialUserApi.SocialUserBindReqVO) {
  return requestClient.post<boolean>('/system/social-user/bind', data);
}

/** Untie the social tie. */
export function socialUnbind(data: SystemSocialUserApi.SocialUserUnbindReqVO) {
  return requestClient.delete<boolean>('/system/social-user/unbind', { data });
}

/** Get Bind Social User List */
export function getBindSocialUserList() {
  return requestClient.get<SystemSocialUserApi.SocialUser[]>(
    '/system/social-user/get-bind-list',
  );
}