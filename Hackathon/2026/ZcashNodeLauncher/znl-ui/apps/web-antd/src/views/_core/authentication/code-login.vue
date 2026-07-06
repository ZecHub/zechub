<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import type { AuthApi } from '#/api';

import { computed, onMounted, ref } from 'vue';

import { AuthenticationCodeLogin, z } from '@vben/common-ui';
import { isTenantEnable } from '@vben/hooks';
import { $t } from '@vben/locales';
import { useAccessStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { sendSmsCode } from '#/api';
import { getTenantByWebsite, getTenantSimpleList } from '#/api/core/auth';
import { useAuthStore } from '#/store';

defineOptions({ name: 'CodeLogin' });

const authStore = useAuthStore();
const accessStore = useAccessStore();
const tenantEnable = isTenantEnable();

const loading = ref(false);
const CODE_LENGTH = 4;

const loginRef = ref();

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

/** Get tenant information when the component is mounted */
onMounted(() => {
  fetchTenantList();
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
        placeholder: $t('authentication.mobile'),
      },
      fieldName: 'mobile',
      label: $t('authentication.mobile'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        codeLength: CODE_LENGTH,
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        placeholder: $t('authentication.code'),
        handleSendCode: async () => {
          loading.value = true;
          try {
            const formApi = loginRef.value?.getFormApi();
            if (!formApi) {
              throw new Error("The form's not ready.");
            }
            // Verify cell phone number.
            await formApi.validateField('mobile');
            const isMobileValid = await formApi.isFieldValid('mobile');
            if (!isMobileValid) {
              throw new Error('Please enter a valid cell phone number.');
            }

            // Send Authentication Code
            const { mobile } = await formApi.getValues();
            const scene = 21; // Scene: text message authentication code login
            await sendSmsCode({ mobile, scene });
            message.success('Success');
          } finally {
            loading.value = false;
          }
        },
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().length(CODE_LENGTH, {
        message: $t('authentication.codeTip', [CODE_LENGTH]),
      }),
    },
  ];
});
/**
 * Asynchronously handle the login process * @param values login form data
 */
async function handleLogin(values: Recordable<any>) {
  try {
    await authStore.authLogin('mobile', values);
  } catch (error) {
    console.error('Error in handleLogin:', error);
  }
}
</script>

<template>
  <AuthenticationCodeLogin
    ref="loginRef"
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleLogin"
  />
</template>
