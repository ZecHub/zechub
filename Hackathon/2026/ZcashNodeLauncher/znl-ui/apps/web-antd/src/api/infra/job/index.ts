import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraJobApi {
  /** Email */
  export interface Job {
    id?: number;
    name: string;
    status: number;
    handlerName: string;
    handlerParam: string;
    cronExpression: string;
    retryCount: number;
    retryInterval: number;
    monitorTimeout: number;
    createTime?: Date;
    nextTimes?: Date[];
  }
}

/** Query  */
export function getJobPage(params: PageParam) {
  return requestClient.get<PageResult<InfraJobApi.Job>>('/infra/job/page', {
    params,
  });
}

/**  */
export function getJob(id: number) {
  return requestClient.get<InfraJobApi.Job>(`/infra/job/get?id=${id}`);
}

export function createJob(data: InfraJobApi.Job) {
  return requestClient.post('/infra/job/create', data);
}

/** Modify Timed Task Schedule */
export function updateJob(data: InfraJobApi.Job) {
  return requestClient.put('/infra/job/update', data);
}

/** Delete Timed Task Schedule */
export function deleteJob(id: number) {
  return requestClient.delete(`/infra/job/delete?id=${id}`);
}

/** Batch Remove Timed Task Schedule */
export function deleteJobList(ids: number[]) {
  return requestClient.delete(`/infra/job/delete-list?ids=${ids.join(',')}`);
}

/** Export Timed Task Schedules */
export function exportJob(params: any) {
  return requestClient.download('/infra/job/export-excel', { params });
}

export function updateJobStatus(id: number, status: number) {
  return requestClient.put('/infra/job/update-status', undefined, {
    params: {
      id,
      status,
    },
  });
}

/** Timed mission performed immediately. */
export function runJob(id: number) {
  return requestClient.put(`/infra/job/trigger?id=${id}`);
}

/** Next n time to get a timed task */
export function getJobNextTimes(id: number) {
  return requestClient.get(`/infra/job/get_next_times?id=${id}`);
}
