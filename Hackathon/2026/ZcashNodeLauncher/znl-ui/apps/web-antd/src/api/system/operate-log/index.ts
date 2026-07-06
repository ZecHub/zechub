import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemOperateLogApi {
  /** Operation Log Information */
  export interface OperateLog {
    id: number;
    traceId: string;
    userType: number;
    userId: number;
    userName: string;
    type: string;
    subType: string;
    bizId: number;
    action: string;
    extra: string;
    requestMethod: string;
    requestUrl: string;
    userIp: string;
    userAgent: string;
    creator: string;
    creatorName: string;
    createTime: string;
  }
}

/** Query Action Log List */
export function getOperateLogPage(params: PageParam) {
  return requestClient.get<PageResult<SystemOperateLogApi.OperateLog>>(
    '/system/operate-log/page',
    { params },
  );
}

/** Export Operations Log */
export function exportOperateLog(params: any) {
  return requestClient.download('/system/operate-log/export-excel', { params });
}