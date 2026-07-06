<script lang="ts" setup>
import type { SystemMenuApi } from '#/api/system/menu';
import type { SystemTenantPackageApi } from '#/api/system/tenant-package';

import { computed, ref } from 'vue';

import { Tree, useVbenModal } from '@vben/common-ui';
import { handleTree } from '@vben/utils';

import { Checkbox, message, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getMenuList } from '#/api/system/menu';
import {
  createTenantPackage,
  getTenantPackage,
  updateTenantPackage,
} from '#/api/system/tenant-package';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<SystemTenantPackageApi.TenantPackage>();
const getTitle = computed(() => {
  return formData.value
    ? $t('ui.actionTitle.edit', ['The package.'])
    : $t('ui.actionTitle.create', ['The package.']);
});
const menuTree = ref<SystemMenuApi.Menu[]>([]); // Menu Tree
const menuLoading = ref(false); // Load Menu List
const isAllSelected = ref(false); // Selected Status
const isExpanded = ref(false); // Expand Status
const expandedKeys = ref<number[]>([]); // Expanding Nodes

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
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
    const data =
      (await formApi.getValues()) as SystemTenantPackageApi.TenantPackage;
    try {
      await (formData.value
        ? updateTenantPackage(data)
        : createTenantPackage(data));
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
    // Load Menu List
    await loadMenuTree();
    // Loading data
    const data = modalApi.getData<SystemTenantPackageApi.TenantPackage>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getTenantPackage(data.id);
      await formApi.setValues(data);
    } finally {
      modalApi.unlock();
    }
  },
});

/** Load Menu Tree */
async function loadMenuTree() {
  menuLoading.value = true;
  try {
    const data = await getMenuList();
    menuTree.value = handleTree(data) as SystemMenuApi.Menu[];
  } finally {
    menuLoading.value = false;
  }
}

/** Select all/not all */
function handleSelectAll() {
  isAllSelected.value = !isAllSelected.value;
  if (isAllSelected.value) {
    const allIds = getAllNodeIds(menuTree.value);
    formApi.setFieldValue('menuIds', allIds);
  } else {
    formApi.setFieldValue('menuIds', []);
  }
}

/** Expand/ Collapse All Nodes */
function handleExpandAll() {
  isExpanded.value = !isExpanded.value;
  expandedKeys.value = isExpanded.value ? getAllNodeIds(menuTree.value) : [];
}

/** Recursively fetch all node IDs */
function getAllNodeIds(nodes: any[], ids: number[] = []): number[] {
  nodes.forEach((node: any) => {
    ids.push(node.id);
    if (node.children && node.children.length > 0) {
      getAllNodeIds(node.children, ids);
    }
  });
  return ids;
}
</script>

<template>
  <Modal :title="getTitle" class="w-2/5">
    <Form class="mx-6">
      <template #menuIds="slotProps">
        <Spin :spinning="menuLoading" wrapper-class-name="w-full">
          <Tree
            class="max-h-96 overflow-y-auto"
            :tree-data="menuTree"
            multiple
            bordered
            :default-expanded-keys="expandedKeys"
            v-bind="slotProps"
            value-field="id"
            label-field="name"
          />
        </Spin>
      </template>
    </Form>
    <template #prepend-footer>
      <div class="flex flex-auto items-center">
        <Checkbox :checked="isAllSelected" @change="handleSelectAll">
          Select All
        </Checkbox>
        <Checkbox :checked="isExpanded" @change="handleExpandAll">
          Expand All
        </Checkbox>
      </div>
    </template>
  </Modal>
</template>