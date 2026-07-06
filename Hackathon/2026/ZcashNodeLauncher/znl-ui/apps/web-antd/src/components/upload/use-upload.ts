import type { Ref } from 'vue';

import type { AxiosProgressEvent, InfraFileApi } from '#/api/infra/file';

import { computed, unref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { $t } from '@vben/locales';

import { createFile, getFilePresignedUrl, uploadFile } from '#/api/infra/file';
import { baseRequestClient } from '#/api/request';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

/**
 * Upload Type
 */
enum UPLOAD_TYPE {
  // Client direct upload (S3 services only)
  CLIENT = 'client',
  // Client sent to backend upload
  SERVER = 'server',
}

export function useUploadType({
  acceptRef,
  helpTextRef,
  maxNumberRef,
  maxSizeRef,
}: {
  acceptRef: Ref<string[]>;
  helpTextRef: Ref<string>;
  maxNumberRef: Ref<number>;
  maxSizeRef: Ref<number>;
}) {
  // File type limit
  const getAccept = computed(() => {
    const accept = unref(acceptRef);
    if (accept && accept.length > 0) {
      return accept;
    }
    return [];
  });
  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => {
        return item.indexOf('/') > 0 || item.startsWith('.')
          ? item
          : `.${item}`;
      })
      .join(',');
  });

  // Supports jpg, jpeg,png formats with no more than 2M, with a maximum of 10 photos available.
  const getHelpText = computed(() => {
    const helpText = unref(helpTextRef);
    if (helpText) {
      return helpText;
    }
    const helpTexts: string[] = [];

    const accept = unref(acceptRef);
    if (accept.length > 0) {
      helpTexts.push($t('ui.upload.accept', [accept.join(',')]));
    }

    const maxSize = unref(maxSizeRef);
    if (maxSize) {
      helpTexts.push($t('ui.upload.maxSize', [maxSize]));
    }

    const maxNumber = unref(maxNumberRef);
    if (maxNumber && maxNumber !== Infinity) {
      helpTexts.push($t('ui.upload.maxNumber', [maxNumber]));
    }
    return helpTexts.join('，');
  });
  return { getAccept, getStringAccept, getHelpText };
}

export function useUpload(directory?: string) {
  // Backend Upload Address
  const uploadUrl = getUploadUrl();
  // Whether to use front-end straight upload
  const isClientUpload =
    UPLOAD_TYPE.CLIENT === import.meta.env.VITE_UPLOAD_TYPE;
  // Rewrite ElUpload Upload Method
  async function httpRequest(
    file: File,
    onUploadProgress?: AxiosProgressEvent,
  ) {
    // Mode one: front-end upload
    if (isClientUpload) {
      // 1.1 Generate file name
      const fileName = await generateFileName(file);
      // 1.2 Pre-signature address for obtaining documents
      const presignedInfo = await getFilePresignedUrl(fileName, directory);
      // 1.3 Uploading documents
      return baseRequestClient
        .put(presignedInfo.uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
        .then(() => {
          // 1.4 Document information to back end (asynchronous)
          createFile0(presignedInfo, file);
          // The notification was successful and the data format was maintained in line with the return results uploaded from the backend
          return { url: presignedInfo.url };
        });
    } else {
      // Mode two: backend upload
      return uploadFile({ file, directory }, onUploadProgress);
    }
  }

  return {
    uploadUrl,
    httpRequest,
  };
}

/**
 * Get Upload URL
 */
export function getUploadUrl(): string {
  return `${apiURL}/infra/file/upload`;
}

/**
 * Create file information* * @param vo file pre-signed information * @param file
 */
function createFile0(
  vo: InfraFileApi.FilePresignedUrlRespVO,
  file: File,
): InfraFileApi.File {
  const fileVO = {
    configId: vo.configId,
    url: vo.url,
    path: vo.path,
    name: file.name,
    type: file.type,
    size: file.size,
  };
  createFile(fileVO);
  return fileVO;
}

/**
 * Generate file name (using algorithm SHA256) * * @paramfile files to upload
 */
async function generateFileName(file: File) {
  // / / Read the contents of the file
  // const data = await file.arrayBuffer();
  // const wordArray = CryptoJS.lib.WordArray.create(data);
  // / / Calculate SHA256
  // const sha256 = CryptoJS.SHA256(wordArray).toString();
  // / / Collapse Suffix
  // const ext = file.name.slice(Math.max(0, file.name.lastIndexOf('.')));
  // return `${sha256}${ext}`;
  return file.name;
}