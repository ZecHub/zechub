import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ZcashInstallationScriptApi } from '#/api/zcash/installationscript';

import { getRangePickerDefaultProps } from '#/utils';

/** Form for Add/Edit */
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
      fieldName: 'name',
      label: 'Name',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input Name',
      },
    },
    {
      fieldName: 'url',
      label: 'url',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input url',
      },
    },
    {
      fieldName: 'sort',
      label: 'Show Order',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input Show Order',
      },
    },
    {
      fieldName: 'remark',
      label: 'Remarks',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input Remarks',
      },
    },
  ];
}

/** Search form for list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Name',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please input Name',
      },
    },
    {
      fieldName: 'url',
      label: 'URL',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please input url',
      },
    },
    {
      fieldName: 'remark',
      label: 'Remarks',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please input Remarks',
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

/** List columns */
export function useGridColumns(): VxeTableGridOptions<ZcashInstallationScriptApi.InstallationScript>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'ID',
      minWidth: 120,
    },
    {
      field: 'name',
      title: 'Name',
      minWidth: 120,
    },
    {
      field: 'url',
      title: 'url',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: 'Show Order',
      minWidth: 120,
    },
    {
      field: 'remark',
      title: 'Remarks',
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: 'Created',
      minWidth: 120,
      formatter: 'formatDateTime',
    },
    {
      title: 'Action',
      width: 200,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
