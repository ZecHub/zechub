import type { SelectRuleOption } from '#/components/form-create/typing';

import { buildUUID, cloneDeep } from '@vben/utils';

import {
  localeProps,
  makeRequiredRule,
} from '#/components/form-create/helpers';
import { selectRule } from '#/components/form-create/rules/data';

/**
 * General Selector Rule Hook * @param option rule configuration
 */
export function useSelectRule(option: SelectRuleOption) {
  const label = option.label;
  const name = option.name;
  const rules = cloneDeep(selectRule);
  return {
    icon: option.icon,
    label,
    name,
    event: option.event,
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
      if (!option.props) {
        option.props = [];
      }
      return localeProps(t, `${name}.props`, [
        makeRequiredRule(),
        ...option.props,
        ...rules,
      ]);
    },
  };
}