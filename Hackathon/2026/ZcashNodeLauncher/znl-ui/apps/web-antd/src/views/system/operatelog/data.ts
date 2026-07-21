import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { formatDateTime } from '@vben/utils';

import { getSimpleUserList } from '#/api/system/user';
import { getRangePickerDefaultProps } from '#/utils';

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userId',
      label: 'Operator',
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleUserList,
        labelField: 'nickname',
        valueField: 'id',
        allowClear: true,
        placeholder: 'Please select the operator.',
      },
    },
    {
      fieldName: 'type',
      label: 'Operation Module',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the operation module',
      },
    },
    {
      fieldName: 'subType',
      label: 'Operation Name',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the name of the operation',
      },
    },
    {
      fieldName: 'action',
      label: 'Operational Contents',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the operation content',
      },
    },
    {
      fieldName: 'createTime',
      label: 'Operation Time',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'bizId',
      label: 'Operational number',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter a business number.',
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
      field: 'userName',
      title: 'Operator',
      minWidth: 120,
    },
    {
      field: 'type',
      title: 'Operation Module',
      minWidth: 120,
    },
    {
      field: 'subType',
      title: 'Operation Name',
      minWidth: 160,
    },
    {
      field: 'action',
      title: 'Operational Contents',
      minWidth: 200,
    },
    {
      field: 'createTime',
      title: 'Operation Time',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'bizId',
      title: 'Operational number',
      minWidth: 120,
    },
    {
      field: 'userIp',
      title: 'Operation IP',
      minWidth: 120,
    },
    {
      title: 'Operation',
      width: 80,
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
      field: 'traceId',
      label: 'Link tracking.',
      show: (data) => !data?.traceId,
    },
    {
      field: 'userId',
      label: 'Operator number',
    },
    {
      field: 'userName',
      label: 'Operator\'s name',
    },
    {
      field: 'userIp',
      label: 'Operator IP',
    },
    {
      field: 'userAgent',
      label: 'Operator UA',
    },
    {
      field: 'type',
      label: 'Operation Module',
    },
    {
      field: 'subType',
      label: 'Operation Name',
    },
    {
      field: 'action',
      label: 'Operational Contents',
    },
    {
      field: 'extra',
      label: 'Operation Extension Parameters',
      show: (val) => !val,
    },
    {
      field: 'requestUrl',
      label: 'Request URL',
      render: (val, data) => {
        if (data?.requestMethod && val) {
          return `${data.requestMethod} ${val}`;
        }
        return '';
      },
    },
    {
      field: 'createTime',
      label: 'Operation Time',
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'bizId',
      label: 'Operational number',
    },
  ];
}