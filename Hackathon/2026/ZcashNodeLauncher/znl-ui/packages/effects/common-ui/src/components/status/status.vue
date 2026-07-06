<script lang="ts" setup>
import type { StatusDefinition, StatusProps } from './types';

import { computed, onMounted, useSlots } from 'vue';

import { IconifyIcon } from '@vben/icons';

import { VbenTooltip } from '@vben-core/shadcn-ui';

const props = withDefaults(defineProps<StatusProps>(), {
  statusDefinitions: () => [] as StatusDefinition[],
});

const emit = defineEmits(['click']);

const slots = useSlots();
onMounted(() => {});

const currentStatus = computed(() => {
  if (props == null) {
    return null;
  }

  if (props.statusDefinitions == null) {
    return null;
  }

  for (let i = 0; i < props.statusDefinitions.length; i++) {
    if (props.statusDefinitions[i]?.value == props.value) {
      return props.statusDefinitions[i];
    }
  }

  return null;
});

const calcStyle = computed(() => {
  if (currentStatus.value == null) {
    return {};
  }
  const result = {} as any;
  if (currentStatus.value.color != null) {
    result.color = currentStatus.value.color;
  }
  return result;
});

function handleClick(e) {
  emit('click', {
    value: props.value,
    currentStatus: props.statusDefinitions,
    originalEvent: e,
  });
}
</script>
<template>
  <div class="status" v-bind="$attrs">
    <slot name="icon">
      <VbenTooltip v-if="currentStatus != null">
        <template #trigger>
          <IconifyIcon
            @click="handleClick"
            class="status-icon"
            :style="calcStyle"
            v-if="currentStatus.icon != null"
            :icon="currentStatus.icon"
          />
        </template>
        <slot
          v-if="slots.tooltip"
          name="tooltip"
          :current-status="currentStatus"
        >
        </slot>
        <template v-else>
          {{ currentStatus.label || currentStatus.value }}
        </template>
      </VbenTooltip>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.status {
  :deep(.status-icon) {
    /*margin: 0 auto;*/
    display: inline-block;
    text-shadow:
      0 0 10px #ff00de,
      0 0 20px #ff00de;
  }
}
</style>
