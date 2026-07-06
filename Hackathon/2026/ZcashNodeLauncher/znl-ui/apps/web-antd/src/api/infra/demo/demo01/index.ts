import type { Dayjs } from 'dayjs';

import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace Demo01ContactApi {
  export interface Demo01Contact {
    id: number; // Numbering
    name?: string; // Name
    sex?: number; // Gender
    birthday?: Dayjs | string; // Year of birth
    description?: string; // Introduction
    avatar: string; // The head.
  }
}

export function getDemo01ContactPage(params: PageParam) {
  return requestClient.get<PageResult<Demo01ContactApi.Demo01Contact>>(
    '/infra/demo01-contact/page',
    { params },
  );
}

export function getDemo01Contact(id: number) {
  return requestClient.get<Demo01ContactApi.Demo01Contact>(
    `/infra/demo01-contact/get?id=${id}`,
  );
}

export function createDemo01Contact(data: Demo01ContactApi.Demo01Contact) {
  return requestClient.post('/infra/demo01-contact/create', data);
}

export function updateDemo01Contact(data: Demo01ContactApi.Demo01Contact) {
  return requestClient.put('/infra/demo01-contact/update', data);
}

export function deleteDemo01Contact(id: number) {
  return requestClient.delete(`/infra/demo01-contact/delete?id=${id}`);
}

/** Batch Delete Example Contacts */
export function deleteDemo01ContactList(ids: number[]) {
  return requestClient.delete(
    `/infra/demo01-contact/delete-list?ids=${ids.join(',')}`,
  );
}

export function exportDemo01Contact(params: any) {
  return requestClient.download('/infra/demo01-contact/export-excel', {
    params,
  });
}
