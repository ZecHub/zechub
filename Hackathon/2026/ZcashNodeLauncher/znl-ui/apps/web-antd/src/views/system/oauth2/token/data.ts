import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userId',
      label: 'User ID',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your user number.',
        allowClear: true,
      },
    },
    {
      fieldName: 'userType',
      label: 'User Type',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        placeholder: 'Please select the user type',
        allowClear: true,
      },
    },
    {
      fieldName: 'clientId',
      label: 'Client ID',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter client number',
        allowClear: true,
      },
    },
  ];
}

/** Fields in the List */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'accessToken',
      title: 'Access the tokens',
      minWidth: 300,
    },
    {
      field: 'refreshToken',
      title: 'Refresh Decoration',
      minWidth: 300,
    },
    {
      field: 'userId',
      title: 'User ID',
      minWidth: 100,
    },
    {
      field: 'userType',
      title: 'User Type',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'clientId',
      title: 'Client ID',
      minWidth: 120,
    },
    {
      field: 'expiresTime',
      title: 'Expiration time',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'createTime',
      title: 'Created',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      width: 80,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}