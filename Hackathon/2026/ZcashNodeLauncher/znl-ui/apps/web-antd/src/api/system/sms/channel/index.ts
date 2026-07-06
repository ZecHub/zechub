import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemSmsChannelApi {
  /** Text channel information */
  export interface SmsChannel {
    id?: number;
    code: string;
    status: number;
    signature: string;
    remark: string;
    apiKey: string;
    apiSecret: string;
    callbackUrl: string;
    createTime?: Date;
  }
}

/** Query SMS Channel List */
export function getSmsChannelPage(params: PageParam) {
  return requestClient.get<PageResult<SystemSmsChannelApi.SmsChannel>>(
    '/system/sms-channel/page',
    { params },
  );
}

/** Shortlist to get SMS Channels */
export function getSimpleSmsChannelList() {
  return requestClient.get<SystemSmsChannelApi.SmsChannel[]>(
    '/system/sms-channel/simple-list',
  );
}

/** Query SMS Channel Details */
export function getSmsChannel(id: number) {
  return requestClient.get<SystemSmsChannelApi.SmsChannel>(
    `/system/sms-channel/get?id=${id}`,
  );
}

/** Add Text Channel */
export function createSmsChannel(data: SystemSmsChannelApi.SmsChannel) {
  return requestClient.post('/system/sms-channel/create', data);
}

/** Modify SMS Channels */
export function updateSmsChannel(data: SystemSmsChannelApi.SmsChannel) {
  return requestClient.put('/system/sms-channel/update', data);
}

/** Delete SMS Channel */
export function deleteSmsChannel(id: number) {
  return requestClient.delete(`/system/sms-channel/delete?id=${id}`);
}

/** Batch Delete SMS Channels */
export function deleteSmsChannelList(ids: number[]) {
  return requestClient.delete(
    `/system/sms-channel/delete-list?ids=${ids.join(',')}`,
  );
}

/** Export SMS Channels */
export function exportSmsChannel(params: any) {
  return requestClient.download('/system/sms-channel/export-excel', { params });
}