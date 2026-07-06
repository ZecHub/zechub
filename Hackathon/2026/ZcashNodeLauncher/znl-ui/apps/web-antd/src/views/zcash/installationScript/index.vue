<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ZcashInstallationScriptApi } from '#/api/zcash/installationScript';

import { ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteInstallationScript,
  deleteInstallationScriptList,
  exportInstallationScript,
  getInstallationScriptPage,
} from '#/api/zcash/installationScript';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** Refresh table */
function handleRefresh() {
  gridApi.query();
}

/** Create Installation script */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** Edit Installation script */
function handleEdit(row: ZcashInstallationScriptApi.InstallationScript) {
  formModalApi.setData(row).open();
}

/** Delete Installation script */
async function handleDelete(
  row: ZcashInstallationScriptApi.InstallationScript,
) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
  });
  try {
    await deleteInstallationScript(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** Batch delete Installation script */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteInstallationScriptList(checkedIds.value);
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
  records: ZcashInstallationScriptApi.InstallationScript[];
}) {
  checkedIds.value = records.map((item) => item.id!);
}

/** Export table */
async function handleExport() {
  const data = await exportInstallationScript(
    await gridApi.formApi.getValues(),
  );
  downloadFileFromBlobPart({
    fileName: 'Installation Script.xls',
    source: data,
  });
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    collapsed: true,
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getInstallationScriptPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
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
  } as VxeTableGridOptions<ZcashInstallationScriptApi.InstallationScript>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="Installation Script List">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['Installation script']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['zcash:installation-script:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['zcash:installation-script:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['zcash:installation-script:delete'],
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
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['zcash:installation-script:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['zcash:installation-script:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.id]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
