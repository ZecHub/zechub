<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { $t } from '@vben/locales';

import { VbenButton } from '@vben-core/shadcn-ui';

import { useQRCode } from '@vueuse/integrations/useQRCode';

import Title from './auth-title.vue';

interface Props {
  /**
   * @zh_CN is in loading status
   */
  loading?: boolean;
  /**
   * @zh_CN Login Path
   */
  loginPath?: string;
  /**
   * @zh_CN Title
   */
  title?: string;
  /**
   * @zh_CN Description
   */
  subTitle?: string;
  /**
   * @zh_CN button text
   */
  submitButtonText?: string;
  /**
   * @zh_CN Description
   */
  description?: string;
  /**
   * @zh_CN Whether to display return buttons
   */
  showBack?: boolean;
}

defineOptions({
  name: 'AuthenticationQrCodeLogin',
});

const props = withDefaults(defineProps<Props>(), {
  description: '',
  loading: false,
  showBack: true,
  loginPath: '/auth/login',
  submitButtonText: '',
  subTitle: '',
  title: '',
});

const router = useRouter();

// const text = ref('https://vben.vvbin.cn');
const text = ref('https://t.zsxq.com/FUtQd');

const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  margin: 4,
});

function goToLogin() {
  router.push(props.loginPath);
}
</script>

<template>
  <div>
    <Title>
      <slot name="title">
        {{ title || $t('authentication.welcomeBack') }} 📱
      </slot>
      <template #desc>
        <span class="text-muted-foreground">
          <slot name="subTitle">
            {{ subTitle || $t('authentication.qrcodeSubtitle') }}
          </slot>
        </span>
      </template>
    </Title>

    <div class="flex-col-center mt-6">
      <img :src="qrcode" alt="qrcode" class="w-1/2" />
      <p class="text-muted-foreground mt-4 text-sm">
        <slot name="description">
          {{ description || $t('authentication.qrcodePrompt') }}
        </slot>
      </p>
    </div>

    <VbenButton
      v-if="showBack"
      class="mt-4 w-full"
      variant="outline"
      @click="goToLogin()"
    >
      {{ $t('common.back') }}
    </VbenButton>
  </div>
</template>