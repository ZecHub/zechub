import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemNotifyMessageApi {
  /** Can not open message */
  export interface NotifyMessage {
    id: number;
    userId: number;
    userType: number;
    templateId: number;
    templateCode: string;
    templateNickname: string;
    templateContent: string;
    templateType: number;
    templateParams: string;
    readStatus: boolean;
    readTime: Date;
    createTime: Date;
  }
}

/** Email */
export function getNotifyMessagePage(params: PageParam) {
  return requestClient.get<PageResult<SystemNotifyMessageApi.NotifyMessage>>(
    '/system/notify-message/page',
    { params },
  );
}

/** Get my station mail tabs. */
export function getMyNotifyMessagePage(params: PageParam) {
  return requestClient.get<PageResult<SystemNotifyMessageApi.NotifyMessage>>(
    '/system/notify-message/my-page',
    { params },
  );
}

/** Batch tag read */
export function updateNotifyMessageRead(ids: number[]) {
  return requestClient.put(
    '/system/notify-message/update-read',
    {},
    {
      params: { ids },
    },
  );
}

/** Mark all station emails as read */
export function updateAllNotifyMessageRead() {
  return requestClient.put('/system/notify-message/update-all-read');
}

/** Retrieve the current user's latest site message list */
export function getUnreadNotifyMessageList() {
  return requestClient.get<SystemNotifyMessageApi.NotifyMessage[]>(
    '/system/notify-message/get-unread-list',
  );
}

/** Can not append message to mh folder: %s: %s */
export function getUnreadNotifyMessageCount() {
  return requestClient.get<number>('/system/notify-message/get-unread-count');
}
