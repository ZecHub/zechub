import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemNoticeApi {
  /** Announced information */
  export interface Notice {
    id?: number;
    title: string;
    type: number;
    content: string;
    status: number;
    remark: string;
    creator?: string;
    createTime?: Date;
  }
}

/** Query Bulletin List */
export function getNoticePage(params: PageParam) {
  return requestClient.get<PageResult<SystemNoticeApi.Notice>>(
    '/system/notice/page',
    { params },
  );
}

/** Query details of the bulletin */
export function getNotice(id: number) {
  return requestClient.get<SystemNoticeApi.Notice>(
    `/system/notice/get?id=${id}`,
  );
}

/** New Bulletin */
export function createNotice(data: SystemNoticeApi.Notice) {
  return requestClient.post('/system/notice/create', data);
}

/** Revision of the bulletin */
export function updateNotice(data: SystemNoticeApi.Notice) {
  return requestClient.put('/system/notice/update', data);
}

/** Delete the bulletin */
export function deleteNotice(id: number) {
  return requestClient.delete(`/system/notice/delete?id=${id}`);
}

/** Batch delete bulletin */
export function deleteNoticeList(ids: number[]) {
  return requestClient.delete(
    `/system/notice/delete-list?ids=${ids.join(',')}`,
  );
}

/** Put out the announcement. */
export function pushNotice(id: number) {
  return requestClient.post(`/system/notice/push?id=${id}`);
}