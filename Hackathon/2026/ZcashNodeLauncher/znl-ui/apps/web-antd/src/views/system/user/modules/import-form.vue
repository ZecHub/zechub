<script lang="ts" setup>
import type { FileType } from 'ant-design-vue/es/upload/interface';

import { useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { Button, message, Upload } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { importUser, importUserTemplate } from '#/api/system/user';
import { $t } from '#/locales';

import { useImportFormSchema } from '../data';

const emit = defineEmits(['success']);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    labelWidth: 120,
  },
  layout: 'horizontal',
  schema: useImportFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // Submit Forms
    const data = await formApi.getValues();
    try {
      await importUser(data.file, data.updateSupport);
      // Close and hint
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
});

/** Upload Before */
function beforeUpload(file: FileType) {
  formApi.setFieldValue('file', file);
  return false;
}

/** Download Template */
async function handleDownload() {
  const data = await importUserTemplate();
  downloadFileFromBlobPart({ fileName: 'User Import Templates.xls', source: data });
}
</script>

<template>
  <Modal title="Import User" class="w-1/3">
    <Form class="mx-4">
      <template #file>
        <div class="w-full">
          <Upload
            :max-count="1"
            accept=".xls,.xlsx"
            :before-upload="beforeUpload"
          >
            <Button type="primary"> Selection Excel Documentation </Button>
          </Upload>
        </div>
      </template>
    </Form>
    <template #prepend-footer>
      <div class="flex flex-auto items-center">
        <Button @click="handleDownload"> Download Import Template </Button>
      </div>
    </template>
  </Modal>
</template>