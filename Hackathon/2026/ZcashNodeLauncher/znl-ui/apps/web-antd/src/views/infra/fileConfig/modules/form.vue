<script lang="ts" setup>
import type { InfraFileConfigApi } from '#/api/infra/file-config';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createFileConfig,
  getFileConfig,
  updateFileConfig,
} from '#/api/infra/file-config';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<InfraFileConfigApi.FileConfig>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['File Configuration'])
    : $t('ui.actionTitle.create', ['File Configuration']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 120,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
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
    const data = (await formApi.getValues()) as InfraFileConfigApi.FileConfig;
    try {
      await (formData.value?.id
        ? updateFileConfig(data)
        : createFileConfig(data));
      // Close and hint
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // Loading data
    const data = modalApi.getData<InfraFileConfigApi.FileConfig>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getFileConfig(data.id);
      // Set to values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle" class="w-2/5">
    <Form class="mx-4" />
  </Modal>
</template>