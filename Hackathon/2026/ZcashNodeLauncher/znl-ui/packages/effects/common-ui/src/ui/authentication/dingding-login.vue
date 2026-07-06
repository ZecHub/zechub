<script setup lang="ts">
import { useRoute } from 'vue-router';

import { SvgDingDingIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { alert, useVbenModal } from '@vben-core/popup-ui';
import { VbenIconButton } from '@vben-core/shadcn-ui';
import { loadScript } from '@vben-core/shared/utils';

interface Props {
  clientId: string;
  corpId: string;
  // Login back to the address
  redirectUri?: string;
  // Whether to inline 2D login
  isQrCode?: boolean;
}

const props = defineProps<Props>();

const route = useRoute();

const [Modal, modalApi] = useVbenModal({
  header: false,
  footer: false,
  fullscreenButton: false,
  class: 'w-[302px] h-[302px] dingding-qrcode-login-modal',
  onOpened() {
    handleQrCodeLogin();
  },
});

const getRedirectUri = () => {
  const { redirectUri } = props;
  if (redirectUri) {
    return redirectUri;
  }
  return window.location.origin + route.fullPath;
};

/**
 * Embedded 2D login
 */
const handleQrCodeLogin = async () => {
  const { clientId, corpId } = props;
  if (!(window as any).DTFrameLogin) {
    // Two-dimensional login and load resources
    await loadScript(
      'https://g.alicdn.com/dingding/h5-dingtalk-login/0.21.0/ddlogin.js',
    );
  }
  (window as any).DTFrameLogin(
    {
      id: 'dingding_qrcode_login_element',
      width: 300,
      height: 300,
    },
    {
      // Note: Redirect_uri needs a full URL, and the nails will jump with code here.
      redirect_uri: encodeURIComponent(getRedirectUri()),
      client_id: clientId,
      scope: 'openid corpid',
      response_type: 'code',
      state: '1',
      prompt: 'consent',
      corpId,
    },
    (loginResult: any) => {
      const { redirectUrl } = loginResult;
      // There's a direct reprofiling here.
      window.location.href = redirectUrl;
    },
    (errorMsg: string) => {
      // There's usually a need to show the reasons for the login failure.
      alert(`Login Error: ${errorMsg}`);
    },
  );
};

const handleLogin = () => {
  const { clientId, corpId, isQrCode } = props;
  if (isQrCode) {
    // Embedded 2D login
    modalApi.open();
  } else {
    window.location.href = `https://login.dingtalk.com/oauth2/auth?redirect_uri=${encodeURIComponent(getRedirectUri())}&response_type=code&client_id=${clientId}&scope=openid&corpid=${corpId}&prompt=consent`;
  }
};
</script>

<template>
  <div>
    <VbenIconButton
      @click="handleLogin"
      :tooltip="$t('authentication.dingdingLogin')"
      tooltip-side="top"
    >
      <SvgDingDingIcon />
    </VbenIconButton>
    <Modal>
      <div id="dingding_qrcode_login_element"></div>
    </Modal>
  </div>
</template>

<style>
.dingding-qrcode-login-modal {
  .relative {
    padding: 0 !important;
  }
}
</style>