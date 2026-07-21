<script lang="ts" setup>
import type { ZcashNodeServerApi } from '#/api/zcash/nodeServer';

import { computed, ref } from 'vue';

import { globalShareState, useVbenModal, VbenButton } from '@vben/common-ui';

import { Checkbox, message, Steps } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createNodeServer,
  getNodeServer,
  updateNodeServer,
} from '#/api/zcash/nodeServer';
import { $t } from '#/locales';

import { useProxyConfigFormSchema, useServerConfigFormSchema } from '../data';

const emit = defineEmits(['success']);
const components = globalShareState.getComponents();
const current = computed(() => {
  if (currentIndex.value == null) {
    return null;
  }
  return items[currentIndex.value];
});
const currentIndex = ref<number | undefined>(0);

const defaultForm = ref({
  port: 22,
  username: 'root',
});
const nameChanged = ref(false);
const isInternalChange = ref(false);

const formData = ref<ZcashNodeServerApi.NodeServer>();

const refreshServerStatus = ref(false);

const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['Node Server'])
    : $t('ui.actionTitle.create', ['Node Server']);
});

const [ServerConfigForm, serverConfigFormApi] = useVbenForm({
  wrapperClass: 'grid-cols-12',
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    formItemClass: 'col-span-12',
    labelWidth: 80,
  },
  layout: 'vertical',
  schema: useServerConfigFormSchema(),
  showDefaultActions: false,
  handleValuesChange: (values, changedValues) => {
    if (isInternalChange.value) {
      isInternalChange.value = false;
      return;
    }

    if (changedValues.includes('name')) {
      nameChanged.value = true;
    }

    if (
      changedValues.includes('host') &&
      !nameChanged.value &&
      values.name !== values.host
    ) {
      values.name = values.host;
      serverConfigFormApi.setValues(values);
      isInternalChange.value = true;
    }
  },
});

const [ProxyConfigForm, proxyConfigFormApi] = useVbenForm({
  wrapperClass: 'grid-cols-12',
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-12',
    labelWidth: 80,
  },
  layout: 'vertical',
  schema: useProxyConfigFormSchema(),
  showDefaultActions: false,
});

const items = [
  {
    title: 'Server Config',
    key: 'ServerConfig',
    formApi: serverConfigFormApi,
  },
  {
    title: 'Proxy Config',
    key: 'ProxyConfig',
    formApi: proxyConfigFormApi,
  },
  {
    title: 'Check Status',
    key: 'CheckStatus',
  },
];

const confirmDisabled = computed(() => {
  if (!current.value) {
    return true;
  }

  return false;
});

const [Modal, modalApi] = useVbenModal({
  confirmDisabled: confirmDisabled.value,
  async onConfirm() {
    const { valid } = await serverConfigFormApi.validate();
    if (!valid) {
      currentIndex.value = 0;
      return;
    }
    modalApi.lock();
    // Submit form
    const data = Object.assign(
      {},
      await serverConfigFormApi.getValues(),
      await proxyConfigFormApi.getValues(),
      { refreshServerStatus: refreshServerStatus.value },
    ) as ZcashNodeServerApi.NodeServer;
    try {
      await (formData.value?.id
        ? updateNodeServer(data)
        : createNodeServer(data));
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
    const data = modalApi.getData<ZcashNodeServerApi.NodeServer>();
    if (!data || !data.id) {
      await serverConfigFormApi.setValues(defaultForm.value);
      await proxyConfigFormApi.setValues({});
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getNodeServer(data.id);
      // Set to values
      await serverConfigFormApi.setValues(formData.value);
      await proxyConfigFormApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});

function prev() {
  if (currentIndex.value == null) {
    return;
  }
  if (!hasPrev()) {
    return;
  }
  currentIndex.value = currentIndex.value - 1;
}
function next() {
  if (currentIndex.value == null) {
    return;
  }
  if (!hasNext()) {
    return;
  }
  currentIndex.value = currentIndex.value + 1;
}
function hasNext() {
  if (currentIndex.value == null) {
    return false;
  }
  if (currentIndex.value >= items.length - 1) {
    return false;
  }
  return true;
}

function hasPrev() {
  if (currentIndex.value == null) {
    return false;
  }
  if (currentIndex.value <= 0) {
    return false;
  }
  return true;
}
const onChange = (val: number) => {
  currentIndex.value = val;
};
</script>

<template>
  <Modal :title="getTitle" class="w-5/12">
    <div>
      <div style="margin: 0 2em">
        <Steps :current="currentIndex" :items="items" @change="onChange" />
      </div>

      <div class="steps-content">
        <ServerConfigForm
          v-show="current?.key == 'ServerConfig'"
          class="mx-4"
        />
        <ProxyConfigForm v-show="current?.key == 'ProxyConfig'" class="mx-4" />
        <div v-show="current?.key == 'CheckStatus'" class="mx-4">
          <Checkbox v-model:checked="refreshServerStatus">
            Refresh server status upon saving.
          </Checkbox>
        </div>
      </div>
    </div>
    <template #center-footer>
      <component
        :is="components.DefaultButton || VbenButton"
        variant="ghost"
        v-if="hasPrev()"
        @click="() => prev()"
      >
        Prev
      </component>

      <component
        :is="components.DefaultButton || VbenButton"
        variant="ghost"
        v-if="hasNext()"
        @click="() => next()"
      >
        Next
      </component>
    </template>
  </Modal>
</template>
<style lang="scss" scoped>
.steps-content {
  margin-top: 1em;
}
</style>
