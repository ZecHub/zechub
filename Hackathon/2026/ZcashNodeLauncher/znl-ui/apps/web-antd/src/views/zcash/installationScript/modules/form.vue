<script lang="ts" setup>
import type { ZcashInstallationScriptApi } from '#/api/zcash/installationscript';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createInstallationScript,
  getInstallationScript,
  updateInstallationScript,
} from '#/api/zcash/installationscript';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<ZcashInstallationScriptApi.InstallationScript>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['Installation script'])
    : $t('ui.actionTitle.create', ['Installation script']);
});

const [Form, formApi] = useVbenForm({
  wrapperClass: 'grid-cols-12',
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-12',
    labelWidth: 100,
  },
  layout: 'vertical',
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
    // Submit form
    const data =
      (await formApi.getValues()) as ZcashInstallationScriptApi.InstallationScript;
    try {
      await (formData.value?.id
        ? updateInstallationScript(data)
        : createInstallationScript(data));
      // Close and notify
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
    // Load data
    const data =
      modalApi.getData<ZcashInstallationScriptApi.InstallationScript>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getInstallationScript(data.id);
      // Set to values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
