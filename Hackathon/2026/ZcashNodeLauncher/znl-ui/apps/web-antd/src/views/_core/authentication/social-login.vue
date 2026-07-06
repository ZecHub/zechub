<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import type { AuthApi } from '#/api/core/auth';

import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { AuthenticationLogin, Verification, z } from '@vben/common-ui';
import { isCaptchaEnable, isTenantEnable } from '@vben/hooks';
import { $t } from '@vben/locales';
import { useAccessStore } from '@vben/stores';
import { getUrlValue } from '@vben/utils';

import {
  checkCaptcha,
  getCaptcha,
  getTenantByWebsite,
  getTenantSimpleList,
} from '#/api/core/auth';
import { useAuthStore } from '#/store';

defineOptions({ name: 'SocialLogin' });

const authStore = useAuthStore();
const accessStore = useAccessStore();
const { query } = useRoute();
const router = useRouter();
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
    loginRef.value.getFormApi().setFieldValue('tenantId', tenantId);
  } catch (error) {
    console.error('Error', error);
  }
}

/** Try login: when the account is tied, socialLogin will get token */
const socialType = Number(getUrlValue('type'));
const redirect = getUrlValue('redirect');
const socialCode = query?.code as string;
const socialState = query?.state as string;
async function tryLogin() {
  // Redirection for use after login, based on redact
  if (redirect) {
    await router.replace({
      query: {
        ...query,
        redirect: encodeURIComponent(redirect),
      },
    });
  }

  // Try Login
  await authStore.authLogin('social', {
    type: socialType,
    code: socialCode,
    state: socialState,
  });
}

/** Process login */
async function handleLogin(values: any) {
  // If the authentication code is turned on, the authentication code is verified first.
  if (captchaEnable) {
    verifyRef.value.show();
    return;
  }

  // No authentication code, direct login
  await authStore.authLogin('username', {
    ...values,
    socialType,
    socialCode,
    socialState,
  });
}

async function handleVerifySuccess({ captchaVerification }: any) {
  try {
    await authStore.authLogin('username', {
      ...(await loginRef.value.getFormApi().getValues()),
      captchaVerification,
      socialType,
      socialCode,
      socialState,
    });
  } catch (error) {
    console.error('Error in handleLogin:', error);
  }
}

/** Get tenant information when the component is mounted */
onMounted(async () => {
  await fetchTenantList();

  await tryLogin();
});

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
      :show-code-login="false"
      :show-qrcode-login="false"
      :show-third-party-login="false"
      :show-register="false"
      @submit="handleLogin"
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
