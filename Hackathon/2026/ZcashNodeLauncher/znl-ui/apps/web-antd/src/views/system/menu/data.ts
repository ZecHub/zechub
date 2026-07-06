import type { Recordable } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemMenuApi } from '#/api/system/menu';

import { h } from 'vue';

import {
  CommonStatusEnum,
  DICT_TYPE,
  SystemMenuTypeEnum,
} from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { IconifyIcon } from '@vben/icons';
import { handleTree, isHttpUrl } from '@vben/utils';

import { z } from '#/adapter/form';
import { getMenuList } from '#/api/system/menu';
import { $t } from '#/locales';
import { componentKeys } from '#/router/routes';

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
      fieldName: 'parentId',
      label: 'Higher Menu',
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getMenuList();
          data.unshift({
            id: 0,
            name: 'Top sector',
          } as SystemMenuApi.Menu);
          return handleTree(data);
        },
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: 'Please select a higher menu',
        filterTreeNode(input: string, node: Recordable<any>) {
          if (!input || input.length === 0) {
            return true;
          }
          const name: string = node.label ?? '';
          if (!name) return false;
          return name.includes(input) || $t(name).includes(input);
        },
        showSearch: true,
        treeDefaultExpandedKeys: [0],
      },
      rules: 'selectRequired',
      renderComponentContent() {
        return {
          title({ label, icon }: { icon: string; label: string }) {
            const components = [];
            if (!label) return '';
            if (icon) {
              components.push(h(IconifyIcon, { class: 'size-4', icon }));
            }
            components.push(h('span', { class: '' }, $t(label || '')));
            return h('div', { class: 'flex items-center gap-1' }, components);
          },
        };
      },
    },
    {
      fieldName: 'name',
      label: 'Menu Name',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the name of the menu',
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: 'Menu Type',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_MENU_TYPE, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(SystemMenuTypeEnum.DIR),
    },
    {
      fieldName: 'icon',
      label: 'Menu Icon',
      component: 'IconPicker',
      componentProps: {
        placeholder: 'Please select the menu icon',
        prefix: 'carbon',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.DIR, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
      },
    },
    {
      fieldName: 'path',
      label: 'Route Address',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a route address.',
      },
      rules: z.string(),
      help: "Visited route address, e.g. `user '. If you need an exterior address, start with `http(s):// '",
      dependencies: {
        triggerFields: ['type', 'parentId'],
        show: (values) => {
          return [SystemMenuTypeEnum.DIR, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
        rules: (values) => {
          const schema = z.string().min(1, "The route address can't be empty.");
          if (isHttpUrl(values.path)) {
            return schema;
          }
          if (values.parentId === 0) {
            return schema.refine(
              (path) => path.charAt(0) === '/',
              'Path must start with /',
            );
          }
          return schema.refine(
            (path) => path.charAt(0) !== '/',
            'Path cannot start with /',
          );
        },
      },
    },
    {
      fieldName: 'component',
      label: 'Component Address',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the component address',
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
    {
      fieldName: 'componentName',
      label: 'Component Name',
      component: 'AutoComplete',
      componentProps: {
        allowClear: true,
        filterOption(input: string, option: { value: string }) {
          return option.value.toLowerCase().includes(input.toLowerCase());
        },
        placeholder: 'Select the name of the component',
        options: componentKeys.map((v) => ({ value: v })),
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
    {
      fieldName: 'permission',
      label: 'Permission Identification',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the menu description',
      },
      dependencies: {
        show: (values) => {
          return [SystemMenuTypeEnum.BUTTON, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
        triggerFields: ['type'],
      },
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
      label: 'Menu Status',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'alwaysShow',
      label: 'Always Show',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'Always', value: true },
          { label: "No, it's not.", value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      defaultValue: true,
      help: "Select when there is only one sub-menu in the menu, you don't show yourself, you show the sub-menu.",
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
    {
      fieldName: 'keepAlive',
      label: 'Cache Status',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'Cache', value: true },
          { label: 'No Cache', value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      defaultValue: true,
      help: "When selecting a cache, it will be `keep-alive'Cache, which must be filled in the `component name' field",
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
  ];
}

/** Fields in the List */
export function useGridColumns(): VxeTableGridOptions<SystemMenuApi.Menu>['columns'] {
  return [
    {
      field: 'name',
      title: 'Menu Name',
      minWidth: 250,
      align: 'left',
      fixed: 'left',
      slots: { default: 'name' },
      treeNode: true,
    },
    {
      field: 'type',
      title: 'Menu Type',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_MENU_TYPE },
      },
    },
    {
      field: 'sort',
      title: 'Show Sorting',
      minWidth: 100,
    },
    {
      field: 'permission',
      title: 'Permission Identification',
      minWidth: 200,
    },
    {
      field: 'path',
      title: 'Component Path',
      minWidth: 200,
    },
    {
      field: 'componentName',
      title: 'Component Name',
      minWidth: 200,
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
      title: 'Operation',
      width: 250,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
