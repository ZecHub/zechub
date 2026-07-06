<script lang="ts" setup>
import type { Key } from 'ant-design-vue/es/table/interface';

import type { SystemDeptApi } from '#/api/system/dept';
import type { SystemUserApi } from '#/api/system/user';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { handleTree } from '@vben/utils';

import {
  Button,
  Col,
  Input,
  message,
  Pagination,
  Row,
  Transfer,
  Tree,
} from 'ant-design-vue';

import { getSimpleDeptList } from '#/api/system/dept';
import { getUserPage } from '#/api/system/user';

// Sector Tree Node Interface
interface DeptTreeNode {
  key: string;
  title: string;
  children?: DeptTreeNode[];
  name: string;
}

defineOptions({ name: 'UserSelectModal' });

withDefaults(
  defineProps<{
    cancelText?: string;
    confirmText?: string;
    multiple?: boolean;
    title?: string;
    value?: number[];
  }>(),
  {
    title: 'Select User',
    multiple: true,
    value: () => [],
    confirmText: 'Sure.',
    cancelText: 'Cancel',
  },
);

const emit = defineEmits<{
  cancel: [];
  closed: [];
  confirm: [value: SystemUserApi.User[]];
  'update:value': [value: number[]];
}>();

// Sectoral tree data
const deptTree = ref<any[]>([]);
const deptList = ref<SystemDeptApi.Dept[]>([]);
const expandedKeys = ref<Key[]>([]);
const selectedDeptId = ref<number>();
const deptSearchKeys = ref('');

// User data management
const userList = ref<SystemUserApi.User[]>([]); // Store all known users
const selectedUserIds = ref<string[]>([]);

// Popup Window Configuration
const [Modal, modalApi] = useVbenModal({
  onCancel: handleCancel,
  onClosed: handleClosed,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      resetData();
      return;
    }
    // Loading data
    const data = modalApi.getData();
    if (!data) {
      return;
    }
    modalApi.lock();
    try {
      // Load sector data
      const deptData = await getSimpleDeptList();
      deptList.value = deptData;
      const treeData = handleTree(deptData);
      deptTree.value = treeData.map((node) => processDeptNode(node));
      expandedKeys.value = deptTree.value.map((node) => node.key);

      // Load initial user data
      await loadUserData(1, leftListState.value.pagination.pageSize);

      // Setup Selected Users
      if (data.userIds?.length) {
        selectedUserIds.value = data.userIds.map(String);
        // Loading complete information on selected users ToDO currently does not support multiple user ID queries and requires backend support
        const { list } = await getUserPage({
          pageNo: 1,
          pageSize: 100, // Use fixed values on a temporary basis to ensure that all selected users can be loaded
          userIds: data.userIds,
        });
        // Use Map to weigh with user ID as key
        const userMap = new Map(userList.value.map((user) => [user.id, user]));
        list.forEach((user) => {
          if (!userMap.has(user.id)) {
            userMap.set(user.id, user);
          }
        });
        userList.value = [...userMap.values()];
        updateRightListData();
      }

      modalApi.open();
    } finally {
      modalApi.unlock();
    }
  },
  destroyOnClose: true,
});

// Left List Status
const leftListState = ref({
  searchValue: '',
  dataSource: [] as SystemUserApi.User[],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
});

// Right List Status
const rightListState = ref({
  searchValue: '',
  dataSource: [] as SystemUserApi.User[],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
});

// Calculating property: Transfer data source
const transferDataSource = computed(() => {
  return [
    ...leftListState.value.dataSource,
    ...rightListState.value.dataSource,
  ];
});

// Filter sector tree data
const filteredDeptTree = computed(() => {
  if (!deptSearchKeys.value) return deptTree.value;

  const filterNode = (node: any, depth = 0): any => {
    // Add depth limits to prevent over-deep regression leading to the explosion of a warehouse
    if (depth > 100) return null;

    // Search by sector name
    const name = node?.name?.toLowerCase();
    const search = deptSearchKeys.value.toLowerCase();

    // If the current node matches, return directly to the node and do not process the sub-node
    if (name?.includes(search)) {
      return {
        ...node,
        children: node.children,
      };
    }

    // Check subpoints if the current node does not match
    if (node.children) {
      const filteredChildren = node.children
        .map((child: any) => filterNode(child, depth + 1))
        .filter(Boolean);

      if (filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren,
        };
      }
    }

    return null;
  };

  return deptTree.value.map((node: any) => filterNode(node)).filter(Boolean);
});

