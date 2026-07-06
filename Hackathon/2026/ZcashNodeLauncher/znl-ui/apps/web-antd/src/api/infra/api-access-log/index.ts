import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraApiAccessLogApi {
  /** API Access Log Information */
  export interface ApiAccessLog {
    id: number;
    traceId: string;
    userId: number;
    userType: number;
    applicationName: string;
    requestMethod: string;
    requestParams: string;
    responseBody: string;
    requestUrl: string;
    userIp: string;
    userAgent: string;
    operateModule: string;
    operateName: string;
    operateType: number;
    beginTime: string;
    endTime: string;
    duration: number;
    resultCode: number;
    resultMsg: string;
    createTime: string;
  }
}

/** Query API Access Log List */
export function getApiAccessLogPage(params: PageParam) {
  return requestClient.get<PageResult<InfraApiAccessLogApi.ApiAccessLog>>(
    '/infra/api-access-log/page',
    { params },
  );
}

/** Export API Access Log */
export function exportApiAccessLog(params: any) {
  return requestClient.download('/infra/api-access-log/export-excel', {
    params,
  });
}