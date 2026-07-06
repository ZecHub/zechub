<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { updateUserPassword } from '#/api/system/user/profile';

const [Form, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 70,
  },
  schema: [
    {
      component: 'InputPassword',
      fieldName: 'oldPassword',
      label: 'Old password',
      rules: z
        .string({ message: 'Please enter the password.' })
        .min(5, 'The password length cannot be less than 5 characters')
        .max(20, 'Password length cannot exceed 20 characters'),
    },
    {
      component: 'InputPassword',
      dependencies: {
        rules(values) {
          return z
            .string({ message: 'Please enter a new password.' })
            .min(5, 'The password length cannot be less than 5 characters')
            .max(20, 'Password length cannot exceed 20 characters')
            .refine(
              (value) => value !== values.oldPassword,
              'New and old passwords can\'t be the same.',
            );
        },
        triggerFields: ['newPassword', 'oldPassword'],
      },
      fieldName: 'newPassword',
      label: 'New password',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      dependencies: {
        rules(values) {
          return z
            .string({ message: 'Please enter the confirmation password.' })
            .min(5, 'The password length cannot be less than 5 characters')
            .max(20, 'Password length cannot exceed 20 characters')
            .refine(
              (value) => value === values.newPassword,
              'New passwords and confirmation passwords are inconsistent',
            );
        },
        triggerFields: ['newPassword', 'confirmPassword'],
      },
      fieldName: 'confirmPassword',
      label: 'Confirm password',
      rules: 'required',
    },
  ],
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    content: 'Change Password',
  },
  handleSubmit,
});

async function handleSubmit(values: Recordable<any>) {
  try {
    formApi.setLoading(true);
    // Submit Forms
    await updateUserPassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    message.success($t('ui.actionMessage.operationSuccess'));
  } catch (error) {
    console.error(error);
  } finally {
    formApi.setLoading(false);
  }
}
</script>

<template>
  <div class="mt-4 md:w-full lg:w-1/2 2xl:w-2/5">
    <Form />
  </div>
</template>