import { buildUUID } from '@vben/utils';

import {
  localeProps,
  makeRequiredRule,
} from '#/components/form-create/helpers';

export function useUploadImagesRule() {
  const label = 'Multi-map upload';
  const name = 'ImagesUpload';
  return {
    icon: 'icon-image',
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
          type: 'switch',
          field: 'drag',
          title: 'Drag Upload',
          value: false,
        },
        {
          type: 'select',
          field: 'fileType',
          title: 'Picture Type Limit',
          value: ['image/jpeg', 'image/png', 'image/gif'],
          options: [
            { label: 'image/apng', value: 'image/apng' },
            { label: 'image/bmp', value: 'image/bmp' },
            { label: 'image/gif', value: 'image/gif' },
            { label: 'image/jpeg', value: 'image/jpeg' },
            { label: 'image/pjpeg', value: 'image/pjpeg' },
            { label: 'image/svg+xml', value: 'image/svg+xml' },
            { label: 'image/tiff', value: 'image/tiff' },
            { label: 'image/webp', value: 'image/webp' },
            { label: 'image/x-icon', value: 'image/x-icon' },
          ],
          props: {
            multiple: true,
            maxNumber: 5,
          },
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
          type: 'input',
          field: 'height',
          title: 'Component height',
          value: '150px',
        },
        {
          type: 'input',
          field: 'width',
          title: 'Component Width',
          value: '150px',
        },
        {
          type: 'input',
          field: 'borderradius',
          title: 'Component Border Corner',
          value: '8px',
        },
      ]);
    },
  };
}