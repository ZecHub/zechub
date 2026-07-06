import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraJobLogApi {
  /** Task Log Information */
  export interface JobLog {
    id?: number;
    jobId: number;
    handlerName: string;
    handlerParam: string;
    cronExpression: string;
    executeIndex: string;
    beginTime: Date;
    endTime: Date;
    duration: string;
    status: number;
    createTime?: string;
    result: string;
  }
}

/** Query list of task logs */
export function getJobLogPage(params: PageParam) {
  return requestClient.get<PageResult<InfraJobLogApi.JobLog>>(
    '/infra/job-log/page',
    { params },
  );
}

/** Query details for the task log */
export function getJobLog(id: number) {
  return requestClient.get<InfraJobLogApi.JobLog>(
    `/infra/job-log/get?id=${id}`,
  );
}

/** Export Timed Tasks Log */
export function exportJobLog(params: any) {
  return requestClient.download('/infra/job-log/export-excel', { params });
}