// Loading user data
async function loadUserData(pageNo: number, pageSize: number) {
  try {
    const { list, total } = await getUserPage({
      pageNo,
      pageSize,
      deptId: selectedDeptId.value,
      username: leftListState.value.searchValue || undefined,
    });

    leftListState.value.dataSource = list;
    leftListState.value.pagination.total = total;
    leftListState.value.pagination.current = pageNo;
    leftListState.value.pagination.pageSize = pageSize;

    // Update User List Cache
    const newUsers = list.filter(
      (user) => !userList.value.some((u) => u.id === user.id),
    );
    if (newUsers.length > 0) {
      userList.value.push(...newUsers);
    }
  } finally {
    //
  }
}

// Update Right List Data
function updateRightListData() {
  // Use Set to retick user ID
  const uniqueSelectedIds = new Set(selectedUserIds.value);

  // Retrieve the selected user to ensure that there is no repetition
  const selectedUsers = userList.value.filter((user) =>
    uniqueSelectedIds.has(String(user.id)),
  );

  // Apply Search Filter
  const filteredUsers = rightListState.value.searchValue
    ? selectedUsers.filter((user) =>
        user.nickname
          .toLowerCase()
          .includes(rightListState.value.searchValue.toLowerCase()),
      )
    : selectedUsers;

  // Update Total (Use Set to Ensure Monopoly)
  rightListState.value.pagination.total = new Set(
    filteredUsers.map((user) => user.id),
  ).size;

  // Apply Page Breaks
  const { current, pageSize } = rightListState.value.pagination;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  rightListState.value.dataSource = filteredUsers.slice(startIndex, endIndex);
}

// Handle left page break changes
async function handleLeftPaginationChange(page: number, pageSize: number) {
  await loadUserData(page, pageSize);
}

// Handle right page break changes
function handleRightPaginationChange(page: number, pageSize: number) {
  rightListState.value.pagination.current = page;
  rightListState.value.pagination.pageSize = pageSize;
  updateRightListData();
}

// Process user searches
async function handleUserSearch(direction: string, value: string) {
  if (direction === 'left') {
    leftListState.value.searchValue = value;
    leftListState.value.pagination.current = 1;
    await loadUserData(1, leftListState.value.pagination.pageSize);
  } else {
    rightListState.value.searchValue = value;
    rightListState.value.pagination.current = 1;
    updateRightListData();
  }
}

// Process user selection changes
function handleUserChange(targetKeys: string[]) {
  // Use Set to retick user ID
  selectedUserIds.value = [...new Set(targetKeys)];
  emit('update:value', selectedUserIds.value.map(Number));
  updateRightListData();
}

// Reset Data
function resetData() {
  userList.value = [];
  selectedUserIds.value = [];

  // Cancel sector selection
  selectedDeptId.value = undefined;

  // Uncheck the selected user
  selectedUserIds.value = [];

  leftListState.value = {
    searchValue: '',
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  };

  rightListState.value = {
    searchValue: '',
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  };
}

// The TODO backend interface currently supports only username searches, and the screening conditions need to be aligned with the parameters requested by the backend.
function filterOption(inputValue: string, option: any) {
  return option.username.toLowerCase().includes(inputValue.toLowerCase());
}

// Dealing with sector tree expansion/collapse
function handleExpand(keys: Key[]) {
  expandedKeys.value = keys;
}

// Processing Department Search
function handleDeptSearch(value: string) {
  deptSearchKeys.value = value;

  // Expand all nodes automatically if search results are available
  if (value) {
    const getAllKeys = (nodes: any[]): string[] => {
      const keys: string[] = [];
      for (const node of nodes) {
        keys.push(node.key);
        if (node.children) {
          keys.push(...getAllKeys(node.children));
        }
      }
      return keys;
    };
    expandedKeys.value = getAllKeys(deptTree.value);
  } else {
    // Only the first node is opened when the search is empty
    expandedKeys.value = deptTree.value.map((node) => node.key);
  }
}

// Process sector selection
async function handleDeptSelect(selectedKeys: Key[], _info: any) {
  // Update Selected Sector ID
  const newDeptId =
    selectedKeys.length > 0 ? Number(selectedKeys[0]) : undefined;
  selectedDeptId.value =
    newDeptId === selectedDeptId.value ? undefined : newDeptId;

  // Reset subpages and load data
  const { pageSize } = leftListState.value.pagination;
  leftListState.value.pagination.current = 1;
  await loadUserData(1, pageSize);
}

