<script lang="ts" setup>
import type { DataNode } from 'ant-design-vue/es/tree';

import type { SystemDeptApi } from '#/api/system/dept';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { handleTree } from '@vben/utils';

import { Card, Col, Row, Tree } from 'ant-design-vue';

import { getSimpleDeptList } from '#/api/system/dept';

defineOptions({ name: 'DeptSelectModal' });

const props = withDefaults(
  defineProps<{
    // Cancel button text
    cancelText?: string;
    // Checkable Node Selection under Status is fully controlled
    checkStrictly?: boolean;
    // Confirm Button Text
    confirmText?: string;
    // Whether multiple options are supported
    multiple?: boolean;
    // Title
    title?: string;
  }>(),
  {
    cancelText: 'Cancel',
    checkStrictly: false,
    confirmText: 'Confirm',
    multiple: true,
    title: 'Sectoral selection',
  },
);

const emit = defineEmits<{
  confirm: [deptList: SystemDeptApi.Dept[]];
}>();

type checkedKeys = number[] | { checked: number[]; halfChecked: number[] };
// Sector tree structure
const deptTree = ref<DataNode[]>([]);
// Selected Sector ID List
const selectedDeptIds = ref<checkedKeys>([]);
// Sectoral data
const deptData = ref<SystemDeptApi.Dept[]>([]);

// Dialog Configuration
const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    // Get Selected Sector ID
    const selectedIds: number[] = Array.isArray(selectedDeptIds.value)
      ? selectedDeptIds.value
      : selectedDeptIds.value.checked || [];
    const deptArray = deptData.value.filter((dept) =>
      selectedIds.includes(dept.id!),
    );
    emit('confirm', deptArray);
    // Close and hint
    await modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      deptTree.value = [];
      selectedDeptIds.value = [];
      return;
    }
    // Loading data
    const data = modalApi.getData();
    if (!data) {
      return;
    }
    modalApi.lock();
    try {
      deptData.value = await getSimpleDeptList();
      deptTree.value = handleTree(deptData.value) as DataNode[];
      // / / Set the selected department
      if (data.selectedList?.length) {
        const selectedIds = data.selectedList
          .map((dept: SystemDeptApi.Dept) => dept.id)
          .filter((id: number) => id !== undefined);
        selectedDeptIds.value = props.checkStrictly
          ? {
              checked: selectedIds,
              halfChecked: [],
            }
          : selectedIds;
      }
    } finally {
      modalApi.unlock();
    }
  },
  destroyOnClose: true,
});

/** Process selected status changes */
function handleCheck() {
  if (!props.multiple) {
    // Only the last selected nodes will be retained under single mode
    if (Array.isArray(selectedDeptIds.value)) {
      const lastSelectedId =
        selectedDeptIds.value[selectedDeptIds.value.length - 1];
      if (lastSelectedId) {
        selectedDeptIds.value = [lastSelectedId];
      }
    } else {
      // CheckStartly is an object when it's true
      const checked = selectedDeptIds.value.checked || [];
      if (checked.length > 0) {
        const lastSelectedId = checked[checked.length - 1];
        selectedDeptIds.value = {
          checked: [lastSelectedId!],
          halfChecked: [],
        };
      }
    }
  }
}
</script>
<template>
  <Modal :title="title" key="dept-select-modal" class="w-2/5">
    <Row class="h-full">
      <Col :span="24">
        <Card class="h-full">
          <Tree
            :tree-data="deptTree"
            v-if="deptTree.length > 0"
            v-model:checked-keys="selectedDeptIds"
            :checkable="true"
            :check-strictly="checkStrictly"
            :field-names="{ title: 'name', key: 'id' }"
            :default-expand-all="true"
            @check="handleCheck"
          />
        </Card>
      </Col>
    </Row>
  </Modal>
</template>