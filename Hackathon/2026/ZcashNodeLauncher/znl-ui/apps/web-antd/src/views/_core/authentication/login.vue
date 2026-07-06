<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import type { AuthApi } from '#/api/core/auth';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { AuthenticationLogin, Verification, z } from '@vben/common-ui';
import {
  isCaptchaEnable,
  isTenantEnable,
  isTenantSwitchVisible,
} from '@vben/hooks';
import { $t } from '@vben/locales';
import { useAccessStore } from '@vben/stores';

import {
  checkCaptcha,
  getCaptcha,
  getTenantByWebsite,
  getTenantSimpleList,
  socialAuthRedirect,
} from '#/api/core/auth';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const { query } = useRoute();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const tenantEnable = isTenantEnable();
const captchaEnable = isCaptchaEnable();

const loginRef = ref();
const verifyRef = ref();

const captchaType = 'blockPuzzle';

/** Retrieve the tenant list and select by default */
const tenantList = ref<AuthApi.TenantResult[]>([]); // Tenant List
async function fetchTenantList() {
  if (!tenantEnable) {
    return;
  }
  try {
    // Retrieve tenant lists, domain names for tenants
    const websiteTenantPromise = getTenantByWebsite(window.location.hostname);
    tenantList.value = await getTenantSimpleList();

    let tenantId: null | number = null;
    const websiteTenant = await websiteTenantPromise;
    if (websiteTenant?.id) {
      tenantId = websiteTenant.id;
    }
    // Try to get from store if no domain name is available to the tenant
    if (!tenantId && accessStore.tenantId) {
      tenantId = accessStore.tenantId;
    }
    // If there are no tenants, use the first in the list
    if (!tenantId && tenantList.value?.[0]?.id) {
      tenantId = tenantList.value[0].id;
    }

    // Set the selected tenant number
    accessStore.setTenantId(tenantId);
    loginRef.value.getFormApi().setFieldValue('tenantId', tenantId?.toString());
  } catch (error) {
    console.error('Error', error);
  }
}

/** Process login */
async function handleLogin(values: any) {
  // If the authentication code is turned on, the authentication code is verified first.
  if (captchaEnable) {
    verifyRef.value.show();
    return;
  }
  // No authentication code, direct login
  await authStore.authLogin('username', values);
}

async function handleVerifySuccess({ captchaVerification }: any) {
  try {
    await authStore.authLogin('username', {
      ...(await loginRef.value.getFormApi().getValues()),
      captchaVerification,
    });
  } catch (error) {
    console.error('Error in handleLogin:', error);
  }
}

/** Processing of third-party login */
const redirect = query?.redirect;
async function handleThirdLogin(type: number) {
  if (type <= 0) {
    return;
  }
  try {
    // Calculating redact Uri
    // Tricky: type, redact need to encode before a nail returns are lost. Use & co-operate with social-login.vu#getUrlValue()
    const redirectUri = `${
      location.origin
    }/auth/social-login?${encodeURIComponent(
      `type=${type}&redirect=${redirect || '/'}`,
    )}`;

    // Jump
    window.location.href = await socialAuthRedirect(type, redirectUri);
  } catch (error) {
    console.error('Third-party login processing failed:', error);
  }
}

/** Get tenant information when the component is mounted */
onMounted(() => {
  fetchTenantList();
});

const tenantSwitchVisible = computed(() => {
  return tenantEnable && isTenantSwitchVisible();
});
const tenantSwitchClass = () => {
  if (tenantSwitchVisible.value) {
    return '';
  }
  return 'hidden';
};

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenSelect',
      componentProps: {
        options: tenantList.value.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        })),
        placeholder: $t('authentication.tenantTip'),
      },
      fieldName: 'tenantId',
      label: $t('authentication.tenant'),
      rules: z.string().min(1, { message: $t('authentication.tenantTip') }),
      dependencies: {
        triggerFields: ['tenantId'],
        if: tenantEnable,
        trigger(values) {
          if (values.tenantId) {
            accessStore.setTenantId(Number(values.tenantId));
          }
        },
      },
      formItemClass: tenantSwitchClass,
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.usernameTip') })
        .default(import.meta.env.VITE_APP_DEFAULT_USERNAME),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.passwordTip'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.passwordTip') })
        .default(import.meta.env.VITE_APP_DEFAULT_PASSWORD),
    },
  ];
});
</script>

<template>
  <div>
    <AuthenticationLogin
      ref="loginRef"
      :form-schema="formSchema"
      :loading="authStore.loginLoading"
      @submit="handleLogin"
      @third-login="handleThirdLogin"
    />
    <Verification
      ref="verifyRef"
      v-if="captchaEnable"
      :captcha-type="captchaType"
      :check-captcha-api="checkCaptcha"
      :get-captcha-api="getCaptcha"
      :img-size="{ width: '400px', height: '200px' }"
      mode="pop"
      @on-success="handleVerifySuccess"
    />
  </div>
</template>
