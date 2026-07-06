<script lang="ts" setup>
import type { UploadFile, UploadProps } from 'ant-design-vue';
import type { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';

import type { FileUploadProps } from './typing';

import type { AxiosProgressEvent } from '#/api/infra/file';

import { computed, ref, toRefs, watch } from 'vue';

import { IconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';
import { isFunction, isObject, isString } from '@vben/utils';

import { message, Modal, Upload } from 'ant-design-vue';

import { checkImgType, defaultImageAccepts } from './helper';
import { UploadResultStatus } from './typing';
import { useUpload, useUploadType } from './use-upload';

defineOptions({ name: 'ImageUpload', inheritAttrs: false });

const props = withDefaults(defineProps<FileUploadProps>(), {
  value: () => [],
  modelValue: undefined,
  directory: undefined,
  disabled: false,
  listType: 'picture-card',
  helpText: '',
  maxSize: 2,
  maxNumber: 1,
  accept: () => defaultImageAccepts,
  multiple: false,
  api: undefined,
  resultField: '',
  showDescription: true,
});
const emit = defineEmits([
  'change',
  'update:value',
  'update:modelValue',
  'delete',
]);
const { accept, helpText, maxNumber, maxSize } = toRefs(props);
const isInnerOperate = ref<boolean>(false);
const { getStringAccept } = useUploadType({
  acceptRef: accept,
  helpTextRef: helpText,
  maxNumberRef: maxNumber,
  maxSizeRef: maxSize,
});

// Calculates the currently bound value and prioritizes the use of modelValue
const currentValue = computed(() => {
  return props.modelValue === undefined ? props.value : props.modelValue;
});

// Determining whether to use modelValue
const isUsingModelValue = computed(() => {
  return props.modelValue !== undefined;
});
const previewOpen = ref<boolean>(false); // Whether or not to show previews
const previewImage = ref<string>(''); // Preview Pictures
const previewTitle = ref<string>(''); // Preview Title

const fileList = ref<UploadProps['fileList']>([]);
const isLtMsg = ref<boolean>(true); // File size error hint
const isActMsg = ref<boolean>(true); // Error hint for file type
const isFirstRender = ref<boolean>(true); // Whether to rewrite for the first time
const uploadNumber = ref<number>(0); // Upload File Counter
const uploadList = ref<any[]>([]); // Temporary Upload List

watch(
  currentValue,
  async (v) => {
    if (isInnerOperate.value) {
      isInnerOperate.value = false;
      return;
    }
    let value: string | string[] = [];
    if (v) {
      if (Array.isArray(v)) {
        value = v;
      } else {
        value.push(v);
      }
      fileList.value = value.map((item, i) => {
        if (item && isString(item)) {
          return {
            uid: `${-i}`,
            name: item.slice(Math.max(0, item.lastIndexOf('/') + 1)),
            status: UploadResultStatus.DONE,
            url: item,
          };
        } else if (item && isObject(item)) {
          return item;
        }
        return null;
      }) as UploadProps['fileList'];
    }
    if (!isFirstRender.value) {
      emit('change', value);
      isFirstRender.value = false;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

function getBase64<T extends ArrayBuffer | null | string>(file: File) {
  return new Promise<T>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      resolve(reader.result as T);
    });
    reader.addEventListener('error', (error) => reject(error));
  });
}

async function handlePreview(file: UploadFile) {
  if (!file.url && !file.preview) {
    file.preview = await getBase64<string>(file.originFileObj!);
  }
  previewImage.value = file.url || file.preview || '';
  previewOpen.value = true;
  previewTitle.value =
    file.name ||
    previewImage.value.slice(
      Math.max(0, previewImage.value.lastIndexOf('/') + 1),
    );
}

async function handleRemove(file: UploadFile) {
  if (fileList.value) {
    const index = fileList.value.findIndex((item) => item.uid === file.uid);
    index !== -1 && fileList.value.splice(index, 1);
    const value = getValue();
    isInnerOperate.value = true;
    emit('update:value', value);
    emit('update:modelValue', value);
    emit('change', value);
    emit('delete', file);
  }
}

function handleCancel() {
  previewOpen.value = false;
  previewTitle.value = '';
}

async function beforeUpload(file: File) {
  // Check file number limits
  if (fileList.value!.length >= props.maxNumber) {
    message.error($t('ui.upload.maxNumber', [props.maxNumber]));
    return Upload.LIST_IGNORE;
  }

  const { maxSize, accept } = props;
  const isAct = checkImgType(file, accept);
  if (!isAct) {
    message.error($t('ui.upload.acceptUpload', [accept]));
    isActMsg.value = false;
    // Prevent multiple bug hints from popup
    setTimeout(() => (isActMsg.value = true), 1000);
    return Upload.LIST_IGNORE;
  }
  const isLt = file.size / 1024 / 1024 > maxSize;
  if (isLt) {
    message.error($t('ui.upload.maxSizeMultiple', [maxSize]));
    isLtMsg.value = false;
    // Prevent multiple bug hints from popup
    setTimeout(() => (isLtMsg.value = true), 1000);
    return Upload.LIST_IGNORE;
  }

  // Add counter only after authentication has passed
  uploadNumber.value++;
  return true;
}

async function customRequest(info: UploadRequestOption<any>) {
  let { api } = props;
  if (!api || !isFunction(api)) {
    api = useUpload(props.directory).httpRequest;
  }
  try {
    // Upload File
    const progressEvent: AxiosProgressEvent = (e) => {
      const percent = Math.trunc((e.loaded / e.total!) * 100);
      info.onProgress!({ percent });
    };
    const res = await api?.(info.file as File, progressEvent);

    // Handle the logic after uploading successfully
    handleUploadSuccess(res, info.file as File);

    info.onSuccess!(res);
    message.success($t('ui.upload.uploadSuccess'));
  } catch (error: any) {
    console.error(error);
    info.onError!(error);
    handleUploadError(error);
  }
}

// Processed upload successfully
function handleUploadSuccess(res: any, file: File) {
  // Remove temporary file
  const index = fileList.value?.findIndex((item) => item.name === file.name);
  if (index !== -1) {
    fileList.value?.splice(index!, 1);
  }

  // Add to Temporary Upload List
  const fileUrl = res?.url || res?.data || res;
  uploadList.value.push({
    name: file.name,
    url: fileUrl,
    status: UploadResultStatus.DONE,
    uid: file.name + Date.now(),
  });

  // Check if all files have been uploaded
  if (uploadList.value.length >= uploadNumber.value) {
    fileList.value?.push(...uploadList.value);
    uploadList.value = [];
    uploadNumber.value = 0;

    // Update value
    const value = getValue();
    isInnerOperate.value = true;
    emit('update:value', value);
    emit('update:modelValue', value);
    emit('change', value);
  }
}

// Process upload error
function handleUploadError(error: any) {
  console.error('Upload error:', error);
  message.error('Upload error!');
  // Reduction counter when uploading failed
  uploadNumber.value = Math.max(0, uploadNumber.value - 1);
}

function getValue() {
  const list = (fileList.value || [])
    .filter((item) => item?.status === UploadResultStatus.DONE)
    .map((item: any) => {
      if (item?.response && props?.resultField) {
        return item?.response;
      }
      return item?.url || item?.response?.url || item?.response;
    });

  // Returns the format according to the type of input parameter for individual files
  if (props.maxNumber === 1) {
    const singleValue = list.length > 0 ? list[0] : '';
    // Returns a string if the original value is a string or modelValue is a string
    if (
      isString(props.value) ||
      (isUsingModelValue.value && isString(props.modelValue))
    ) {
      return singleValue;
    }
    return singleValue;
  }

  // Multi-file situation, returns formatting according to type of input parameter
  if (isUsingModelValue.value) {
    return Array.isArray(props.modelValue) ? list : list.join(',');
  }

  return Array.isArray(props.value) ? list : list.join(',');
}
</script>

<template>
  <div>
    <Upload
      v-bind="$attrs"
      v-model:file-list="fileList"
      :accept="getStringAccept"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      :disabled="disabled"
      :list-type="listType"
      :max-count="maxNumber"
      :multiple="multiple"
      :progress="{ showInfo: true }"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      <div
        v-if="fileList && fileList.length < maxNumber"
        class="flex flex-col items-center justify-center"
      >
        <IconifyIcon icon="lucide:cloud-upload" />
        <div class="mt-2">{{ $t('ui.upload.imgUpload') }}</div>
      </div>
    </Upload>
    <div
      v-if="showDescription"
      class="mt-2 flex flex-wrap items-center text-sm"
    >
      No more uploads, please.
      <div class="text-primary mx-1 font-bold">{{ maxSize }}MB</div>
      It's... it's... it's... it's... it's... it's... it's... it's... it's... it's... it's... it's... it's... it's... it's...
      <div class="text-primary mx-1 font-bold">{{ accept.join('/') }}</div>
      Format File
    </div>
    <Modal
      :footer="null"
      :open="previewOpen"
      :title="previewTitle"
      @cancel="handleCancel"
    >
      <img :src="previewImage" alt="" class="w-full" />
    </Modal>
  </div>
</template>

<style>
.ant-upload-select-picture-card {
  @apply flex items-center justify-center;
}
</style>