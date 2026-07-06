import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemMailAccountApi {
  /** Mailbox Account */
  export interface MailAccount {
    id: number;
    mail: string;
    username: string;
    password: string;
    host: string;
    port: number;
    sslEnable: boolean;
    starttlsEnable: boolean;
    status: number;
    createTime: Date;
    remark: string;
  }
}

/** Can not open message */
export function getMailAccountPage(params: PageParam) {
  return requestClient.get<PageResult<SystemMailAccountApi.MailAccount>>(
    '/system/mail-account/page',
    { params },
  );
}

export function getMailAccount(id: number) {
  return requestClient.get<SystemMailAccountApi.MailAccount>(
    `/system/mail-account/get?id=${id}`,
  );
}

/** Email */
export function createMailAccount(data: SystemMailAccountApi.MailAccount) {
  return requestClient.post('/system/mail-account/create', data);
}

/** Modify Mailbox Account */
export function updateMailAccount(data: SystemMailAccountApi.MailAccount) {
  return requestClient.put('/system/mail-account/update', data);
}

/** Remove Mailbox Account */
export function deleteMailAccount(id: number) {
  return requestClient.delete(`/system/mail-account/delete?id=${id}`);
}

/** Bulk delete mailbox account */
export function deleteMailAccountList(ids: number[]) {
  return requestClient.delete(
    `/system/mail-account/delete-list?ids=${ids.join(',')}`,
  );
}

/** Obtain a streamlined list of mailbox accounts */
export function getSimpleMailAccountList() {
  return requestClient.get<SystemMailAccountApi.MailAccount[]>(
    '/system/mail-account/simple-list',
  );
}
