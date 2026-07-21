import type { AxiosResponse } from '@vben/request';

import type { AxiosProgressEvent } from '#/api/infra/file';

export enum UploadResultStatus {
  DONE = 'done',
  ERROR = 'error',
  SUCCESS = 'success',
  UPLOADING = 'uploading',
}

export type UploadListType = 'picture' | 'picture-card' | 'text';

export interface FileUploadProps {
  // According to the suffix, or other
  accept?: string[];
  api?: (
    file: File,
    onUploadProgress?: AxiosProgressEvent,
  ) => Promise<AxiosResponse<any>>;
  // Uploaded Directory
  directory?: string;
  disabled?: boolean;
  drag?: boolean; // Whether to support drag-up
  helpText?: string;
  listType?: UploadListType;
  // Maximum number of files, infinity unlimited
  maxNumber?: number;
  modelValue?: string | string[]; // v-model support
  // Maximum number of MB files
  maxSize?: number;
  // Whether multiple options are supported
  multiple?: boolean;
  // support xxx.xxx.xx
  resultField?: string;
  // Whether to show the following description
  showDescription?: boolean;
  value?: string | string[];
}