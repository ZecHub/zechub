<script lang="ts" setup>
import { $t } from '@vben/locales';
import { openWindow } from '@vben/utils';

import { useVbenModal } from '@vben-core/popup-ui';
import { VbenButton, VbenButtonGroup } from '@vben-core/shadcn-ui';

import { useMagicKeys, whenever } from '@vueuse/core';

defineOptions({
  name: 'Help',
});

const keys = useMagicKeys();
whenever(keys['Alt+KeyH']!, () => {
  modalApi.open();
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  overlayBlur: 5,
  footer: false,
  onCancel() {
    modalApi.close();
  },
});
</script>
<template>
  <Modal class="w-1/3" :title="$t('ui.widgets.qa')">
    <div class="mt-2 flex flex-col">
      <div class="mt-2 flex flex-col">
        <VbenButtonGroup class="basis-1/3" :gap="2" border size="large">
          <p class="w-24 p-2">Source Code:</p>
          <VbenButton
            variant="link"
            @click="
              openWindow('https://github.com/zcashjava/ZcashNodeLauncher')
            "
          >
            Github
          </VbenButton>
        </VbenButtonGroup>
      </div>
    </div>
  </Modal>
</template>