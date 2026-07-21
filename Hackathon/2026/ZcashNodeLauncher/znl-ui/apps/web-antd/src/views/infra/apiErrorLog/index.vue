<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { InfraApiErrorLogApi } from '#/api/infra/api-error-log';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { InfraApiErrorLogProcessStatusEnum } from '@vben/constants';
import { downloadFileFromBlobPart } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  exportApiErrorLog,
  getApiErrorLogPage,
  updateApiErrorLogStatus,
} from '#/api/infra/api-error-log';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Detail from './modules/detail.vue';

const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: Detail,
  destroyOnClose: true,
});

/** Refresh Table */
function handleRefresh() {
  gridApi.query();
}

/** Export Table */
async function handleExport() {
  const data = await exportApiErrorLog(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: 'API error log.xls', source: data });
}

/** View API error log details */
function handleDetail(row: InfraApiErrorLogApi.ApiErrorLog) {
  detailModalApi.setData(row).open();
}

/** Process processed / ignored operations */
async function handleProcess(id: number, processStatus: number) {
  await confirm({
    content: `Confirm mark as ${InfraApiErrorLogProcessStatusEnum.DONE ? 'Handled' : 'Ignored'}?`,
  });
  const hideLoading = message.loading({
    content: 'Processing...',
    duration: 0,
  });
  try {
    await updateApiErrorLogStatus(id, processStatus);
    message.success($t('ui.actionMessage.operationSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getApiErrorLogPage({
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
  } as VxeTableGridOptions<InfraApiErrorLogApi.ApiErrorLog>,
});
</script>

<template>
  <Page auto-content-height>
    <DetailModal @success="handleRefresh" />
    <Grid table-title="API Error Log List">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['infra:api-error-log:export'],
              onClick: handleExport,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.detail'),
              type: 'link',
              icon: ACTION_ICON.VIEW,
              auth: ['infra:api-error-log:query'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: 'Processed',
              type: 'link',
              icon: ACTION_ICON.ADD,
              auth: ['infra:api-error-log:update-status'],
              ifShow:
                row.processStatus === InfraApiErrorLogProcessStatusEnum.INIT,
              onClick: handleProcess.bind(
                null,
                row.id,
                InfraApiErrorLogProcessStatusEnum.DONE,
              ),
            },
            {
              label: 'Ignored',
              type: 'link',
              icon: ACTION_ICON.DELETE,
              auth: ['infra:api-error-log:update-status'],
              ifShow:
                row.processStatus === InfraApiErrorLogProcessStatusEnum.INIT,
              onClick: handleProcess.bind(
                null,
                row.id,
                InfraApiErrorLogProcessStatusEnum.IGNORE,
              ),
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
