import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getRangePickerDefaultProps } from '#/utils';

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
      fieldName: 'name',
      label: 'Package Name',
      component: 'Input',
      rules: 'required',
    },
    {
      fieldName: 'menuIds',
      label: 'Menu Permissions',
      component: 'Input',
      formItemClass: 'items-start',
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
    {
      fieldName: 'remark',
      label: 'Remarks',
      component: 'Textarea',
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Package Name',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please enter the name of the package',
      },
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: 'Please select the status',
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
      title: 'Package Number',
      minWidth: 100,
    },
    {
      field: 'name',
      title: 'Package Name',
      minWidth: 180,
    },
    {
      field: 'status',
      title: 'Status',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'remark',
      title: 'Remarks',
      minWidth: 200,
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