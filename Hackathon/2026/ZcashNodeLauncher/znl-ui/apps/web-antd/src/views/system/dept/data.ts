import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDeptApi } from '#/api/system/dept';
import type { SystemUserApi } from '#/api/system/user';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { handleTree } from '@vben/utils';

import { z } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { getSimpleUserList } from '#/api/system/user';

/** Link Data */
let userList: SystemUserApi.User[] = [];
getSimpleUserList().then((data) => (userList = data));

/** New/modified forms */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'parentId',
      label: 'Parent',
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getDeptList();
          data.unshift({
            id: 0,
            name: 'Top sector',
          });
          return handleTree(data);
        },
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: 'Please choose your superiors.',
        treeDefaultExpandAll: true,
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'name',
      label: 'Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the name of the department',
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: 'Show Order',
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: 'Please enter display order',
      },
      rules: 'required',
    },
    {
      fieldName: 'leaderUserId',
      label: 'Manager',
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleUserList,
        labelField: 'nickname',
        valueField: 'id',
        placeholder: 'Please choose the person in charge.',
        allowClear: true,
      },
      rules: z.number().optional(),
    },
    {
      fieldName: 'phone',
      label: 'Phone',
      component: 'Input',
      componentProps: {
        maxLength: 11,
        placeholder: 'Please enter the contact number.',
      },
      rules: 'mobileRequired',
    },
    {
      fieldName: 'email',
      label: 'Email',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the mailbox.',
      },
      rules: z
        .string()
        .email("Cannot initialise Evolution's mail component.")
        .or(z.literal(''))
        .optional(),
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
  ];
}

/** Fields in the List */
export function useGridColumns(): VxeTableGridOptions<SystemDeptApi.Dept>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'name',
      title: 'Name',
      minWidth: 150,
      align: 'left',
      fixed: 'left',
      treeNode: true,
    },
    {
      field: 'leaderUserId',
      title: 'Officer-in-Charge',
      minWidth: 150,
      formatter: ({ cellValue }) =>
        userList.find((user) => user.id === cellValue)?.nickname || '-',
    },
    {
      field: 'sort',
      title: 'Show Order',
      minWidth: 100,
    },
    {
      field: 'status',
      title: 'Sectoral status',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
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
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
