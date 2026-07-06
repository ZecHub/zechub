import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemSmsTemplateApi {
  /** Text template information */
  export interface SmsTemplate {
    id?: number;
    type?: number;
    status: number;
    code: string;
    name: string;
    content: string;
    remark: string;
    apiTemplateId: string;
    channelId?: number;
    channelCode?: string;
    params?: string[];
    createTime?: Date;
  }

  /** Send SMS Request */
  export interface SmsSendReqVO {
    mobile: string;
    templateCode: string;
    templateParams: Record<string, any>;
  }
}

/** Query SMS Templates List */
export function getSmsTemplatePage(params: PageParam) {
  return requestClient.get<PageResult<SystemSmsTemplateApi.SmsTemplate>>(
    '/system/sms-template/page',
    { params },
  );
}

/** Query SMS Template Details */
export function getSmsTemplate(id: number) {
  return requestClient.get<SystemSmsTemplateApi.SmsTemplate>(
    `/system/sms-template/get?id=${id}`,
  );
}

/** New Text Template */
export function createSmsTemplate(data: SystemSmsTemplateApi.SmsTemplate) {
  return requestClient.post('/system/sms-template/create', data);
}

/** Modify SMS Template */
export function updateSmsTemplate(data: SystemSmsTemplateApi.SmsTemplate) {
  return requestClient.put('/system/sms-template/update', data);
}

/** Delete SMS Template */
export function deleteSmsTemplate(id: number) {
  return requestClient.delete(`/system/sms-template/delete?id=${id}`);
}

/** Batch delete text template */
export function deleteSmsTemplateList(ids: number[]) {
  return requestClient.delete(
    `/system/sms-template/delete-list?ids=${ids.join(',')}`,
  );
}

/** Export SMS Templates */
export function exportSmsTemplate(params: any) {
  return requestClient.download('/system/sms-template/export-excel', {
    params,
  });
}

/** Send a text message. */
export function sendSms(data: SystemSmsTemplateApi.SmsSendReqVO) {
  return requestClient.post('/system/sms-template/send-sms', data);
}