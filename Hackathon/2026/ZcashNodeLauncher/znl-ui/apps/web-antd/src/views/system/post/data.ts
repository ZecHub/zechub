import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';

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
      component: 'Input',
      fieldName: 'name',
      label: 'Name of post',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: 'Job Coding',
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: 'Show Order',
      component: 'InputNumber',
      componentProps: {
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: 'Position Status',
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
      label: 'Post allowance.',
      component: 'Textarea',
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Name of post',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the name of the post',
        allowClear: true,
      },
    },
    {
      fieldName: 'code',
      label: 'Job Coding',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the job code.',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Position Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: 'Please select the status of the post.',
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
      title: 'Job ID',
      minWidth: 200,
    },
    {
      field: 'name',
      title: 'Name of post',
      minWidth: 200,
    },
    {
      field: 'code',
      title: 'Job Coding',
      minWidth: 200,
    },
    {
      field: 'sort',
      title: 'Show Order',
      minWidth: 100,
    },
    {
      field: 'remark',
      title: 'Post allowance.',
      minWidth: 200,
    },
    {
      field: 'status',
      title: 'Position Status',
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
      width: 130,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}