// Confirming Selection
function handleConfirm() {
  if (selectedUserIds.value.length === 0) {
    message.warning('Please select the user');
    return;
  }
  emit(
    'confirm',
    userList.value.filter((user) =>
      selectedUserIds.value.includes(String(user.id)),
    ),
  );
  modalApi.close();
}

// Unselect
function handleCancel() {
  emit('cancel');
  modalApi.close();
  // Ensure that data are reset after the animation is over
  setTimeout(() => {
    resetData();
  }, 300);
}

// Close the window.
function handleClosed() {
  emit('closed');
  resetData();
}

// Recursive processing sector tree nodes
function processDeptNode(node: any): DeptTreeNode {
  return {
    key: String(node.id),
    title: `${node.name} (${node.id})`,
    name: node.name,
    children: node.children?.map((child: any) => processDeptNode(child)),
  };
}
</script>

<template>
  <Modal class="w-2/5" key="user-select-modal" :title="title">
    <Row :gutter="[16, 16]">
      <Col :span="6">
        <div class="h-[500px] overflow-auto rounded border">
          <div class="border-b p-2">
            <Input
              v-model:value="deptSearchKeys"
              placeholder=""
              allow-clear
              @input="(e) => handleDeptSearch(e.target?.value ?? '')"
            />
          </div>
          <Tree
            :tree-data="filteredDeptTree"
            :expanded-keys="expandedKeys"
            :selected-keys="selectedDeptId ? [String(selectedDeptId)] : []"
            @select="handleDeptSelect"
            @expand="handleExpand"
          />
        </div>
      </Col>
      <Col :span="18">
        <Transfer
          :row-key="(record) => String(record.id)"
          :data-source="transferDataSource"
          v-model:target-keys="selectedUserIds"
          :titles="['No choice', 'chosen']"
          :show-search="true"
          :show-select-all="true"
          :filter-option="filterOption"
          @change="handleUserChange"
          @search="handleUserSearch"
        >
          <template #render="item">
            <span>{{ item?.nickname }} ({{ item?.username }})</span>
          </template>

          <template #footer="{ direction }">
            <div v-if="direction === 'left'">
              <Pagination
                v-model:current="leftListState.pagination.current"
                v-model:page-size="leftListState.pagination.pageSize"
                :total="leftListState.pagination.total"
                :show-size-changer="true"
                :show-total="(total) = ${total} Article(s) = Article(s) = Article(s) = Article(s) = Article(s) = Article(s) ${total}  Article(s) = Article(s) = Article(s) = Article(s) = Article(s) = Article(s) ${total}"
                size="small"
                @change="handleLeftPaginationChange"
              />
            </div>

            <div v-if="direction === 'right'">
              <Pagination
                v-model:current="rightListState.pagination.current"
                v-model:page-size="rightListState.pagination.pageSize"
                :total="rightListState.pagination.total"
                :show-size-changer="true"
                :show-total="(total) = ${total} Article(s) = Article(s) = Article(s) = Article(s) = Article(s) = Article(s) ${total}  Article(s) = Article(s) = Article(s) = Article(s) = Article(s) = Article(s) ${total}"
                size="small"
                @change="handleRightPaginationChange"
              />
            </div>
          </template>
        </Transfer>
      </Col>
    </Row>
    <template #footer>
      <Button
        type="primary"
        :disabled="selectedUserIds.length === 0"
        @click="handleConfirm"
      >
        {{ confirmText }}
      </Button>
      <Button @click="handleCancel">{{ cancelText }}</Button>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
:deep(.ant-transfer) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 500px;
}

:deep(.ant-transfer-list) {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 300px !important;
  height: 100%;
}

:deep(.ant-transfer-list-header) {
  flex-shrink: 0;
}

:deep(.ant-transfer-list-search) {
  flex-shrink: 0;
  padding: 8px;
}

:deep(.ant-transfer-list-body) {
  flex: 1;
  overflow: auto;
}

:deep(.ant-transfer-list-content) {
  height: auto !important;
}

:deep(.ant-transfer-list-content-item) {
  padding: 6px 12px;
}

:deep(.ant-transfer-operation) {
  padding: 0 8px;
}

:deep(.ant-transfer-list-footer) {
  flex-shrink: 0;
}

:deep(.ant-pagination) {
  margin: 8px;
  font-size: 12px;
  text-align: right;
}

:deep(.ant-pagination-options) {
  margin-left: 8px;
}

:deep(.ant-pagination-options-size-changer) {
  margin-right: 8px;
}
</style>
