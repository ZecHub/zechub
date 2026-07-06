import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import {
  CommonStatusEnum,
  DICT_TYPE,
  SystemDataScopeEnum,
} from '@vben/constants';
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
      label: 'Role Name',
      component: 'Input',
      rules: 'required',
    },
    {
      fieldName: 'code',
      label: 'Role identification',
      component: 'Input',
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: 'Show Order',
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: 'Please enter display order',
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: 'Role Status',
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
      label: 'Role Remarks',
      component: 'Textarea',
    },
  ];
}

/** Form to allocate data privileges */
export function useAssignDataPermissionFormSchema(): VbenFormSchema[] {
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
      fieldName: 'name',
      label: 'Role Name',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: 'Role identification',
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Select',
      fieldName: 'dataScope',
      label: 'Scope of competence',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_DATA_SCOPE, 'number'),
      },
    },
    {
      fieldName: 'dataScopeDeptIds',
      label: 'Sectoral scope',
      component: 'Input',
      formItemClass: 'items-start',
      dependencies: {
        triggerFields: ['dataScope'],
        show: (values) => {
          return values.dataScope === SystemDataScopeEnum.DEPT_CUSTOM;
        },
      },
    },
  ];
}

/** Distribution Menu Form */
export function useAssignMenuFormSchema(): VbenFormSchema[] {
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
      label: 'Role Name',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'code',
      label: 'Role identification',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'menuIds',
      label: 'Menu Permissions',
      component: 'Input',
      formItemClass: 'items-start',
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Role Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the character name',
        allowClear: true,
      },
    },
    {
      fieldName: 'code',
      label: 'Role identification',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a character identification.',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Role Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: 'Please select the status of the role',
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
      title: 'Role Number',
      minWidth: 100,
    },
    {
      field: 'name',
      title: 'Role Name',
      minWidth: 200,
    },
    {
      field: 'type',
      title: 'Role Type',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_ROLE_TYPE },
      },
    },
    {
      field: 'code',
      title: 'Role identification',
      minWidth: 200,
    },
    {
      field: 'sort',
      title: 'Show Order',
      minWidth: 100,
    },
    {
      field: 'remark',
      title: 'Role Remarks',
      minWidth: 100,
    },
    {
      field: 'status',
      title: 'Role Status',
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
      width: 240,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}