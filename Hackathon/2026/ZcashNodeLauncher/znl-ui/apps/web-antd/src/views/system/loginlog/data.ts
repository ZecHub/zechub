import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { formatDateTime } from '@vben/utils';

import { DictTag } from '#/components/dict-tag';
import { getRangePickerDefaultProps } from '#/utils';

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'username',
      label: 'User Name',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the user name',
      },
    },
    {
      fieldName: 'userIp',
      label: 'Login Address',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the login address.',
      },
    },
    {
      fieldName: 'createTime',
      label: 'Login Time',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** Fields in the List */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: 'Log Number',
      minWidth: 100,
    },
    {
      field: 'logType',
      title: 'Operation Type',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_LOGIN_TYPE },
      },
    },
    {
      field: 'username',
      title: 'User Name',
      minWidth: 180,
    },
    {
      field: 'userIp',
      title: 'Login Address',
      minWidth: 180,
    },
    {
      field: 'userAgent',
      title: 'Browser',
      minWidth: 200,
    },
    {
      field: 'result',
      title: 'Login Results',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_LOGIN_RESULT },
      },
    },
    {
      field: 'createTime',
      title: 'Login Date',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      width: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** Fields on the Details Page */
export function useDetailSchema(): DescriptionItemSchema[] {
  return [
    {
      field: 'id',
      label: 'Log Number',
    },
    {
      field: 'logType',
      label: 'Operation Type',
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_LOGIN_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'username',
      label: 'User Name',
    },
    {
      field: 'userIp',
      label: 'Login Address',
    },
    {
      field: 'userAgent',
      label: 'Browser',
    },
    {
      field: 'result',
      label: 'Login Results',
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_LOGIN_RESULT,
          value: val,
        });
      },
    },
    {
      field: 'createTime',
      label: 'Login Date',
      render: (val) => formatDateTime(val) as string,
    },
  ];
}