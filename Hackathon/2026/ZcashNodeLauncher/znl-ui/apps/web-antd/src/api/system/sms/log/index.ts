import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemSmsLogApi {
  /** SMS Log Information */
  export interface SmsLog {
    id?: number;
    channelId?: number;
    channelCode: string;
    templateId?: number;
    templateCode: string;
    templateType?: number;
    templateContent: string;
    templateParams?: Record<string, any>;
    apiTemplateId: string;
    mobile: string;
    userId?: number;
    userType?: number;
    sendStatus?: number;
    sendTime?: string;
    apiSendCode: string;
    apiSendMsg: string;
    apiRequestId: string;
    apiSerialNo: string;
    receiveStatus?: number;
    receiveTime?: string;
    apiReceiveCode: string;
    apiReceiveMsg: string;
    createTime: string;
  }
}

/** Query SMS Log List */
export function getSmsLogPage(params: PageParam) {
  return requestClient.get<PageResult<SystemSmsLogApi.SmsLog>>(
    '/system/sms-log/page',
    { params },
  );
}

/** Export SMS Log */
export function exportSmsLog(params: any) {
  return requestClient.download('/system/sms-log/export-excel', { params });
}