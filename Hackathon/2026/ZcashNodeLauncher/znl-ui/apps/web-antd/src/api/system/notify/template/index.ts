import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemNotifyTemplateApi {
  /** Email */
  export interface NotifyTemplate {
    id?: number;
    name: string;
    nickname: string;
    code: string;
    content: string;
    type?: number;
    params: string[];
    status: number;
    remark: string;
  }

  /** Send Post Request */
  export interface NotifySendReqVO {
    userId: number;
    userType: number;
    templateCode: string;
    templateParams: Record<string, any>;
  }
}

/** Email */
export function getNotifyTemplatePage(params: PageParam) {
  return requestClient.get<PageResult<SystemNotifyTemplateApi.NotifyTemplate>>(
    '/system/notify-template/page',
    { params },
  );
}

/** Details of the message template in the query */
export function getNotifyTemplate(id: number) {
  return requestClient.get<SystemNotifyTemplateApi.NotifyTemplate>(
    `/system/notify-template/get?id=${id}`,
  );
}

/** Add Site Message Template */
export function createNotifyTemplate(
  data: SystemNotifyTemplateApi.NotifyTemplate,
) {
  return requestClient.post('/system/notify-template/create', data);
}

/** Modify site mail template */
export function updateNotifyTemplate(
  data: SystemNotifyTemplateApi.NotifyTemplate,
) {
  return requestClient.put('/system/notify-template/update', data);
}

/** Remove Site Message Template */
export function deleteNotifyTemplate(id: number) {
  return requestClient.delete(`/system/notify-template/delete?id=${id}`);
}

/** Batch Deleting Site Message Template */
export function deleteNotifyTemplateList(ids: number[]) {
  return requestClient.delete(
    `/system/notify-template/delete-list?ids=${ids.join(',')}`,
  );
}

/** Export site email template */
export function exportNotifyTemplate(params: any) {
  return requestClient.download('/system/notify-template/export-excel', {
    params,
  });
}

/** Send Terminal Message */
export function sendNotify(data: SystemNotifyTemplateApi.NotifySendReqVO) {
  return requestClient.post('/system/notify-template/send-notify', data);
}
