import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemLoginLogApi {
  /** Login Information */
  export interface LoginLog {
    id: number;
    logType: number;
    traceId: number;
    userId: number;
    userType: number;
    username: string;
    result: number;
    status: number;
    userIp: string;
    userAgent: string;
    createTime: string;
  }
}

/** Query log list */
export function getLoginLogPage(params: PageParam) {
  return requestClient.get<PageResult<SystemLoginLogApi.LoginLog>>(
    '/system/login-log/page',
    { params },
  );
}

/** Export Login */
export function exportLoginLog(params: any) {
  return requestClient.download('/system/login-log/export-excel', { params });
}