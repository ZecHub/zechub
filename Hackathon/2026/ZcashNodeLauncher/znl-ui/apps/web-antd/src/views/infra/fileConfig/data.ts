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
      fieldName: 'name',
      label: 'Configure Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the configuration name',
      },
      rules: 'required',
    },
    {
      fieldName: 'storage',
      label: 'Memory',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_FILE_STORAGE, 'number'),
        placeholder: 'Please select the memory',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        disabled: (formValues) => formValues.id,
      },
    },
    {
      fieldName: 'remark',
      label: 'Remarks',
      component: 'Textarea',
      componentProps: {
        placeholder: 'Please enter your comments.',
      },
    },
    // DB / Local / FTP / SFTP
    {
      fieldName: 'config.basePath',
      label: 'Base Path',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the base path',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 10 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.host',
      label: 'Host Address',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the host address.',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.port',
      label: 'Host Port',
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: 'Please enter the port of the host',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.username',
      label: 'Username',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a username',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.password',
      label: 'Password',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the password.',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.mode',
      label: 'Connection Mode',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'Active Mode', value: 'Active' },
          { label: 'Passive Mode', value: 'Passive' },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 11,
      },
    },
    // S3
    {
      fieldName: 'config.endpoint',
      label: 'Node Address',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the node address',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.bucket',
      label: 'Store Bucket',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter Bucket',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.accessKey',
      label: 'accessKey',
      component: 'Input',
      componentProps: {
        placeholder: 'AccessKey, please.',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.accessSecret',
      label: 'accessSecret',
      component: 'Input',
      componentProps: {
        placeholder: 'AccessSecret',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.enablePathStyleAccess',
      label: 'Path Style',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'Enable', value: true },
          { label: 'Disable', value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
      defaultValue: false,
    },
    {
      fieldName: 'config.enablePublicAccess',
      label: 'Public access',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'Public', value: true },
          { label: 'Private', value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
      defaultValue: false,
    },
    // Universal
    {
      fieldName: 'config.domain',
      label: 'Custom domain name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a custom domain name',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => !!formValues.storage,
      },
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Configure Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the configuration name',
        allowClear: true,
      },
    },
    {
      fieldName: 'storage',
      label: 'Memory',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_FILE_STORAGE, 'number'),
        placeholder: 'Please select the memory',
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
      title: 'Numbering',
      minWidth: 100,
    },
    {
      field: 'name',
      title: 'Configure Name',
      minWidth: 120,
    },
    {
      field: 'storage',
      title: 'Memory',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_FILE_STORAGE },
      },
    },
    {
      field: 'remark',
      title: 'Remarks',
      minWidth: 150,
    },
    {
      field: 'master',
      title: 'Main Configuration',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
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