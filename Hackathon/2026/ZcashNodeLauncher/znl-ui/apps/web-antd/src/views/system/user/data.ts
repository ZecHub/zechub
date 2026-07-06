import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api/system/user';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { $t } from '@vben/locales';
import { handleTree } from '@vben/utils';

import { z } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { getSimplePostList } from '#/api/system/post';
import { getSimpleRoleList } from '#/api/system/role';
import { getRangePickerDefaultProps } from '#/utils';

/** New/modified forms */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'username',
      label: 'User Name',
      component: 'Input',
      rules: 'required',
    },
    {
      label: 'User password',
      fieldName: 'password',
      component: 'InputPassword',
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        show: (values) => !values.id,
      },
    },
    {
      fieldName: 'nickname',
      label: 'Nickname',
      component: 'Input',
      rules: 'required',
    },
    {
      fieldName: 'deptId',
      label: 'Dept',
      component: 'ApiTreeSelect',
      componentProps: {
        api: async () => {
          const data = await getDeptList();
          return handleTree(data);
        },
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: 'Please choose to be part of the department.',
        treeDefaultExpandAll: true,
      },
    },
    {
      fieldName: 'postIds',
      label: 'Positions',
      component: 'ApiSelect',
      componentProps: {
        api: getSimplePostList,
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
        placeholder: 'Please choose your position.',
      },
    },
    {
      fieldName: 'email',
      label: 'Mailbox',
      component: 'Input',
      rules: z
        .string()
        .email("Cannot initialise Evolution's mail component.")
        .or(z.literal(''))
        .optional(),
      componentProps: {
        placeholder: 'Please enter the mailbox.',
      },
    },
    {
      fieldName: 'mobile',
      label: 'Cell phone number.',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your cell phone number.',
      },
    },
    {
      fieldName: 'sex',
      label: 'Sex of user',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_USER_SEX, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(1),
    },
    {
      fieldName: 'status',
      label: 'User Status',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'remark',
      label: 'Remarks',
      component: 'Textarea',
    },
  ];
}

/** Reset password form */
export function useResetPasswordFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: 'Please enter a new password.',
      },
      dependencies: {
        rules(values) {
          return z
            .string({ message: 'Please enter a new password.' })
            .min(5, 'The password length cannot be less than 5 characters')
            .max(20, 'Password length cannot exceed 20 characters')
            .refine(
              (value) => value !== values.oldPassword,
              "New and old passwords can't be the same.",
            );
        },
        triggerFields: ['newPassword', 'oldPassword'],
      },
      fieldName: 'newPassword',
      label: 'New password',
      rules: 'required',
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.confirmPassword'),
      },
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
  ];
}

/** Form for assigning roles */
export function useAssignRoleFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'username',
      label: 'User Name',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'nickname',
      label: 'Nickname',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'roleIds',
      label: 'Role',
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleRoleList,
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
        placeholder: 'Please select a character.',
      },
    },
  ];
}

/** User-imported forms */
export function useImportFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'file',
      label: 'User Data',
      component: 'Upload',
      rules: 'required',
      help: 'Only import xls, xlsx format files are allowed',
    },
    {
      fieldName: 'updateSupport',
      label: 'Whether to overwrite',
      component: 'Switch',
      componentProps: {
        checkedChildren: 'Yes.',
        unCheckedChildren: 'Yes',
      },
      rules: z.boolean().default(false),
      help: 'Whether to update already existing user data',
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'username',
      label: 'User Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the user name',
        allowClear: true,
      },
    },
    {
      fieldName: 'mobile',
      label: 'Cell phone number.',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your cell phone number.',
        allowClear: true,
      },
    },
    {
      fieldName: 'createTime',
      label: 'Created',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** Fields in the List */
export function useGridColumns(
  onStatusChange?: (
    newStatus: number,
    row: SystemUserApi.User,
  ) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'User ID',
      minWidth: 100,
    },
    {
      field: 'username',
      title: 'User Name',
      minWidth: 120,
    },
    {
      field: 'nickname',
      title: 'Nickname',
      minWidth: 120,
    },
    {
      field: 'deptName',
      title: 'Sector',
      minWidth: 120,
    },
    {
      field: 'mobile',
      title: 'Cell phone number.',
      minWidth: 120,
    },
    {
      field: 'status',
      title: 'Status',
      minWidth: 100,
      align: 'center',
      cellRender: {
        attrs: { beforeChange: onStatusChange },
        name: 'CellSwitch',
        props: {
          checkedValue: CommonStatusEnum.ENABLE,
          unCheckedValue: CommonStatusEnum.DISABLE,
        },
      },
    },
    {
      field: 'createTime',
      title: 'Created',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      width: 180,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
