import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemTenantPackageApi } from '#/api/system/tenant-package';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getTenantPackageList } from '#/api/system/tenant-package';
import { getRangePickerDefaultProps } from '#/utils';

/** Link Data */
let tenantPackageList: SystemTenantPackageApi.TenantPackage[] = [];
getTenantPackageList().then((data) => (tenantPackageList = data));

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
      label: 'Tenant name',
      component: 'Input',
      rules: 'required',
    },
    {
      fieldName: 'packageId',
      label: 'Tenant Suite',
      component: 'ApiSelect',
      componentProps: {
        api: getTenantPackageList,
        labelField: 'name',
        valueField: 'id',
        placeholder: 'Please choose the tenant package.',
      },
      rules: 'required',
    },
    {
      fieldName: 'contactName',
      label: 'contactName',
      component: 'Input',
      rules: 'required',
    },
    {
      fieldName: 'contactMobile',
      label: 'Cell phone',
      component: 'Input',
      // rules: 'mobile',
    },
    {
      label: 'User Name',
      fieldName: 'username',
      component: 'Input',
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        show: (values) => !values.id,
      },
    },
    {
      label: 'User password',
      fieldName: 'password',
      component: 'InputPassword',
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        show: (values) => !values.id,
      },
    },
    {
      label: 'Number of accounts',
      fieldName: 'accountCount',
      component: 'InputNumber',
      rules: 'required',
    },
    {
      label: 'Expiration time',
      fieldName: 'expireTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'x',
        placeholder: 'Please select the expiry date',
      },
      rules: 'required',
    },
    {
      label: 'Bind domain names',
      fieldName: 'websites',
      component: 'Select',
      componentProps: {
        placeholder: 'Please enter a binding domain name',
        mode: 'tags',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Tenant status',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: 'Tenant name',
      component: 'Input',
      componentProps: {
        placeholder: "Please enter the tenant's name.",
        allowClear: true,
      },
    },
    {
      fieldName: 'contactName',
      label: 'contactName',
      component: 'Input',
      componentProps: {
        placeholder: 'contactName',
        allowClear: true,
      },
    },
    {
      fieldName: 'contactMobile',
      label: 'Cell phone',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the contact phone.',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: 'Status',
      component: 'Select',
      componentProps: {
        placeholder: 'Please select the status',
        allowClear: true,
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
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
      title: 'Tenant Number',
      minWidth: 100,
    },
    {
      field: 'name',
      title: 'Tenant name',
      minWidth: 180,
    },
    {
      field: 'packageId',
      title: 'Tenant Suite',
      minWidth: 180,
      formatter: ({ cellValue }) => {
        return cellValue === 0
          ? 'System Tenant'
          : tenantPackageList.find((pkg) => pkg.id === cellValue)?.name || '-';
      },
    },
    {
      field: 'contactName',
      title: 'contactName',
      minWidth: 100,
    },
    {
      field: 'contactMobile',
      title: 'Cell phone',
      minWidth: 180,
    },
    {
      field: 'accountCount',
      title: 'Number of accounts',
      minWidth: 100,
    },
    {
      field: 'expireTime',
      title: 'Expiration time',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'websites',
      title: 'Bind domain names',
      minWidth: 180,
    },
    {
      field: 'status',
      title: 'Tenant status',
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
