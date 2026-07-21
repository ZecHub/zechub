<script lang="ts" setup>
import type { SystemDeptApi } from '#/api/system/dept';

import { onMounted, ref } from 'vue';

import { IconifyIcon } from '@vben/icons';
import { handleTree } from '@vben/utils';

import { Input, Spin, Tree } from 'ant-design-vue';

import { getSimpleDeptList } from '#/api/system/dept';

const emit = defineEmits(['select']);
const deptList = ref<SystemDeptApi.Dept[]>([]); // Sector List
const deptTree = ref<any[]>([]); // Sector tree
const expandedKeys = ref<number[]>([]); // Expanding Nodes
const loading = ref(false); // Loading State
const searchValue = ref(''); // Search value

/** Process search logic */
function handleSearch(e: any) {
  const value = e.target.value;
  searchValue.value = value;
  const filteredList = value
    ? deptList.value.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      )
    : deptList.value;
  deptTree.value = handleTree(filteredList);
  // Expand All Nodes
  expandedKeys.value = deptTree.value.map((node) => node.id!);
}

/** Selected sectors */
function handleSelect(_selectedKeys: any[], info: any) {
  emit('select', info.node.dataRef);
}

/** Initialization */
onMounted(async () => {
  try {
    loading.value = true;
    const data = await getSimpleDeptList();
    deptList.value = data;
    deptTree.value = handleTree(data);
  } catch (error) {
    console.error('Failed to obtain departmental data', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <Input
      placeholder=""
      allow-clear
      v-model:value="searchValue"
      @change="handleSearch"
      class="w-full"
    >
      <template #prefix>
        <IconifyIcon icon="lucide:search" class="size-4" />
      </template>
    </Input>
    <Spin :spinning="loading" wrapper-class-name="w-full">
      <Tree
        @select="handleSelect"
        v-if="deptTree.length > 0"
        class="pt-2"
        :tree-data="deptTree"
        :default-expand-all="true"
        :field-names="{ title: 'name', key: 'id', children: 'children' }"
      />
      <div v-else-if="!loading" class="py-4 text-center text-gray-500">
        Data not available
      </div>
    </Spin>
  </div>
</template>
