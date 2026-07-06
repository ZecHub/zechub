<script setup lang="ts">
import type { Recordable } from '@vben/types';

import type { SystemUserProfileApi } from '#/api/system/user/profile';

import { watch } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { updateUserProfile } from '#/api/system/user/profile';

const props = defineProps<{
  profile?: SystemUserProfileApi.UserProfileRespVO;
}>();
const emit = defineEmits<{
  (e: 'success'): void;
}>();

const [Form, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 70,
  },
  schema: [
    {
      label: 'Nickname',
      fieldName: 'nickname',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the Nickname',
      },
      rules: 'required',
    },
    {
      label: 'Mobile',
      fieldName: 'mobile',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your cell phone.',
      },
      rules: z.string(),
    },
    {
      label: 'Email',
      fieldName: 'email',
      component: 'Input',
      componentProps: {
        placeholder: 'Enter the user mailbox, please.',
      },
      rules: z.string().email('Please enter the correct mailbox'),
    },
    {
      label: 'Gender',
      fieldName: 'sex',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_USER_SEX, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number(),
    },
  ],
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    content: 'Update Information',
  },
  handleSubmit,
});

async function handleSubmit(values: Recordable<any>) {
  try {
    formApi.setLoading(true);
    // Submit Forms
    await updateUserProfile(values as SystemUserProfileApi.UpdateProfileReqVO);
    // Close and hint
    emit('success');
    message.success($t('ui.actionMessage.operationSuccess'));
  } catch (error) {
    console.error(error);
  } finally {
    formApi.setLoading(false);
  }
}

/** Listening profile changes */
watch(
  () => props.profile,
  (newProfile) => {
    if (newProfile) {
      formApi.setValues(newProfile);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="mt-4 md:w-full lg:w-1/2 2xl:w-2/5">
    <Form />
  </div>
</template>
