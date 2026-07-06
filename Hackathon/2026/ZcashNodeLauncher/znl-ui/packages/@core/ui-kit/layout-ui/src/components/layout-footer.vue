<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { computed } from 'vue';

interface Props {
  /**
   * Whether or not it's fixed at the bottom
   */
  fixed?: boolean;
  height: number;
  /**
   * Whether to show *@default true
   */
  show?: boolean;
  width: string;
  zIndex: number;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
});

const style = computed((): CSSProperties => {
  const { fixed, height, show, width, zIndex } = props;
  return {
    height: `${height}px`,
    marginBottom: show ? '0' : `-${height}px`,
    position: fixed ? 'fixed' : 'static',
    width,
    zIndex,
  };
});
</script>

<template>
  <footer
    :style="style"
    class="bg-background-deep bottom-0 w-full transition-all duration-200"
  >
    <slot></slot>
  </footer>
</template>