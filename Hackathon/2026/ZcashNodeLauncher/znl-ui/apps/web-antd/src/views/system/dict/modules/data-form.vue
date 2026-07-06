<script lang="ts" setup>
import type { SystemDictDataApi } from '#/api/system/dict/data';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createDictData,
  getDictData,
  updateDictData,
} from '#/api/system/dict/data';
import { $t } from '#/locales';

import { useDataFormSchema } from '../data';

defineOptions({ name: 'SystemDictDataForm' });

const emit = defineEmits(['success']);
const formData = ref<SystemDictDataApi.DictData>();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['Dictionary Data'])
    : $t('ui.actionTitle.create', ['Dictionary Data']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 90,
  },
  layout: 'horizontal',
  schema: useDataFormSchema(),
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
    const data = (await formApi.getValues()) as SystemDictDataApi.DictData;
    try {
      await (formData.value?.id ? updateDictData(data) : createDictData(data));
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
    const data = modalApi.getData<SystemDictDataApi.DictData>();
    if (!data || !data.id) {
      // SetdictType
      await formApi.setValues(data);
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getDictData(data.id);
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