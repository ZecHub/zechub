<!-- add by puhui999：vxe table Toolbar Second Envelope， vxe Native List Use -->
<script setup lang="ts">
import type { VxeToolbarInstance } from 'vxe-table';

import { ref } from 'vue';

import { useContentMaximize, useRefresh } from '@vben/hooks';
import { IconifyIcon } from '@vben/icons';

import { VxeButton, VxeTooltip } from 'vxe-pc-ui';
import { VxeToolbar } from 'vxe-table';

/** List Toolbar Cover */
defineOptions({ name: 'TableToolbar' });

const props = defineProps<{
  hiddenSearch: boolean;
}>();

const emits = defineEmits(['update:hiddenSearch']);

const toolbarRef = ref<VxeToolbarInstance>();
const { toggleMaximizeAndTabbarHidden, contentIsMaximize } =
  useContentMaximize();
const { refresh } = useRefresh();

/** Hide Search Bar */
function onHiddenSearchBar() {
  emits('update:hiddenSearch', !props.hiddenSearch);
}

defineExpose({
  getToolbarRef: () => toolbarRef.value,
});
</script>

<template>
  <VxeToolbar ref="toolbarRef" custom>
    <template #toolPrefix>
      <slot></slot>
      <VxeTooltip placement="bottom" content="Search">
        <template #default>
          <VxeButton class="ml-2 font-normal" circle @click="onHiddenSearchBar">
            <IconifyIcon icon="lucide:search" :size="15" />
          </VxeButton>
        </template>
      </VxeTooltip>
      <VxeTooltip
        placement="bottom"
        :content="contentIsMaximize ? 'Revert' : 'Full Screen'"
      >
        <template #default>
          <VxeButton class="ml-2 font-medium" circle @click="refresh">
            <IconifyIcon icon="lucide:refresh-cw" :size="15" />
          </VxeButton>
        </template>
      </VxeTooltip>
      <VxeTooltip placement="bottom" content="Full Screen">
        <template #default>
          <VxeButton
            class="ml-2 font-medium"
            circle
            @click="toggleMaximizeAndTabbarHidden"
          >
            <IconifyIcon
              :icon="contentIsMaximize ? 'lucide:minimize' : 'lucide:maximize'"
              :size="15"
            />
          </VxeButton>
        </template>
      </VxeTooltip>
    </template>
  </VxeToolbar>
</template>
