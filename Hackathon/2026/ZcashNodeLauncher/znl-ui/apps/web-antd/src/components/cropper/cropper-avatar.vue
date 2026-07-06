<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import type { CropperAvatarProps } from './typing';

import { computed, ref, unref, watch, watchEffect } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import cropperModal from './cropper-modal.vue';

defineOptions({ name: 'CropperAvatar' });

const props = withDefaults(defineProps<CropperAvatarProps>(), {
  width: 200,
  value: '',
  showBtn: true,
  btnProps: () => ({}),
  btnText: '',
  uploadApi: () => Promise.resolve(),
  size: 5,
});

const emit = defineEmits(['update:value', 'change']);

const sourceValue = ref(props.value || '');
const [CropperModal, modalApi] = useVbenModal({
  connectedComponent: cropperModal,
});

const getWidth = computed(() => `${`${props.width}`.replace(/px/, '')}px`);

const getIconWidth = computed(
  () => `${Number.parseInt(`${props.width}`.replace(/px/, '')) / 2}px`,
);

const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

const getImageWrapperStyle = computed(
  (): CSSProperties => ({ height: unref(getWidth), width: unref(getWidth) }),
);

watchEffect(() => {
  sourceValue.value = props.value || '';
});

watch(
  () => sourceValue.value,
  (v: string) => {
    emit('update:value', v);
  },
);

function handleUploadSuccess({ data, source }: any) {
  sourceValue.value = source;
  emit('change', { data, source });
  message.success($t('ui.cropper.uploadSuccess'));
}

const closeModal = () => modalApi.close();
const openModal = () => modalApi.open();

defineExpose({
  closeModal,
  openModal,
});
</script>

<template>
  <!-- Head container. -->
  <div class="inline-block text-center" :style="getStyle">
    <!-- Picture Packer -->
    <div
      class="bg-card group relative cursor-pointer overflow-hidden rounded-full border border-gray-200"
      :style="getImageWrapperStyle"
    >
      <!-- Image -->
      <img
        v-if="sourceValue"
        :src="sourceValue"
        alt="avatar"
        class="h-full w-full object-cover"
      />
    </div>

    <CropperModal
      :size="size"
      :src="sourceValue"
      :upload-api="uploadApi"
      @upload-success="handleUploadSuccess"
    />
  </div>
</template>