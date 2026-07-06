<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ZcashNodeServerApi } from '#/api/zcash/nodeServer';

import { computed, onMounted, ref } from 'vue';

import { confirm, Page, Status, useVbenModal } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import {
  Card,
  Descriptions,
  message,
  Select,
  SelectOption,
  Textarea,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteNodeServer,
  deleteNodeServerList,
  exportNodeServer,
  getInstallationScripts,
  getNodeServerPage,
  installNodeServer,
  refreshNodeServerStatus,
  startNodeServer,
  stopNodeServer,
  uninstallNodeServer,
} from '#/api/zcash/nodeServer';
import { $t } from '#/locales';

import {
  INSTALLATION_STATUS,
  NODE_STATUS,
  SERVER_STATUS,
  useGridColumns,
  useGridFormSchema,
} from './data';
import Form from './modules/form.vue';

const operationInProgress = ref(false);
const needReload = ref(false);

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const showStatusRow = ref<null | undefined | ZcashNodeServerApi.NodeServer>(
  null,
);

const [ShowStatusModal, showStatusModalApi] = useVbenModal({
  title: 'Status',
  showConfirmButton: false,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      showStatusRow.value = undefined;
      return;
    }
    // Load data
    showStatusModalApi.lock();
    try {
      // load data
    } finally {
      showStatusModalApi.unlock();
    }
  },
});

const installingNodeServer = ref<any>(null);
const selectedNodeType = ref<null | string>(null);

const [InstallationModal, installationModalApi] = useVbenModal({
  title: 'Install',
  async onConfirm() {
    // Load data
    installationModalApi.lock();
    try {
      if (selectedNodeType.value == null) {
        message.error('Please select node type. ');
        return;
      }

      if (installationScript.value == null) {
        message.error('Please select installation script. ');
        return;
      }

      // load data
      await confirm('Confirm install node?');
      if (operationInProgress.value) {
        message.error('Operation in progress, please try again later. ');
        return;
      }

      needReload.value = true;
      operationInProgress.value = true;
      const hideLoading = message.loading({
        content: $t('Installing...'),
        duration: 0,
      });
      try {
        await installNodeServer({
          id: installingNodeServer.value.id,
          nodeType: selectedNodeType.value,
          installationScriptType: installationScriptType.value,
          instalationScript: `${installationScript.value}`,
        });
        message.success($t('Installed'));
        needReload.value = false;
        installationModalApi.close();
        handleRefresh();
      } finally {
        hideLoading();
        operationInProgress.value = false;
      }
    } finally {
      installationModalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      installingNodeServer.value = undefined;
      selectedNodeType.value = null;
      installationScript.value = undefined;
      if (needReload.value) {
        gridApi.reload();
        needReload.value = false;
      }
    }
    // Load data
  },
});

/** Refresh table */
function handleRefresh() {
  gridApi.query();
}

/** Create node server */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** Edit node server */
function handleEdit(row: ZcashNodeServerApi.NodeServer) {
  formModalApi.setData(row).open();
}

/** Delete node server */
async function handleDelete(row: ZcashNodeServerApi.NodeServer) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name || row.host]),
    duration: 0,
  });
  try {
    await deleteNodeServer(row.id!);
    message.success(
      $t('ui.actionMessage.deleteSuccess', [row.name || row.host]),
    );
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** Batch delete node server */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteNodeServerList(checkedIds.value);
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
  records: ZcashNodeServerApi.NodeServer[];
}) {
  checkedIds.value = records.map((item) => item.id!);
}

