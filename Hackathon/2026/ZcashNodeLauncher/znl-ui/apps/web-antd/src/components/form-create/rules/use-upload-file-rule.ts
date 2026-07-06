import { buildUUID } from '@vben/utils';

import {
  localeProps,
  makeRequiredRule,
} from '#/components/form-create/helpers';

export function useUploadFileRule() {
  const label = 'File Upload';
  const name = 'FileUpload';
  return {
    icon: 'icon-upload',
    label,
    name,
    rule() {
      return {
        type: name,
        field: buildUUID(),
        title: label,
        info: '',
        $required: false,
      };
    },
    props(_: any, { t }: any) {
      return localeProps(t, `${name}.props`, [
        makeRequiredRule(),
        {
          type: 'select',
          field: 'fileType',
          title: 'File Type',
          value: ['doc', 'xls', 'ppt', 'txt', 'pdf'],
          options: [
            { label: 'doc', value: 'doc' },
            { label: 'xls', value: 'xls' },
            { label: 'ppt', value: 'ppt' },
            { label: 'txt', value: 'txt' },
            { label: 'pdf', value: 'pdf' },
          ],
          props: {
            multiple: true,
          },
        },
        {
          type: 'switch',
          field: 'autoUpload',
          title: 'Whether to upload files as soon as they are selected',
          value: true,
        },
        {
          type: 'switch',
          field: 'drag',
          title: 'Drag Upload',
          value: false,
        },
        {
          type: 'switch',
          field: 'isShowTip',
          title: 'Whether or not to show hints',
          value: true,
        },
        {
          type: 'inputNumber',
          field: 'fileSize',
          title: 'Size Limit (MB)',
          value: 5,
          props: { min: 0 },
        },
        {
          type: 'inputNumber',
          field: 'limit',
          title: 'Quantities limit',
          value: 5,
          props: { min: 0 },
        },
        {
          type: 'switch',
          field: 'disabled',
          title: 'disabled',
          value: false,
        },
      ]);
    },
  };
}
