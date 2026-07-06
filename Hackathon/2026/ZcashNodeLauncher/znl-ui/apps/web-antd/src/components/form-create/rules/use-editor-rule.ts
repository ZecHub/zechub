import { buildUUID } from '@vben/utils';

import {
  localeProps,
  makeRequiredRule,
} from '#/components/form-create/helpers';

export function useEditorRule() {
  const label = 'Rich Text';
  const name = 'Tinymce';
  return {
    icon: 'icon-editor',
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
          type: 'input',
          field: 'height',
          title: 'Height',
        },
        { type: 'switch', field: 'readonly', title: 'Read Only' },
      ]);
    },
  };
}