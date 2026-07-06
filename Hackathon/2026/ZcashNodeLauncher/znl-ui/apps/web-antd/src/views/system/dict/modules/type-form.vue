<script lang="ts" setup>
import type { SystemDictTypeApi } from '#/api/system/dict/type';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createDictType,
  getDictType,
  updateDictType,
} from '#/api/system/dict/type';
import { $t } from '#/locales';

import { useTypeFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<SystemDictTypeApi.DictType>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['Dictionary Type'])
    : $t('ui.actionTitle.create', ['Dictionary Type']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useTypeFormSchema(),
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
    const data = (await formApi.getValues()) as SystemDictTypeApi.DictType;
    try {
      await (formData.value?.id ? updateDictType(data) : createDictType(data));
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
    const data = modalApi.getData<SystemDictTypeApi.DictType>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getDictType(data.id);
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