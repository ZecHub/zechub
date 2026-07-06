import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace SystemPostApi {
  /** Job Information */
  export interface Post {
    id?: number;
    name: string;
    code: string;
    sort: number;
    status: number;
    remark: string;
    createTime?: Date;
  }
}

/** Email */
export function getPostPage(params: PageParam) {
  return requestClient.get<PageResult<SystemPostApi.Post>>(
    '/system/post/page',
    {
      params,
    },
  );
}

/** Acquiring Job Simplified Information List */
export function getSimplePostList() {
  return requestClient.get<SystemPostApi.Post[]>('/system/post/simple-list');
}

export function getPost(id: number) {
  return requestClient.get<SystemPostApi.Post>(`/system/post/get?id=${id}`);
}

/** New posts */
export function createPost(data: SystemPostApi.Post) {
  return requestClient.post('/system/post/create', data);
}

/** Change of position */
export function updatePost(data: SystemPostApi.Post) {
  return requestClient.put('/system/post/update', data);
}

/** Remove job */
export function deletePost(id: number) {
  return requestClient.delete(`/system/post/delete?id=${id}`);
}

/** Batch Deleting Positions */
export function deletePostList(ids: number[]) {
  return requestClient.delete(`/system/post/delete-list?ids=${ids.join(',')}`);
}

/** Export position */
export function exportPost(params: any) {
  return requestClient.download('/system/post/export-excel', {
    params,
  });
}
