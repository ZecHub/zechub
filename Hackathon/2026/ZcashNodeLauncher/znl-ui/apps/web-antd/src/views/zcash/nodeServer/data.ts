import type { FormActions } from '../../../../../../packages/@core/ui-kit/form-ui/src/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ZcashNodeServerApi } from '#/api/zcash/nodeServer';

import { getRangePickerDefaultProps } from '#/utils';

const showIfIdNotNull = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => {
  if (value.id == null) {
    return false;
  }
  return true;
};

const serverInfoDependencies = {
  triggerFields: ['id'],
  show: showIfIdNotNull,
};

/** Form for Add/Edit */
export function useServerConfigFormSchema(): VbenFormSchema[] {
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
      fieldName: 'host',
      label: 'Host',
      rules: 'required',
      component: 'Input',
      formItemClass: 'col-span-9',
      componentProps: {
        placeholder: 'Please input host',
      },
    },
    {
      fieldName: 'port',
      label: 'Port',
      rules: 'required',
      component: 'Input',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: 'Default: 22',
      },
    },
    {
      fieldName: 'name',
      label: 'Name',
      rules: 'required',
      component: 'Input',
      formItemClass: 'col-span-9',
      componentProps: {
        placeholder: 'Please input Name',
      },
    },
    {
      fieldName: 'sort',
      label: 'Show Order',
      component: 'Input',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: 'Show Order',
      },
    },
    {
      fieldName: 'username',
      label: 'Username',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input username',
      },
    },
    {
      fieldName: 'password',
      label: 'Password',
      rules: 'required',
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please input password',
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

/** Form for Add/Edit */
export function useProxyConfigFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'proxyType',
      label: 'Proxy Type',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'HTTP', value: 'HTTP' },
          { label: 'SOCKS5', value: 'SOCKS5' },
        ],
        placeholder: 'Please select proxy type',
      },
    },
    {
      fieldName: 'proxyHost',
      label: 'Proxy Host',
      component: 'Input',
      formItemClass: 'col-span-9',
      componentProps: {
        placeholder: 'Please input proxy host',
      },
    },
    {
      fieldName: 'proxyPort',
      label: 'Proxy Port',
      component: 'Input',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: 'port',
      },
    },
    {
      fieldName: 'proxyUsername',
      label: 'Proxy Username',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input proxy username',
      },
    },
    {
      fieldName: 'proxyPassword',
      label: 'Proxy Password',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input proxy password',
      },
    },
  ];
}

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
      fieldName: 'host',
      label: 'Host',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input host',
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
      fieldName: 'port',
      label: 'Port',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input default: 21',
      },
    },
    {
      fieldName: 'username',
      label: 'Username',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input username',
      },
    },
    {
      fieldName: 'password',
      label: 'Password',
      rules: 'required',
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please input password',
      },
    },
    {
      fieldName: 'nodeType',
      label: 'Node Type',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: [
          { label: 'Purning Node', value: 'Purning Node' },
          { label: 'Full Node', value: 'Full Node' },
        ],
        placeholder: 'Please select Pruning Node/ Full Node',
      },
    },
    {
      fieldName: 'proxyType',
      label: 'Proxy Type',
      component: 'Select',
      componentProps: {
        options: [
          { label: 'HTTP', value: 'HTTP' },
          { label: 'SOCKS5', value: 'SOCKS5' },
        ],
        placeholder: 'Please select proxy type',
      },
    },
    {
      fieldName: 'proxyHost',
      label: 'Proxy Host',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input proxy host',
      },
    },
    {
      fieldName: 'proxyPort',
      label: 'Proxy Port',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input proxy port',
      },
    },
    {
      fieldName: 'proxyUsername',
      label: 'Proxy Username',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input proxy username',
      },
    },
    {
      fieldName: 'proxyPassword',
      label: 'Proxy Password',
      component: 'Input',
      componentProps: {
        placeholder: 'Please input proxy password',
      },
    },
    {
      fieldName: 'serverStatus',
      label: 'Server Status',
      component: 'Input',
      componentProps: {
        placeholder: '',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'serverError',
      label: 'Server Error', // network not reachable / incorrect password / Exception
      component: 'Textarea',
      componentProps: {
        placeholder: '',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'serverStatusCheckTime',
      label: 'Server Status Check Time',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'installationStatus',
      label: 'Installation Status', // not installed / installed
      component: 'Input',
      componentProps: {
        placeholder: '',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'installationLog',
      label: 'Installation Log',
      component: 'Textarea',
      componentProps: {
        placeholder: '',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'installationStatusCheckTime',
      label: 'Installation Status Check Time',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'nodeStatus',
      label: 'Node Status', // created / running / paused / restarting / dead / removing / exited
      component: 'Input',
      componentProps: {
        placeholder: '',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'nodeError',
      label: 'Node Error',
      component: 'Textarea',
      componentProps: {
        placeholder: '',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
    },
    {
      fieldName: 'nodeStatusCheckTime',
      label: 'Node Status Check Time',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
        disabled: true,
      },
      dependencies: serverInfoDependencies,
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
      fieldName: 'host',
      label: 'Host',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: 'Please input host',
      },
    },
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
      fieldName: 'nodeType',
      label: 'Node type',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'Purning Node', value: 'Purning Node' },
          { label: 'Full Node', value: 'Full Node' },
        ],
        placeholder: 'Please select Pruning Node/ Full Node',
      },
    },
    {
      fieldName: 'serverStatus',
      label: 'Server Status',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'online', value: 'online' },
          { label: 'lost', value: 'lost' },
        ],
        placeholder: 'Please select',
      },
    },
    {
      fieldName: 'installationStatus',
      label: 'Installation Status',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'not installed', value: 'not installed' },
          { label: 'installed', value: 'installed' },
        ],
        placeholder: 'Please select',
      },
    },
    {
      fieldName: 'nodeStatus',
      label: 'Node Status',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'created', value: 'created' },
          { label: 'running', value: 'running' },
          { label: 'paused', value: 'paused' },
          { label: 'restarting', value: 'restarting' },
          { label: 'dead', value: 'dead' },
          { label: 'removing', value: 'removing' },
          { label: 'exited', value: 'exited' },
        ],
        placeholder: 'Please select',
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
export function useGridColumns(): VxeTableGridOptions<ZcashNodeServerApi.NodeServer>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'ID',
      minWidth: 60,
    },
    {
      field: 'name',
      title: 'Name',
      minWidth: 120,
    },
    {
      field: 'nodeType',
      title: 'Node Type',
      minWidth: 120,
    },
    {
      field: 'serverStatus',
      title: 'Server Status',
      minWidth: 85,
      slots: { default: 'serverStatus' },
      align: 'center',
    },
    {
      field: 'installationStatus',
      title: 'Installation Status',
      minWidth: 80,
      slots: { default: 'installationStatus' },
    },
    {
      field: 'nodeStatus',
      title: 'Node Status',
      slots: { default: 'nodeStatus' },
      minWidth: 80,
    },
    {
      field: 'sort',
      title: 'Show Order',
      minWidth: 80,
    },
    {
      field: 'remark',
      title: 'Remarks',
      minWidth: 150,
    },
    {
      field: 'createTime',
      title: 'Created',
      minWidth: 160,
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

export const NODE_STATUS = [
  {
    icon: 'carbon:play-filled-alt',
    value: 'running',
    color: 'green',
  },
  {
    icon: 'carbon:stop-filled-alt',
    value: 'created',
    color: 'red',
  },
  {
    icon: 'carbon:stop-filled-alt',
    value: 'paused',
    color: 'red',
  },
  {
    icon: 'carbon:stop-filled-alt',
    value: 'restarting',
    color: 'red',
  },
  {
    icon: 'carbon:stop-filled-alt',
    value: 'dead',
    color: 'red',
  },
  {
    icon: 'carbon:stop-filled-alt',
    value: 'removing',
    color: 'red',
  },
  {
    icon: 'carbon:stop-filled-alt',
    value: 'exited',
    color: 'red',
  },
];

export const INSTALLATION_STATUS = [
  {
    icon: 'carbon:checkmark-filled',
    value: 'installed',
    color: 'green',
  },
  {
    icon: 'carbon:close-filled',
    value: 'not installed',
    color: 'red',
  },
];

export const SERVER_STATUS = [
  {
    icon: 'carbon:play-filled-alt',
    value: 'online',
    color: 'green',
  },
  { icon: 'carbon:stop-filled-alt', value: 'lost', color: 'red' },
];
