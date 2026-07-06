import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

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
      fieldName: 'category',
      label: 'Parameter Classification',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a parameter classification',
      },
      rules: 'required',
    },
    {
      fieldName: 'name',
      label: 'Parameter Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the parameter name',
      },
      rules: 'required',
    },
    {
      fieldName: 'key',
      label: 'Parameter Key Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the parameter keyname',
      },
      rules: 'required',
    },
    {
      fieldName: 'value',
      label: 'Parameter Keys',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the parameter key',
      },
      rules: 'required',
    },
    {
      fieldName: 'visible',
      label: 'Visible',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING, 'boolean'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      defaultValue: true,
      rules: 'required',
    },
    {
      fieldName: 'remark',
      label: 'Remarks',
      component: 'Textarea',
      componentProps: {
        placeholder: 'Please enter your comments.',
      },
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Parameter Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the parameter name',
        allowClear: true,
      },
    },
    {
      fieldName: 'key',
      label: 'Parameter Key Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the parameter keyname',
        allowClear: true,
      },
    },
    {
      fieldName: 'type',
      label: 'System settings',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_CONFIG_TYPE, 'number'),
        placeholder: 'Please select system settings',
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
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'Arguments Main Key',
      minWidth: 100,
    },
    {
      field: 'category',
      title: 'Parameter Classification',
      minWidth: 120,
    },
    {
      field: 'name',
      title: 'Parameter Name',
      minWidth: 200,
    },
    {
      field: 'key',
      title: 'Parameter Key Name',
      minWidth: 200,
    },
    {
      field: 'value',
      title: 'Parameter Keys',
      minWidth: 150,
    },
    {
      field: 'visible',
      title: 'Visible',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'type',
      title: 'System settings',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_CONFIG_TYPE },
      },
    },
    {
      field: 'remark',
      title: 'Remarks',
      minWidth: 150,
    },
    {
      field: 'createTime',
      title: 'Created',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      width: 160,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}