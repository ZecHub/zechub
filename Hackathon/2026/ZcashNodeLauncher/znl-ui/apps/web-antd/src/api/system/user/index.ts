import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemUserApi {
  /** User Information */
  export interface User {
    id?: number;
    username: string;
    nickname: string;
    deptId: number;
    postIds: string[];
    email: string;
    mobile: string;
    sex: number;
    avatar: string;
    loginIp: string;
    status: number;
    remark: string;
    createTime?: Date;
  }
}

/** Query User Management List */
export function getUserPage(params: PageParam) {
  return requestClient.get<PageResult<SystemUserApi.User>>(
    '/system/user/page',
    { params },
  );
}

/** Query user details */
export function getUser(id: number) {
  return requestClient.get<SystemUserApi.User>(`/system/user/get?id=${id}`);
}

/** Add User */
export function createUser(data: SystemUserApi.User) {
  return requestClient.post('/system/user/create', data);
}

/** Modify User */
export function updateUser(data: SystemUserApi.User) {
  return requestClient.put('/system/user/update', data);
}

/** Remove User */
export function deleteUser(id: number) {
  return requestClient.delete(`/system/user/delete?id=${id}`);
}

/** Batch Remove User */
export function deleteUserList(ids: number[]) {
  return requestClient.delete(`/system/user/delete-list?ids=${ids.join(',')}`);
}

/** Export User */
export function exportUser(params: any) {
  return requestClient.download('/system/user/export-excel', { params });
}

/** Download User Import Template */
export function importUserTemplate() {
  return requestClient.download('/system/user/get-import-template');
}

/** Import User */
export function importUser(file: File, updateSupport: boolean) {
  return requestClient.upload('/system/user/import', {
    file,
    updateSupport,
  });
}

/** User password reset */
export function resetUserPassword(id: number, password: string) {
  return requestClient.put('/system/user/update-password', { id, password });
}

/** User Status Changes */
export function updateUserStatus(id: number, status: number) {
  return requestClient.put('/system/user/update-status', { id, status });
}

/** Get a user's list of streamlined information */
export function getSimpleUserList() {
  return requestClient.get<SystemUserApi.User[]>('/system/user/simple-list');
}