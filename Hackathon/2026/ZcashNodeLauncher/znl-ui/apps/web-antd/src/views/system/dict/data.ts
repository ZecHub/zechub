import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getSimpleDictTypeList } from '#/api/system/dict/type';

// ============================== Dictionary Type==============================

/** Form of type added/modified */
export function useTypeFormSchema(): VbenFormSchema[] {
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
      label: 'Dictionary Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a dictionary name',
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: 'Dictionary Type',
      component: 'Input',
      componentProps: (values) => {
        return {
          placeholder: 'Please enter the dictionary type',
          disabled: !!values.id,
        };
      },
      rules: 'required',
      dependencies: {
        triggerFields: [''],
      },
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
      componentProps: {
        placeholder: 'Please enter your comments.',
      },
    },
  ];
}

/** Search Forms for Type Lists */
export function useTypeGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Dictionary Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a dictionary name',
        allowClear: true,
      },
    },
    {
      fieldName: 'type',
      label: 'Dictionary Type',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the dictionary type',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: 'Please select the status',
        allowClear: true,
      },
    },
  ];
}

/** Fields in the Type List */
export function useTypeGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'Dictionary Numbering',
      minWidth: 100,
    },
    {
      field: 'name',
      title: 'Dictionary Name',
      minWidth: 200,
    },
    {
      field: 'type',
      title: 'Dictionary Type',
      minWidth: 220,
    },
    {
      field: 'status',
      title: 'Status',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'remark',
      title: 'Remarks',
      minWidth: 180,
    },
    {
      field: 'createTime',
      title: 'Created',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      minWidth: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

// ============================== Dictionary Data==============================

/**
 * Colour Options
 */
const colorOptions = [
  { value: '', label: 'None' },
  { value: 'processing', label: 'Main' },
  { value: 'success', label: 'Success' },
  { value: 'default', label: 'Default' },
  { value: 'warning', label: 'This function is EXPERIMENTAL.' },
  { value: 'error', label: 'It\'s dangerous.' },
  { value: 'pink', label: 'pink' },
  { value: 'red', label: 'red' },
  { value: 'orange', label: 'orange' },
  { value: 'green', label: 'green' },
  { value: 'cyan', label: 'cyan' },
  { value: 'blue', label: 'blue' },
  { value: 'purple', label: 'purple' },
];

/** Form to add/modify data */
export function useDataFormSchema(): VbenFormSchema[] {
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
      fieldName: 'dictType',
      label: 'Dictionary Type',
      component: 'ApiSelect',
      componentProps: (values) => {
        return {
          api: getSimpleDictTypeList,
          placeholder: 'Please enter the dictionary type',
          labelField: 'name',
          valueField: 'type',
          disabled: !!values.id,
        };
      },
      rules: 'required',
      dependencies: {
        triggerFields: [''],
      },
    },
    {
      fieldName: 'label',
      label: 'Data Label',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a data label.',
      },
      rules: 'required',
    },
    {
      fieldName: 'value',
      label: 'Data Keys',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the data key',
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: 'Show Sorting',
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter display sorting',
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: 'Please select the status',
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'colorType',
      label: 'Colour Type',
      component: 'Select',
      componentProps: {
        options: colorOptions,
        placeholder: 'Please select the colour type',
      },
    },
    {
      fieldName: 'cssClass',
      label: 'CSS Class',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter CSS Glass',
      },
      help: 'Enter the colour of the hex mode, e. g. #108ee9',
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

/** Search Forms for Dictionary Data List */
export function useDataGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'label',
      label: 'Dictionary Tags',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a dictionary label',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: 'Please select the status',
        allowClear: true,
      },
    },
  ];
}

/** Dictionary Data Table Columns */
export function useDataGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'Dictionary Encoding',
      minWidth: 100,
    },
    {
      field: 'label',
      title: 'Dictionary Tags',
      minWidth: 180,
    },
    {
      field: 'value',
      title: 'Dictionary Keys',
      minWidth: 100,
    },
    {
      field: 'sort',
      title: 'Sort Dictionary',
      minWidth: 100,
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
      field: 'colorType',
      title: 'Colour Type',
      minWidth: 120,
      slots: { default: 'colorType' },
    },
    {
      field: 'cssClass',
      title: 'CSS Class',
      minWidth: 120,
      slots: { default: 'cssClass' },
    },
    {
      title: 'Created',
      field: 'createTime',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      minWidth: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}