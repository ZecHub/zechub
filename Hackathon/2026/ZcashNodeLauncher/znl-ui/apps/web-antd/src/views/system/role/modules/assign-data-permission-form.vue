<script lang="ts" setup>
import type { SystemDeptApi } from '#/api/system/dept';
import type { SystemRoleApi } from '#/api/system/role';

import { ref } from 'vue';

import { Tree, useVbenModal } from '@vben/common-ui';
import { SystemDataScopeEnum } from '@vben/constants';
import { handleTree } from '@vben/utils';

import { Checkbox, message, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { assignRoleDataScope } from '#/api/system/permission';
import { getRole } from '#/api/system/role';
import { $t } from '#/locales';

import { useAssignDataPermissionFormSchema } from '../data';

const emit = defineEmits(['success']);

const deptTree = ref<SystemDeptApi.Dept[]>([]); // Sector tree
const deptLoading = ref(false); // Loading sector list
const isAllSelected = ref(false); // Selected Status
const isExpanded = ref(false); // Expand Status
const isCheckStrictly = ref(true); // Father-son bonding state
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
  schema: useAssignDataPermissionFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    const data = await formApi.getValues();
    try {
      await assignRoleDataScope({
        roleId: data.id,
        dataScope: data.dataScope,
        dataScopeDeptIds:
          data.dataScope === SystemDataScopeEnum.DEPT_CUSTOM
            ? data.dataScopeDeptIds
            : undefined,
      });
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
    const data = modalApi.getData<SystemRoleApi.Role>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      // Loading sector list
      await loadDeptTree();
      handleExpandAll();
      // Set the form value after loading the tree
      await formApi.setValues(await getRole(data.id));
    } finally {
      modalApi.unlock();
    }
  },
});

/** Load sector trees */
async function loadDeptTree() {
  deptLoading.value = true;
  try {
    const data = await getDeptList();
    deptTree.value = handleTree(data) as SystemDeptApi.Dept[];
  } finally {
    deptLoading.value = false;
  }
}

/** Select all/not all */
function handleSelectAll() {
  isAllSelected.value = !isAllSelected.value;
  if (isAllSelected.value) {
    const allIds = getAllNodeIds(deptTree.value);
    formApi.setFieldValue('dataScopeDeptIds', allIds);
  } else {
    formApi.setFieldValue('dataScopeDeptIds', []);
  }
}

/** Expand/ Collapse All Nodes */
function handleExpandAll() {
  isExpanded.value = !isExpanded.value;
  expandedKeys.value = isExpanded.value ? getAllNodeIds(deptTree.value) : [];
}

/** Toggle parent-son connection */
function handleCheckStrictly() {
  isCheckStrictly.value = !isCheckStrictly.value;
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
  <Modal title="Data Permissions" class="w-2/5">
    <Form class="mx-4">
      <template #dataScopeDeptIds="slotProps">
        <Spin :spinning="deptLoading" wrapper-class-name="w-full">
          <Tree
            :tree-data="deptTree"
            multiple
            bordered
            :default-expanded-keys="expandedKeys"
            v-bind="slotProps"
            :check-strictly="!isCheckStrictly"
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
        <Checkbox :checked="isCheckStrictly" @change="handleCheckStrictly">
          Let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go, let's go.
        </Checkbox>
      </div>
    </template>
  </Modal>
</template>