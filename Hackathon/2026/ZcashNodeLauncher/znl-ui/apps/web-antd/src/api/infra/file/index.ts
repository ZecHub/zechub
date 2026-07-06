import type { AxiosRequestConfig, PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

/** Axios Upload Progress Event */
export type AxiosProgressEvent = AxiosRequestConfig['onUploadProgress'];

export namespace InfraFileApi {
  /** File Information */
  export interface File {
    id?: number;
    configId?: number;
    path: string;
    name?: string;
    url?: string;
    size?: number;
    type?: string;
    createTime?: Date;
  }

  /** File pre-signature address */
  export interface FilePresignedUrlRespVO {
    configId: number; // File Profile Numbering
    uploadUrl: string; // File Upload URL
    url: string; // File URL
    path: string; // File Path
  }

  /** Upload File */
  export interface FileUploadReqVO {
    file: globalThis.File;
    directory?: string;
  }
}

/** Query File List */
export function getFilePage(params: PageParam) {
  return requestClient.get<PageResult<InfraFileApi.File>>('/infra/file/page', {
    params,
  });
}

/** Remove File */
export function deleteFile(id: number) {
  return requestClient.delete(`/infra/file/delete?id=${id}`);
}

/** Batch Delete File */
export function deleteFileList(ids: number[]) {
  return requestClient.delete(`/infra/file/delete-list?ids=${ids.join(',')}`);
}

/** Get file pre-signature address */
export function getFilePresignedUrl(name: string, directory?: string) {
  return requestClient.get<InfraFileApi.FilePresignedUrlRespVO>(
    '/infra/file/presigned-url',
    {
      params: { name, directory },
    },
  );
}

/** Create File */
export function createFile(data: InfraFileApi.File) {
  return requestClient.post('/infra/file/create', data);
}

/** Upload File */
export function uploadFile(
  data: InfraFileApi.FileUploadReqVO,
  onUploadProgress?: AxiosProgressEvent,
) {
  // Special: due to an upload internal envelope, directtory is passed to the backend even if undefined
  if (!data.directory) {
    delete data.directory;
  }
  return requestClient.upload('/infra/file/upload', data, { onUploadProgress });
}