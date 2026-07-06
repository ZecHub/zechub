import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemMailTemplateApi {
  /** Email */
  export interface MailTemplate {
    id: number;
    name: string;
    code: string;
    accountId: number;
    nickname: string;
    title: string;
    content: string;
    params: string[];
    status: number;
    remark: string;
    createTime: Date;
  }

  /** Can not open message */
  export interface MailSendReqVO {
    toMails: string[];
    ccMails?: string[];
    bccMails?: string[];
    templateCode: string;
    templateParams: Record<string, any>;
  }
}

/** Query Mail Template List */
export function getMailTemplatePage(params: PageParam) {
  return requestClient.get<PageResult<SystemMailTemplateApi.MailTemplate>>(
    '/system/mail-template/page',
    { params },
  );
}

/** Can not open message */
export function getMailTemplate(id: number) {
  return requestClient.get<SystemMailTemplateApi.MailTemplate>(
    `/system/mail-template/get?id=${id}`,
  );
}

/** New Mail Template */
export function createMailTemplate(data: SystemMailTemplateApi.MailTemplate) {
  return requestClient.post('/system/mail-template/create', data);
}

/** Modify Mail Template */
export function updateMailTemplate(data: SystemMailTemplateApi.MailTemplate) {
  return requestClient.put('/system/mail-template/update', data);
}

/** Delete Mail Template */
export function deleteMailTemplate(id: number) {
  return requestClient.delete(`/system/mail-template/delete?id=${id}`);
}

/** Batch delete mail template */
export function deleteMailTemplateList(ids: number[]) {
  return requestClient.delete(
    `/system/mail-template/delete-list?ids=${ids.join(',')}`,
  );
}

/** Can not open message */
export function sendMail(data: SystemMailTemplateApi.MailSendReqVO) {
  return requestClient.post('/system/mail-template/send-mail', data);
}
