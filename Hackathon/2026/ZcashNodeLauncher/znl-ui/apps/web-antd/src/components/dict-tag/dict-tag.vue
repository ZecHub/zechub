<script setup lang="ts">
import { computed } from 'vue';

import { getDictObj } from '@vben/hooks';
import { isValidColor, TinyColor } from '@vben/utils';

import { Tag } from 'ant-design-vue';

interface DictTagProps {
  /**
   * Dictionary Type
   */
  type: string;
  /**
   * Dictionary Values
   */
  value: any;
  /**
   * Icon
   */
  icon?: string;
}

const props = defineProps<DictTagProps>();

/** Fetch Dictionary Tags */
const dictTag = computed(() => {
  // Verify Parameter Validity
  if (!props.type || props.value === undefined || props.value === null) {
    return null;
  }

  // Fetch Dictionary Objects
  const dict = getDictObj(props.type, String(props.value));
  if (!dict) {
    return null;
  }

  // Process colour type
  let colorType = dict.colorType;
  switch (colorType) {
    case 'danger': {
      colorType = 'error';
      break;
    }
    case 'info': {
      colorType = 'default';
      break;
    }
    case 'primary': {
      colorType = 'processing';
      break;
    }
    default: {
      if (!colorType) {
        colorType = 'default';
      }
    }
  }

  if (isValidColor(dict.cssClass)) {
    colorType = new TinyColor(dict.cssClass).toHexString();
  }

  return {
    label: dict.label || '',
    colorType,
    cssClass: dict.cssClass,
  };
});
</script>

<template>
  <Tag
    v-if="dictTag"
    :color="dictTag.colorType ? dictTag.colorType : dictTag.cssClass"
  >
    {{ dictTag.label }}
  </Tag>
</template>