<script lang="ts" setup>
import type { SystemUserApi } from '#/api/system/user';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { assignUserRole, getUserRoleList } from '#/api/system/permission';
import { $t } from '#/locales';

import { useAssignRoleFormSchema } from '../data';

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
  schema: useAssignRoleFormSchema(),
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
    const values = await formApi.getValues();
    try {
      await assignUserRole({
        userId: values.id,
        roleIds: values.roleIds,
      });
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
    modalApi.lock();
    try {
      const roleIds = await getUserRoleList(data.id);
      // Set to values
      await formApi.setValues({
        ...data,
        roleIds,
      });
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal title="Distribution of roles">
    <Form class="mx-4" />
  </Modal>
</template>