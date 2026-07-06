<script setup lang="ts">
import type { CSSProperties } from 'vue';

import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watchEffect,
} from 'vue';

import { VbenTooltip } from '@vben-core/shadcn-ui';

import { useElementSize } from '@vueuse/core';

interface Props {
  /**
   * Whether to enable click on text to expand all *
   */
  expand?: boolean;
  /**
   * Maximum number of lines in text *@default1
   */
  line?: number;
  /**
   * Text Maximum Width * @default '100% '
   */
  maxWidth?: number | string;
  /**
   * Hint Box Location *@default 'top '
   */
  placement?: 'bottom' | 'left' | 'right' | 'top';
  /**
   * Whether to enable texttips * @default true
   */
  tooltip?: boolean;
  /**
   * Whether to show a hint box only when text is cut @default frame
   */
  tooltipWhenEllipsis?: boolean;
  /**
   * Pixel difference threshold for text cut-off detection, the greater the judgment * @default 3
   */
  ellipsisThreshold?: number;
  /**
   * Tipbox background colour, priority over over overlayStyle
   */
  tooltipBackgroundColor?: string;
  /**
   * Hint text font colour with higher priority than overlayStyle
   */
  tooltipColor?: string;
  /**
   * Hint text font size, units of px, higher priority than overlayStyle
   */
  tooltipFontSize?: number;
  /**
   * Maximum width of the hint box content, units of px, automatically aligns the text content with the displayed text width when default is not set
   */
  tooltipMaxWidth?: number;
  /**
   * Tipbox content area style *@default {textAll: 'justify'}
   */
  tooltipOverlayStyle?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
  expand: false,
  line: 1,
  maxWidth: '100%',
  placement: 'top',
  tooltip: true,
  tooltipWhenEllipsis: false,
  ellipsisThreshold: 3,
  tooltipBackgroundColor: '',
  tooltipColor: '',
  tooltipFontSize: 14,
  tooltipMaxWidth: undefined,
  tooltipOverlayStyle: () => ({ textAlign: 'justify' }),
});

const emit = defineEmits<{ expandChange: [boolean] }>();

const textMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return `${props.maxWidth}px`;
  }
  return props.maxWidth;
});
const ellipsis = ref();
const isExpand = ref(false);
const defaultTooltipMaxWidth = ref();
const isEllipsis = ref(false);

const { width: eleWidth } = useElementSize(ellipsis);

// Check if text has been cut
const checkEllipsis = () => {
  if (!ellipsis.value || !props.tooltipWhenEllipsis) return;

  const element = ellipsis.value;

  const originalText = element.textContent || '';
  const originalTrimmed = originalText.trim();

  // returns empty text directly to false
  if (!originalTrimmed) {
    isEllipsis.value = false;
    return;
  }

  const widthDiff = element.scrollWidth - element.clientWidth;
  const heightDiff = element.scrollHeight - element.clientHeight;

  // Use large enough variance thresholds to ensure that only truly cut text displays tooltip
  isEllipsis.value =
    props.line === 1
      ? widthDiff > props.ellipsisThreshold
      : heightDiff > props.ellipsisThreshold;
};

// Use ResizeObserver to listen to changes in size
let resizeObserver: null | ResizeObserver = null;

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && props.tooltipWhenEllipsis) {
    resizeObserver = new ResizeObserver(() => {
      checkEllipsis();
    });

    if (ellipsis.value) {
      resizeObserver.observe(ellipsis.value);
    }
  }

  // Initial Test
  checkEllipsis();
});

// Test content changes using anonUpdated hook
onUpdated(() => {
  if (props.tooltipWhenEllipsis) {
    checkEllipsis();
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

watchEffect(
  () => {
    if (props.tooltip && eleWidth.value) {
      defaultTooltipMaxWidth.value =
        props.tooltipMaxWidth ?? eleWidth.value + 24;
    }
  },
  { flush: 'post' },
);

function onExpand() {
  isExpand.value = !isExpand.value;
  emit('expandChange', isExpand.value);
  if (props.tooltipWhenEllipsis) {
    checkEllipsis();
  }
}

function handleExpand() {
  props.expand && onExpand();
}
</script>
<template>
  <div>
    <VbenTooltip
      :content-style="{
        ...tooltipOverlayStyle,
        maxWidth: `${defaultTooltipMaxWidth}px`,
        fontSize: `${tooltipFontSize}px`,
        color: tooltipColor,
        backgroundColor: tooltipBackgroundColor,
      }"
      :disabled="
        !props.tooltip || isExpand || (props.tooltipWhenEllipsis && !isEllipsis)
      "
      :side="placement"
    >
      <slot name="tooltip">
        <slot></slot>
      </slot>

      <template #trigger>
        <div
          ref="ellipsis"
          :class="{
            '!cursor-pointer': expand,
            ['block truncate']: line === 1,
            [$style.ellipsisMultiLine]: line > 1,
          }"
          :style="{
            '-webkit-line-clamp': isExpand ? '' : line,
            'max-width': textMaxWidth,
          }"
          class="cursor-text overflow-hidden"
          @click="handleExpand"
          v-bind="$attrs"
        >
          <slot></slot>
        </div>
      </template>
    </VbenTooltip>
  </div>
</template>

<style module>
.ellipsisMultiLine {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>