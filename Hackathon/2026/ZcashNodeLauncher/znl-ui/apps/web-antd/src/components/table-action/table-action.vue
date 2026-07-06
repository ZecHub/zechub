<!-- add by  vben2 ♪ The way  TableAction Component -->
<script setup lang="ts">
import type { PropType } from 'vue';

import type { ActionItem, PopConfirm } from './typing';

import { computed, unref, watch } from 'vue';

import { useAccess } from '@vben/access';
import { IconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';
import { isBoolean, isFunction } from '@vben/utils';

import {
  Button,
  Dropdown,
  Menu,
  Popconfirm,
  Space,
  Tooltip,
} from 'ant-design-vue';

const props = defineProps({
  actions: {
    type: Array as PropType<ActionItem[]>,
    default() {
      return [];
    },
  },
  dropDownActions: {
    type: Array as PropType<ActionItem[]>,
    default() {
      return [];
    },
  },
  divider: {
    type: Boolean,
    default: true,
  },
  overlayClassName: {
    type: String,
    default: null,
  },
});

const { hasAccessByCodes } = useAccess();

/** Check whether to display */
function isIfShow(action: ActionItem): boolean {
  const ifShow = action.ifShow;
  let isIfShow = true;
  if (isBoolean(ifShow)) {
    isIfShow = ifShow;
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(action);
  }
  if (isIfShow) {
    isIfShow =
      hasAccessByCodes(action.auth || []) || (action.auth || []).length === 0;
  }
  return isIfShow;
}

/** Handle buttons actions */
const getActions = computed(() => {
  const actions = props.actions || [];
  return actions.filter((action: ActionItem) => isIfShow(action));
});

/** Handle Pull Menu actions */
const getDropdownList = computed(() => {
  const dropDownActions = props.dropDownActions || [];
  return dropDownActions.filter((action: ActionItem) => isIfShow(action));
});

/** size of the Space component */
const spaceSize = computed(() => {
  const actions = unref(getActions);
  return actions?.some((item: ActionItem) => item.type === 'link') ? 0 : 8;
});

/** Fetch PopConform Properties */
function getPopConfirmProps(popConfirm: PopConfirm) {
  if (!popConfirm) return {};

  const attrs: Record<string, any> = {};

  // Copy Basic Properties, Exclude Functions
  Object.keys(popConfirm).forEach((key) => {
    if (key !== 'confirm' && key !== 'cancel' && key !== 'icon') {
      attrs[key] = popConfirm[key as keyof PopConfirm];
    }
  });

  // Separately Process Event Functions
  if (popConfirm.confirm && isFunction(popConfirm.confirm)) {
    attrs.onConfirm = popConfirm.confirm;
  }
  if (popConfirm.cancel && isFunction(popConfirm.cancel)) {
    attrs.onCancel = popConfirm.cancel;
  }

  return attrs;
}

/** Fetch Button Properties */
function getButtonProps(action: ActionItem) {
  return {
    type: action.type || 'link',
    danger: action.danger || false,
    disabled: action.disabled,
    loading: action.loading,
    size: action.size,
  };
}

/** Fetch Tooltip Properties */
function getTooltipProps(tooltip: any | string) {
  if (!tooltip) return {};
  return typeof tooltip === 'string' ? { title: tooltip } : { ...tooltip };
}

/** Process menu clicks */
function handleMenuClick(e: any) {
  const action = getDropdownList.value[e.key];
  if (action && action.onClick && isFunction(action.onClick)) {
    action.onClick();
  }
}

/** Generate stable key */
function getActionKey(action: ActionItem, index: number) {
  return `${action.label || ''}-${action.type || ''}-${index}`;
}

/** Process button click */
function handleButtonClick(action: ActionItem) {
  if (action.onClick && isFunction(action.onClick)) {
    action.onClick();
  }
}

/** Listen to props changes, forced recalculation */
watch(
  () => [props.actions, props.dropDownActions],
  () => {
    // There's no need for extra processing here. Computed will recalculate automatically.
  },
  { deep: true },
);
</script>

<template>
  <div class="table-actions">
    <Space :size="spaceSize">
      <template
        v-for="(action, index) in getActions"
        :key="getActionKey(action, index)"
      >
        <Popconfirm
          v-if="action.popConfirm"
          v-bind="getPopConfirmProps(action.popConfirm)"
        >
          <template v-if="action.popConfirm.icon" #icon>
            <IconifyIcon :icon="action.popConfirm.icon" />
          </template>
          <Tooltip v-bind="getTooltipProps(action.tooltip)">
            <Button v-bind="getButtonProps(action)">
              <template v-if="action.icon" #icon>
                <IconifyIcon :icon="action.icon" />
              </template>
              {{ action.label }}
            </Button>
          </Tooltip>
        </Popconfirm>
        <Tooltip v-else v-bind="getTooltipProps(action.tooltip)">
          <Button
            v-bind="getButtonProps(action)"
            @click="handleButtonClick(action)"
          >
            <template v-if="action.icon" #icon>
              <IconifyIcon :icon="action.icon" />
            </template>
            {{ action.label }}
          </Button>
        </Tooltip>
      </template>
    </Space>

    <Dropdown
      v-if="getDropdownList.length > 0"
      :trigger="['hover']"
      :overlay-class-name="props.overlayClassName"
    >
      <slot name="more">
        <Button type="link">
          <template #icon>
            {{ $t('page.action.more') }}
            <IconifyIcon icon="lucide:ellipsis-vertical" />
          </template>
        </Button>
      </slot>
      <template #overlay>
        <Menu>
          <Menu.Item
            v-for="(action, index) in getDropdownList"
            :key="index"
            :disabled="action.disabled"
            @click="!action.popConfirm && handleMenuClick({ key: index })"
          >
            <template v-if="action.popConfirm">
              <Popconfirm v-bind="getPopConfirmProps(action.popConfirm)">
                <template v-if="action.popConfirm.icon" #icon>
                  <IconifyIcon :icon="action.popConfirm.icon" />
                </template>
                <div
                  :class="
                    action.disabled === true
                      ? 'cursor-not-allowed text-gray-300'
                      : ''
                  "
                >
                  <IconifyIcon v-if="action.icon" :icon="action.icon" />
                  <span :class="action.icon ? 'ml-1' : ''">
                    {{ action.label }}
                  </span>
                </div>
              </Popconfirm>
            </template>
            <template v-else>
              <div
                :class="
                  action.disabled === true
                    ? 'cursor-not-allowed text-gray-300'
                    : ''
                "
              >
                <IconifyIcon v-if="action.icon" :icon="action.icon" />
                {{ action.label }}
              </div>
            </template>
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.table-actions {
  .ant-btn-link {
    padding: 4px;
    margin-left: 0;
  }

  .ant-btn > .iconify + span,
  .ant-btn > span + .iconify {
    margin-inline-start: 4px;
  }

  .iconify {
    display: inline-flex;
    align-items: center;
    width: 1em;
    height: 1em;
    font-style: normal;
    line-height: 0;
    vertical-align: -0.125em;
    color: inherit;
    text-align: center;
    text-transform: none;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

.ant-popconfirm {
  .ant-popconfirm-buttons {
    .ant-btn {
      margin-inline-start: 4px !important;
    }
  }
}
</style>
