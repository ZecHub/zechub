<script lang="ts" setup>
import type { SystemOAuth2ClientApi } from '#/api/system/oauth2/client';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createOAuth2Client,
  getOAuth2Client,
  updateOAuth2Client,
} from '#/api/system/oauth2/client';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<SystemOAuth2ClientApi.OAuth2Client>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['OAuth 2.0 Client'])
    : $t('ui.actionTitle.create', ['OAuth 2.0 Client']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 140,
  },
  wrapperClass: 'grid-cols-2',
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
    const data =
      (await formApi.getValues()) as SystemOAuth2ClientApi.OAuth2Client;
    try {
      await (formData.value?.id
        ? updateOAuth2Client(data)
        : createOAuth2Client(data));
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
    const data = modalApi.getData<SystemOAuth2ClientApi.OAuth2Client>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getOAuth2Client(data.id);
      // Set to values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal class="w-1/2" :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>