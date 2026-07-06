import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { JsonViewer } from '@vben/common-ui';
import { DICT_TYPE, InfraApiErrorLogProcessStatusEnum } from '@vben/constants';
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
      fieldName: 'exceptionTime',
      label: 'Anomalous time',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'processStatus',
      label: 'Process Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(
          DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS,
          'number',
        ),
        allowClear: true,
        placeholder: 'Select the status of the process',
      },
      defaultValue: InfraApiErrorLogProcessStatusEnum.INIT,
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
      minWidth: 200,
    },
    {
      field: 'exceptionTime',
      title: 'Anomalous time of occurrence',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'exceptionName',
      title: 'Anomalous name',
      minWidth: 180,
    },
    {
      field: 'processStatus',
      title: 'Process Status',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS },
      },
    },
    {
      title: 'Operation',
      minWidth: 220,
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
      field: 'exceptionTime',
      label: 'Anomalous time',
      render: (val) => {
        return formatDateTime(val) as string;
      },
    },
    {
      field: 'exceptionName',
      label: 'Anomalous name',
    },
    {
      field: 'exceptionStackTrace',
      label: 'Anomalous Stacks',
      show: (val) => !val,
      render: (val) => {
        if (val) {
          return h('textarea', {
            value: val,
            style:
              'width: 100%; min-height: 200px; max-height: 400px; resize: vertical;',
            readonly: true,
          });
        }
        return '';
      },
    },
    {
      field: 'processStatus',
      label: 'Process Status',
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'processUserId',
      label: 'Handle people.',
      show: (val) => !val,
    },
    {
      field: 'processTime',
      label: 'Processing Time',
      show: (val) => !val,
      render: (val) => {
        return formatDateTime(val) as string;
      },
    },
  ];
}