/** Export table */
async function handleExport() {
  const data = await exportNodeServer(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({
    fileName: 'Node Server.xls',
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
          return await getNodeServerPage({
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
  } as VxeTableGridOptions<ZcashNodeServerApi.NodeServer>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});

function formatTime(timestamp) {
  if (!timestamp) return '-';
  // 'x'
  return dayjs(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss');
}

/** Start node */
async function handleStartNode(row: ZcashNodeServerApi.NodeServer) {
  if (operationInProgress.value) {
    message.error('Operation in progress, please try again later. ');
    return;
  }
  operationInProgress.value = true;
  const hideLoading = message.loading({
    content: $t('Starting...'),
    duration: 0,
  });
  try {
    await startNodeServer(row);
    message.success($t('Started'));
    handleRefresh();
  } finally {
    operationInProgress.value = false;
    hideLoading();
  }
}

/** Stop node */
async function handleStopNode(row: ZcashNodeServerApi.NodeServer) {
  await confirm('Confirm stop node(Docker container)?');

  if (operationInProgress.value) {
    message.error('Operation in progress, please try again later. ');
    return;
  }
  operationInProgress.value = true;
  const hideLoading = message.loading({
    content: $t('Stopping...'),
    duration: 0,
  });
  try {
    await stopNodeServer(row);
    message.success($t('Stopped'));
    handleRefresh();
  } finally {
    hideLoading();
    operationInProgress.value = false;
  }
}

/** Refresh node status */
async function handleRefreshStatus(row: ZcashNodeServerApi.NodeServer) {
  if (operationInProgress.value) {
    message.error('Operation in progress, please try again later. ');
    return;
  }
  operationInProgress.value = true;
  const hideLoading = message.loading({
    content: $t('Refreshing...'),
    duration: 0,
  });
  try {
    await refreshNodeServerStatus(row);
    message.success($t('Refresh Successful'));
    handleRefresh();
  } finally {
    hideLoading();
    operationInProgress.value = false;
  }
}

/** To monitor view */
function handleShowStatus(row: ZcashNodeServerApi.NodeServer) {
  showStatusRow.value = row;
  showStatusModalApi.open();
}

/** Install node */
async function handleInstallNode(row: ZcashNodeServerApi.NodeServer) {
  installingNodeServer.value = row;
  installationModalApi.open();
}

/** Uninstall node */
async function handleUninstallNode(row: ZcashNodeServerApi.NodeServer) {
  await confirm('Confirm uninstall node?');

  if (operationInProgress.value) {
    message.error('Operation in progress, please try again later. ');
    return;
  }
  operationInProgress.value = true;
  const hideLoading = message.loading({
    content: $t('Uninstalling...'),
    duration: 0,
  });
  try {
    await uninstallNodeServer(row);
    message.success($t('Uninstalled'));
    handleRefresh();
  } finally {
    hideLoading();
    operationInProgress.value = false;
  }
}

function cardClass(nodeType: string) {
  if (nodeType == null) {
    return 'nodeTypeCard';
  }

  if (nodeType == selectedNodeType.value) {
    return 'nodeTypeCard selected';
  }

  if (nodeType == 'Pruning Node') {
    return 'nodeTypeCard disabled';
  }

  return 'nodeTypeCard';
}

function selectNodeType(nodeType: string) {
  if (nodeType == 'Pruning Node') {
    selectedNodeType.value = null;
    message.error(
      'Zcashd is deprecated, and Zebra does not support pruning mode at the moment.',
    );
    return;
  }
  if (selectedNodeType.value == nodeType) {
    selectedNodeType.value = null;
    return;
  }

  selectedNodeType.value = nodeType;
}

const installationScriptType = ref<string | undefined>('Internal');
const installationScript = ref<string | undefined>(undefined);
const internalInstallationScripts = ref<any[]>([]);
const customInstallationScripts = ref<any[]>([]);
const installationScripts = computed(() => {
  if (installationScriptType.value == null) {
    return [];
  }
  if (installationScriptType.value == 'Internal') {
    return internalInstallationScripts.value;
  }
  if (installationScriptType.value == 'Custom') {
    return customInstallationScripts.value;
  }

  return [];
});

function onInstallationScriptTypeChange() {
  installationScript.value = undefined;
}

onMounted(async () => {
  const res = await getInstallationScripts({});
  internalInstallationScripts.value = res?.internalInstallationScripts || [];
  customInstallationScripts.value = res?.customInstallationScripts || [];
});
</script>

<template>
  <Page auto-content-height class="node-server-page">
    <FormModal @success="handleRefresh" />
    <InstallationModal class="w-5/12">
      <div class="installation-modal">
        <div v-if="false" class="title">Please select node type:</div>
        <div class="nodeTypes">
          <table>
            <tbody>
              <tr>
                <td>
                  <Card
                    :class="cardClass('Pruning Node')"
                    @click="selectNodeType('Pruning Node')"
                  >
                    <template #title>
                      <div class="title">
                        <IconifyIcon icon="carbon:bare-metal-server-01" />
                        <div>Pruning Node</div>
                        <div style="font-size: 0.6em">
                          Minmium Resource Usage
                        </div>
                      </div>
                    </template>
                    <div class="pruning-mode-requirement cpu">
                      <IconifyIcon icon="carbon:iot-connect" />2 CPU
                    </div>
                    <div class="pruning-mode-requirement memory">
                      <IconifyIcon icon="carbon:parameter" />4GB RAM
                    </div>
                    <div class="pruning-mode-requirement disk">
                      <IconifyIcon icon="carbon:vmdk-disk" />20GB Disk
                    </div>
                    <div class="pruning-mode-requirement bandwidth">
                      <IconifyIcon icon="carbon:content-delivery-network" />
                      10Mbps Bandwidth
                    </div>
                    <div class="pruning-mode-requirement wallet">
                      <IconifyIcon icon="carbon:wallet" />No Wallet
                    </div>
                    <div class="pruning-mode-requirement history">
                      <IconifyIcon icon="carbon:data-base-alt" />No History Data
                    </div>
                  </Card>
                </td>
                <td>
                  <Card
                    :class="cardClass('Full Node')"
                    @click="selectNodeType('Full Node')"
                  >
                    <template #title>
                      <div class="title">
                        <IconifyIcon
                          icon="carbon:ibm-cloud-bare-metal-server"
                        />
                        <div>Full Node</div>
                        <div style="font-size: 0.6em">Maximium Features</div>
                      </div>
                    </template>
                    <div class="full-mode-requirement cpu">
                      <IconifyIcon icon="carbon:iot-connect" />4 CPU
                    </div>
                    <div class="full-mode-requirement memory">
                      <IconifyIcon icon="carbon:parameter" />8GB RAM
                    </div>
                    <div class="full-mode-requirement disk">
                      <IconifyIcon icon="carbon:vmdk-disk" />500GB Disk
                    </div>
                    <div class="full-mode-requirement bandwidth">
                      <IconifyIcon icon="carbon:content-delivery-network" />
                      10Mbps Bandwidth
                    </div>
                    <div class="full-mode-requirement wallet">
                      <IconifyIcon icon="carbon:wallet" />Wallet
                    </div>
                    <div class="full-mode-requirement history">
                      <IconifyIcon icon="carbon:data-base-alt" />History Data
                    </div>
                  </Card>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="false" class="title">Please select installation script:</div>
        <div class="title">
          <table style="width: 100%">
            <tbody>
              <tr>
                <td class="w-3/12">
                  <Select
                    style="width: 100%"
                    v-model:value="installationScriptType"
                    :allow-clear="true"
                    @change="onInstallationScriptTypeChange"
                  >
                    <SelectOption value="Internal">Internal</SelectOption>
                    <SelectOption value="Custom">Custom</SelectOption>
                  </Select>
                </td>
                <td class="w-9/12">
                  <Select
                    style="width: 100%"
                    v-model:value="installationScript"
                    :options="installationScripts"
                    :dropdown-match-select-width="false"
                    placeholder="Please select installation script"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <!-- <Input v-model:value="value4" style="width: 50%" /> -->
        </div>
      </div>
    </InstallationModal>
    <ShowStatusModal class="w-5/12">
      <div v-if="showStatusRow != null">
        <Descriptions
          layout="vertical"
          :column="24"
          bordered
          :label-style="{ textAlign: 'center' }"
        >
          <Descriptions.Item label="Server Status" :span="12">
            <div class="t-center">
              <Status
                :value="showStatusRow.serverStatus"
                :status-definitions="SERVER_STATUS"
              >
                <template #tooltip="{ currentStatus }">
                  <div v-if="currentStatus != null">
                    {{ currentStatus.label || currentStatus.value }}
                    <template
                      v-if="showStatusRow.serverStatusCheckTime != null"
                    >
                      <br />{{
                        formatTime(showStatusRow.serverStatusCheckTime)
                      }}
                    </template>
                  </div>
                </template>
              </Status>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Server Status Check Time" :span="12">
            {{ formatTime(showStatusRow.serverStatusCheckTime) }}
          </Descriptions.Item>

          <Descriptions.Item
            label="Server Error (Connect to server error)"
            :span="24"
          >
            <div style="min-height: 3em">
              <Textarea
                :rows="8"
                disabled
                v-model:value="showStatusRow.serverError"
              />
            </div>
            <div
              v-if="
                showStatusRow.serverError != null &&
                showStatusRow.serverError.includes(
                  'No more authentication methods available',
                )
              "
              style="color: orange"
            >
              If your password is corrected, but still cannot connect to the
              server, try add the following config to /etc/ssh/sshd_config:
              <br />
              sudo nano /etc/ssh/sshd_config<br />
              MaxStartups 100:30:200<br />
              sudo systemctl restart sshd<br />
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label="Installation Status"
            :span="12"
            :label-style="{ textAlign: 'center' }"
          >
            <div class="t-center">
              <Status
                :value="showStatusRow.installationStatus"
                :status-definitions="INSTALLATION_STATUS"
              >
                <template #tooltip="{ currentStatus }">
                  <div v-if="currentStatus != null">
                    {{ currentStatus.label || currentStatus.value }}
                    <template
                      v-if="showStatusRow.installationStatusCheckTime != null"
                    >
                      <br />{{
                        formatTime(showStatusRow.installationStatusCheckTime)
                      }}
                    </template>
                  </div>
                </template>
              </Status>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Installation Status Check Time" :span="12">
            {{ formatTime(showStatusRow.installationStatusCheckTime) }}
          </Descriptions.Item>

          <Descriptions.Item label="Installation Log" :span="24">
            <div>
              <Textarea
                :rows="8"
                disabled
                v-model:value="showStatusRow.installationLog"
              />
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label="Node Status"
            :span="12"
            :label-style="{ textAlign: 'center' }"
          >
            <div class="t-center">
              <Status
                :value="showStatusRow.nodeStatus"
                :status-definitions="NODE_STATUS"
              >
                <template #tooltip="{ currentStatus }">
                  <div v-if="currentStatus != null">
                    {{ currentStatus.label || currentStatus.value }}
                    <template v-if="showStatusRow.nodeStatusCheckTime != null">
                      <br />{{ formatTime(showStatusRow.nodeStatusCheckTime) }}
                    </template>
                  </div>
                </template>
              </Status>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Node Status Check Time" :span="12">
            {{ formatTime(showStatusRow.installationStatusCheckTime) }}
          </Descriptions.Item>

          <Descriptions.Item
            label="Node Error (Start / Stop output)"
            :span="24"
          >
            <div style="min-height: 3em">
              <Textarea
                :rows="8"
                disabled
                v-model:value="showStatusRow.nodeError"
              />
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </ShowStatusModal>

    <Grid table-title="Node Server List">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['Node Server']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['zcash:node-server:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['zcash:node-server:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['zcash:node-server:delete'],
              disabled: isEmpty(checkedIds),
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>

      <template #serverStatus="{ row }">
        <Status :value="row.serverStatus" :status-definitions="SERVER_STATUS">
          <template #tooltip="{ currentStatus }">
            <div v-if="currentStatus != null">
              {{ currentStatus.label || currentStatus.value }}
              <template v-if="row.serverStatusCheckTime != null">
                <br />{{ formatTime(row.serverStatusCheckTime) }}
              </template>
            </div>
          </template>
        </Status>
      </template>

      <template #installationStatus="{ row }">
        <Status
          :value="row.installationStatus"
          :status-definitions="INSTALLATION_STATUS"
        >
          <template #tooltip="{ currentStatus }">
            <div v-if="currentStatus != null">
              {{ currentStatus.label || currentStatus.value }}
              <template v-if="row.installationStatusCheckTime != null">
                <br />{{ formatTime(row.installationStatusCheckTime) }}
              </template>
            </div>
          </template>
        </Status>
      </template>

      <template #nodeStatus="{ row }">
        <Status :value="row.nodeStatus" :status-definitions="NODE_STATUS">
          <template #tooltip="{ currentStatus }">
            <div v-if="currentStatus != null">
              {{ currentStatus.label || currentStatus.value }}
              <template v-if="row.nodeStatusCheckTime != null">
                <br />{{ formatTime(row.nodeStatusCheckTime) }}
              </template>
            </div>
          </template>
        </Status>
      </template>

      <template #actions="{ row }">
        <TableAction
          overlay-class-name="node-server-actions-dropdown"
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['zcash:node-server:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['zcash:node-server:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.name]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
          :drop-down-actions="[
            {
              label: 'Start',
              type: 'default',
              color: 'error',
              auth: ['zcash:node-server:start'],
              onClick: handleStartNode.bind(null, row),
              icon: 'carbon:play-filled-alt',
            },
            {
              label: 'Stop',
              type: 'link',
              auth: ['zcash:node-server:stop'],
              onClick: handleStopNode.bind(null, row),
              icon: 'carbon:stop-filled-alt',
            },
            {
              label: 'Refresh Status',
              type: 'link',
              auth: ['zcash:node-server:refresh-status'],
              onClick: handleRefreshStatus.bind(null, row),
              icon: 'carbon:data-view',
            },
            {
              label: 'Show Status',
              type: 'link',
              auth: ['zcash:node-server:show-status'],
              onClick: handleShowStatus.bind(null, row),
              icon: 'carbon:cloud-monitoring',
            },
            {
              label: 'Install',
              type: 'link',
              auth: ['zcash:node-server:install'],
              onClick: handleInstallNode.bind(null, row),
              icon: 'carbon:ibm-cloud-virtual-server-classic',
            },
            {
              label: 'Uninstall',
              type: 'link',
              auth: ['zcash:node-server:uninstall'],
              onClick: handleUninstallNode.bind(null, row),
              icon: 'carbon:trash-can',
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>

<style lang="scss" scoped>
.t-center {
  text-align: center;
}
.installation-modal {
  .title {
    margin: 1em;
  }
}
.nodeTypes {
  table {
    width: 100%;
  }
  td {
    padding: 0.5em 1em;
  }
  text-align: center;
  svg {
    display: inline-block;
    margin: 0 0.5em;
  }
  font-weight: 600;
  .pruning-mode-requirement {
    margin: 1em 0;
    &.cpu,
    &.memory,
    &.disk,
    &.bandwidth {
      /**color: green;*/
      color: grey;
    }
    &.wallet,
    &.history {
      /*color: orange;*/
      color: grey;
    }
  }

  .full-mode-requirement {
    margin: 1em 0;
    &.cpu,
    &.memory,
    &.disk {
      color: orange;
    }
    &.bandwidth,
    &.wallet,
    &.history {
      color: green;
    }
  }
}
.Requirement {
  width: 8em;
}

.nodeTypeCard.disabled {
  color: grey;
}
.nodeTypeCard:not(.disabled) {
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &.selected {
    box-shadow: 0px 0px 5px rgba(34, 244, 118, 0.633);
  }
}
.nodeTypeCard:not(.disabled):hover {
  box-shadow: 0px 0px 5px rgba(34, 244, 118, 0.423);
  &.selected {
    box-shadow: 0px 0px 5px rgba(34, 244, 118, 0.633);
  }
}
</style>

<style lang="scss">
.node-server-actions-dropdown {
  .ant-dropdown-menu {
    /*width: 200px;*/
    svg {
      display: inline-block;
    }
  }
}
</style>
