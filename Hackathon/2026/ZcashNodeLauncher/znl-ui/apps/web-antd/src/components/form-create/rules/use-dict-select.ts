import type { SystemDictTypeApi } from '#/api/system/dict/type';

import { onMounted, ref } from 'vue';

import { buildUUID, cloneDeep } from '@vben/utils';

import { getSimpleDictTypeList } from '#/api/system/dict/type';
import {
  localeProps,
  makeRequiredRule,
} from '#/components/form-create/helpers';
import { selectRule } from '#/components/form-create/rules/data';

/**
 * Dictionary selection rules, which require separate configuration if dynamic data is used
 */
export function useDictSelectRule() {
  const label = 'Dictionary Selector';
  const name = 'DictSelect';
  const rules = cloneDeep(selectRule);
  const dictOptions = ref<{ label: string; value: string }[]>([]); // Dictionary type drops data
  onMounted(async () => {
    const data = await getSimpleDictTypeList();
    if (!data || data.length === 0) {
      return;
    }
    dictOptions.value =
      data?.map((item: SystemDictTypeApi.DictType) => ({
        label: item.name,
        value: item.type,
      })) ?? [];
  });
  return {
    icon: 'icon-descriptions',
    label,
    name,
    rule() {
      return {
        type: name,
        field: buildUUID(),
        title: label,
        info: '',
        $required: false,
        modelField: 'value',
      };
    },
    props(_: any, { t }: any) {
      return localeProps(t, `${name}.props`, [
        makeRequiredRule(),
        {
          type: 'select',
          field: 'dictType',
          title: 'Dictionary Type',
          value: '',
          options: dictOptions.value,
        },
        {
          type: 'select',
          field: 'valueType',
          title: 'Dictionary Value Type',
          value: 'str',
          options: [
            { label: 'Numbers', value: 'int' },
            { label: 'String', value: 'str' },
            { label: 'Boolean value', value: 'bool' },
          ],
        },
        ...rules,
      ]);
    },
  };
}