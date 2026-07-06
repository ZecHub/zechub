<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDeptApi } from '#/api/system/dept';

import { ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDept, deleteDeptList, getDeptList } from '#/api/system/dept';
import { $t } from '#/locales';

import { useGridColumns } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** Toggle tree expansion/condensation state */
const isExpanded = ref(true);
function handleExpand() {
  isExpanded.value = !isExpanded.value;
  gridApi.grid.setAllTreeExpand(isExpanded.value);
}

/** Refresh Table */
function handleRefresh() {
  gridApi.query();
}

/** Create Department */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** Add Subsector */
function handleAppend(row: SystemDeptApi.Dept) {
  formModalApi.setData({ parentId: row.id }).open();
}

/** Editorial department */
function handleEdit(row: SystemDeptApi.Dept) {
  formModalApi.setData(row).open();
}

/** Delete Department */
async function handleDelete(row: SystemDeptApi.Dept) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
  });
  try {
    await deleteDept(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** Bulk Remove Sectors */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteDeptList(checkedIds.value);
    checkedIds.value = [];
    message.success($t('ui.actionMessage.deleteSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({
  records,
}: {
  records: SystemDeptApi.Dept[];
}) {
  checkedIds.value = records.map((item) => item.id!);
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => {
          return await getDeptList();
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
    treeConfig: {
      parentField: 'parentId',
      rowField: 'id',
      transform: true,
      expandAll: true,
      reserve: true,
    },
  } as VxeTableGridOptions<SystemDeptApi.Dept>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="Sector List">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['Sector']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['system:dept:create'],
              onClick: handleCreate,
            },
            {
              label: isExpanded ? 'Shrink' : 'Expand',
              type: 'primary',
              onClick: handleExpand,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['system:dept:delete'],
              disabled: isEmpty(checkedIds),
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: 'Add Sublevel',
              type: 'link',
              icon: ACTION_ICON.ADD,
              auth: ['system:dept:create'],
              onClick: handleAppend.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['system:dept:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['system:dept:delete'],
              disabled: row.children && row.children.length > 0,
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.name]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>