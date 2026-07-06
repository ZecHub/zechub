<script lang="ts" setup>
import type { SystemUserApi } from '#/api/system/user';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { resetUserPassword } from '#/api/system/user';
import { $t } from '#/locales';

import { useResetPasswordFormSchema } from '../data';

const emit = defineEmits(['success']);
const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useResetPasswordFormSchema(),
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
      await resetUserPassword(data.id, data.newPassword);
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
      return;
    }
    // Loading data
    const data = modalApi.getData<SystemUserApi.User>();
    if (!data || !data.id) {
      return;
    }
    // Set to values
    await formApi.setValues(data);
  },
});
</script>

<template>
  <Modal title="Reset Password">
    <Form class="mx-4" />
  </Modal>
</template>