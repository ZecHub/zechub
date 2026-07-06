import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';

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
      fieldName: 'clientId',
      label: 'Client ID',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter client number',
      },
      rules: 'required',
    },
    {
      fieldName: 'secret',
      label: 'Client Key',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the client key',
      },
      rules: 'required',
    },
    {
      fieldName: 'name',
      label: 'Apply Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the application name',
      },
      rules: 'required',
    },
    {
      fieldName: 'logo',
      label: 'Apply Icon',
      component: 'ImageUpload',
      rules: 'required',
    },
    {
      fieldName: 'description',
      label: 'Apply Description',
      component: 'Textarea',
      componentProps: {
        placeholder: 'Please enter an application description',
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
      fieldName: 'accessTokenValiditySeconds',
      label: 'Access to the period of validity of the medal',
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Enter the validity period of the access token, in seconds',
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'refreshTokenValiditySeconds',
      label: 'Refresh the period of validity of the medals',
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Enter the validity period of the refresher token in: seconds',
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'authorizedGrantTypes',
      label: 'Type of authorization',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_OAUTH2_GRANT_TYPE),
        mode: 'multiple',
        placeholder: 'Please enter the authorization type',
      },
      rules: 'required',
    },
    {
      fieldName: 'scopes',
      label: 'Scope of the mandate',
      component: 'Select',
      componentProps: {
        placeholder: 'Please enter the authorized range',
        mode: 'tags',
        allowClear: true,
      },
    },
    {
      fieldName: 'autoApproveScopes',
      label: 'AutoAuthority',
      component: 'Select',
      componentProps: {
        placeholder: 'Please enter the automatic authorized range',
        mode: 'multiple',
      },
      dependencies: {
        triggerFields: ['scopes'],
        componentProps: (values) => ({
          options: values.scopes
            ? values.scopes.map((scope: string) => ({
                label: scope,
                value: scope,
              }))
            : [],
        }),
      },
    },
    {
      fieldName: 'redirectUris',
      label: 'Redirectable URI address',
      component: 'Select',
      componentProps: {
        placeholder: 'Please enter a redirectable URI address',
        mode: 'tags',
      },
      rules: 'required',
    },
    {
      fieldName: 'authorities',
      label: 'Permissions',
      component: 'Select',
      componentProps: {
        placeholder: 'Please enter permissions',
        mode: 'tags',
      },
    },
    {
      fieldName: 'resourceIds',
      label: 'Resources',
      component: 'Select',
      componentProps: {
        mode: 'tags',
        placeholder: 'Please enter the resource',
      },
    },
    {
      fieldName: 'additionalInformation',
      label: 'Can not open message',
      component: 'Textarea',
      componentProps: {
        placeholder: 'Please enter additional information, JSON format data',
      },
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Apply Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the application name',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: 'Please enter the status',
      },
    },
  ];
}

/** Fields in the List */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'clientId',
      title: 'Client ID',
      minWidth: 120,
    },
    {
      field: 'secret',
      title: 'Client Key',
      minWidth: 120,
    },
    {
      field: 'name',
      title: 'Apply Name',
      minWidth: 120,
    },
    {
      field: 'logo',
      title: 'Apply Icon',
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'status',
      title: 'Status',
      minWidth: 80,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'accessTokenValiditySeconds',
      title: 'Access to the period of validity of the medal',
      minWidth: 150,
      formatter: ({ cellValue }) => `${cellValue} sec`,
    },
    {
      field: 'refreshTokenValiditySeconds',
      title: 'Refresh the period of validity of the medals',
      minWidth: 150,
      formatter: ({ cellValue }) => `${cellValue} sec`,
    },
    {
      field: 'authorizedGrantTypes',
      title: 'Type of authorization',
      minWidth: 100,
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