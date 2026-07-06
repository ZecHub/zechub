import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { JsonViewer } from '@vben/common-ui';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import { DictTag } from '#/components/dict-tag';
import { getRangePickerDefaultProps } from '#/utils';

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userId',
      label: 'User ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter your user number.',
      },
    },
    {
      fieldName: 'userType',
      label: 'User Type',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        allowClear: true,
        placeholder: 'Please select the user type',
      },
    },
    {
      fieldName: 'applicationName',
      label: 'Apply Name',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the application name',
      },
    },
    {
      fieldName: 'beginTime',
      label: 'Request time',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'duration',
      label: 'Duration of implementation',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the duration of the execution',
      },
    },
    {
      fieldName: 'resultCode',
      label: 'The result code.',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Enter the result code, please.',
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
      field: 'userId',
      title: 'User ID',
      minWidth: 100,
    },
    {
      field: 'userType',
      title: 'User Type',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'applicationName',
      title: 'Apply Name',
      minWidth: 150,
    },
    {
      field: 'requestMethod',
      title: 'Method of requesting',
      minWidth: 80,
    },
    {
      field: 'requestUrl',
      title: 'Address of the request',
      minWidth: 300,
    },
    {
      field: 'beginTime',
      title: 'Request time',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'duration',
      title: 'Duration of implementation',
      minWidth: 120,
      formatter: ({ cellValue }) => `${cellValue} ms`,
    },
    {
      field: 'resultCode',
      title: 'Operation Results',
      minWidth: 150,
      formatter: ({ row }) => {
        return row.resultCode === 0 ? 'Success' : `Failed (${row.resourceMsg})`;
      },
    },
    {
      field: 'operateModule',
      title: 'Operation Module',
      minWidth: 150,
    },
    {
      field: 'operateName',
      title: 'Operation Name',
      minWidth: 220,
    },
    {
      field: 'operateType',
      title: 'Operation Type',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_OPERATE_TYPE },
      },
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
    },
    {
      field: 'applicationName',
      label: 'Apply Name',
    },
    {
      field: 'userId',
      label: 'User Id',
    },
    {
      field: 'userType',
      label: 'User Type',
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.USER_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'userIp',
      label: 'User IP',
    },
    {
      field: 'userAgent',
      label: 'User UA',
    },
    {
      field: 'requestMethod',
      label: 'Information requested',
      render: (val, data) => {
        if (val && data?.requestUrl) {
          return `${val} ${data.requestUrl}`;
        }
        return '';
      },
    },
    {
      field: 'requestParams',
      label: 'Request Parameters',
      render: (val) => {
        if (val) {
          return h(JsonViewer, {
            value: JSON.parse(val),
            previewMode: true,
          });
        }
        return '';
      },
    },
    {
      field: 'responseBody',
      label: 'Outcome of request',
    },
    {
      label: 'Request time',
      field: 'beginTime',
      render: (val, data) => {
        if (val && data?.endTime) {
          return `${formatDateTime(val)} ~ ${formatDateTime(data.endTime)}`;
        }
        return '';
      },
    },
    {
      label: 'The request is time-consuming.',
      field: 'duration',
      render: (val) => {
        return val ? `${val} ms` : '';
      },
    },
    {
      label: 'Operation Results',
      field: 'resultCode',
      render: (val, data) => {
        if (val === 0) {
          return 'Normal';
        } else if (val > 0 && data?.resultCode > 0) {
          return `Error`;
        }
        return '';
      },
    },
    {
      field: 'operateModule',
      label: 'Operation Module',
    },
    {
      field: 'operateName',
      label: 'Operation Name',
    },
    {
      field: 'operateType',
      label: 'Operation Type',
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_OPERATE_TYPE,
          value: val,
        });
      },
    },
  ];
}
