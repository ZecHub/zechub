import type {
  VbenFormSchema as FormSchema,
  VbenFormProps,
} from '@vben/common-ui';

import type { ComponentType } from './component';

import { setupVbenForm, useVbenForm as useForm, z } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { isMobile } from '@vben/utils';

async function initSetupVbenForm() {
  setupVbenForm<ComponentType>({
    config: {
      // The ant design vue libraries are by default v-model:value
      baseModelPropName: 'value',

      // Some of the components are v-model:checked or v-model:filelist
      modelPropNameMap: {
        Checkbox: 'checked',
        Radio: 'checked',
        Switch: 'checked',
        Upload: 'fileList',
      },
    },
    defineRules: {
      // The input item has to be internationalized.
      required: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        return true;
      },
      // The selection of items requires internationalization.
      selectRequired: (value, _params, ctx) => {
        if (value === undefined || value === null) {
          return $t('ui.formRules.selectRequired', [ctx.label]);
        }
        return true;
      },
      // Cell phone numbers have to be filled out.
      mobile: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return true;
        } else if (!isMobile(value)) {
          return $t('ui.formRules.mobile', [ctx.label]);
        }
        return true;
      },
      // Cell phone numbers must be filled in.
      mobileRequired: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        if (!isMobile(value)) {
          return $t('ui.formRules.mobile', [ctx.label]);
        }
        return true;
      },
    },
  });
}

const useVbenForm = useForm<ComponentType>;

export { initSetupVbenForm, useVbenForm, z };

export type VbenFormSchema = FormSchema<ComponentType>;
export type { VbenFormProps };