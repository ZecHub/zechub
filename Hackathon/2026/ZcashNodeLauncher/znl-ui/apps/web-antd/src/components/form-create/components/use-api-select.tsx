import type { ApiSelectProps } from '#/components/form-create/typing';

import { defineComponent, onMounted, ref, useAttrs } from 'vue';

import { isEmpty } from '@vben/utils';

import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from 'ant-design-vue';

import { requestClient } from '#/api/request';

export function useApiSelect(option: ApiSelectProps) {
  return defineComponent({
    name: option.name,
    props: {
      // Options Label
      labelField: {
        type: String,
        default: () => option.labelField ?? 'label',
      },
      // The value of the option
      valueField: {
        type: String,
        default: () => option.valueField ?? 'value',
      },
      // api interface
      url: {
        type: String,
        default: () => option.url ?? '',
      },
      // Type of request
      method: {
        type: String,
        default: 'GET',
      },
      // Option Parsing Functions
      parseFunc: {
        type: String,
        default: '',
      },
      // Request Parameters
      data: {
        type: String,
        default: '',
      },
      // Selector type, drop frame, checkbox, single box radio
      selectType: {
        type: String,
        default: 'select',
      },
      // Whether or not to choose more options
      multiple: {
        type: Boolean,
        default: false,
      },
      // Whether to search remotely
      remote: {
        type: Boolean,
        default: false,
      },
      // Parameters to carry when searching remotely
      remoteField: {
        type: String,
        default: 'label',
      },
    },
    setup(props) {
      const attrs = useAttrs();
      const options = ref<any[]>([]); // Drop Data
      const loading = ref(false); // Whether data are being obtained remotely
      const queryParam = ref<any>(); // Value currently entered
      const getOptions = async () => {
        options.value = [];
        // Interface Chooser
        if (isEmpty(props.url)) {
          return;
        }

        switch (props.method) {
          case 'GET': {
            let url: string = props.url;
            if (props.remote && queryParam.value !== undefined) {
              url = url.includes('?')
                ? `${url}&${props.remoteField}=${queryParam.value}`
                : `${url}?${props.remoteField}=${queryParam.value}`;
            }
            parseOptions(await requestClient.get(url));
            break;
          }
          case 'POST': {
            const data: any = JSON.parse(props.data);
            if (props.remote) {
              data[props.remoteField] = queryParam.value;
            }
            parseOptions(await requestClient.post(props.url, data));
            break;
          }
        }
      };

      function parseOptions(data: any) {
        //  Case I: If a custom parsing function is preferred to a custom parsing function
        if (!isEmpty(props.parseFunc)) {
          options.value = parseFunc()?.(data);
          return;
        }
        // Case II: Return directly to a list
        if (Array.isArray(data)) {
          parseOptions0(data);
          return;
        }
        // Scenario two: returns paged data, trying to read list
        data = data.list;
        if (!!data && Array.isArray(data)) {
          parseOptions0(data);
          return;
        }
        // Scenario three: not standard return
        console.warn(`API [${props.url}] result is not standard result`);
      }

      function parseOptions0(data: any[]) {
        if (Array.isArray(data)) {
          options.value = data.map((item: any) => ({
            label: parseExpression(item, props.labelField),
            value: parseExpression(item, props.valueField),
          }));
          return;
        }
        console.warn(`API [${props.url}] result is not an array`);
      }

      function parseFunc() {
        let parse: any = null;
        if (props.parseFunc) {
          // Parsing String Functions
          // eslint-disable-next-line no-new-func
          parse = new Function(`return ${props.parseFunc}`)();
        }
        return parse;
      }

      function parseExpression(data: any, template: string) {
        // Test whether expressions are used
        if (!template.includes('${')) {
          return data[template];
        }
        // ${...} in regular expression matching template string
        const pattern = /\$\{([^}]*)\}/g;
        // Replace with replace with regular expression and echo functions
        return template.replaceAll(pattern, (_, expr) => {
          // Expr is a matching expression in ${} (this is the attribute name) to get the corresponding value from data
          const result = data[expr.trim()]; // Removes the space before and after, in case the user enters a property name with a space
          if (!result) {
            console.warn(
              `template [${template}][${expr.trim()}] parse failed[${result}]`,
            );
          }
          return result;
        });
      }

      const remoteMethod = async (query: any) => {
        if (!query) {
          return;
        }
        loading.value = true;
        try {
          queryParam.value = query;
          await getOptions();
        } finally {
          loading.value = false;
        }
      };

      onMounted(async () => {
        await getOptions();
      });

      const buildSelect = () => {
        const {
          modelValue,
          'onUpdate:modelValue': onUpdateModelValue,
          ...restAttrs
        } = attrs;

        if (props.multiple) {
          // fix: This step is overwritten to solve the multiplete attribute problem
          return (
            <Select
              class="w-full"
              loading={loading.value}
              mode="multiple"
              onUpdate:value={onUpdateModelValue as any}
              value={modelValue as any}
              {...restAttrs}
              // TODO @xingyu remote realization, or nothing?
              // remote={props.remote}
              {...(props.remote && { remoteMethod })}
            >
              {options.value.map(
                (item: { label: any; value: any }, index: any) => (
                  <SelectOption key={index} value={item.value}>
                    {item.label}
                  </SelectOption>
                ),
              )}
            </Select>
          );
        }
        return (
          <Select
            class="w-full"
            loading={loading.value}
            onUpdate:value={onUpdateModelValue as any}
            value={modelValue as any}
            {...restAttrs}
            // TODO: @xingyu remote reciprocal realization, or nothing.
            // remote={props.remote}
            {...(props.remote && { remoteMethod })}
          >
            {options.value.map(
              (item: { label: any; value: any }, index: any) => (
                <SelectOption key={index} value={item.value}>
                  {item.label}
                </SelectOption>
              ),
            )}
          </Select>
        );
      };
      const buildCheckbox = () => {
        const {
          modelValue,
          'onUpdate:modelValue': onUpdateModelValue,
          ...restAttrs
        } = attrs;
        if (isEmpty(options.value)) {
          options.value = [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
          ];
        }
        return (
          <CheckboxGroup
            class="w-full"
            onUpdate:value={onUpdateModelValue as any}
            value={modelValue as any}
            {...restAttrs}
          >
            {options.value.map(
              (item: { label: any; value: any }, index: any) => (
                <Checkbox key={index} value={item.value}>
                  {item.label}
                </Checkbox>
              ),
            )}
          </CheckboxGroup>
        );
      };
      const buildRadio = () => {
        const {
          modelValue,
          'onUpdate:modelValue': onUpdateModelValue,
          ...restAttrs
        } = attrs;
        if (isEmpty(options.value)) {
          options.value = [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
          ];
        }
        return (
          <RadioGroup
            class="w-full"
            onUpdate:value={onUpdateModelValue as any}
            value={modelValue as any}
            {...restAttrs}
          >
            {options.value.map(
              (item: { label: any; value: any }, index: any) => (
                <Radio key={index} value={item.value}>
                  {item.label}
                </Radio>
              ),
            )}
          </RadioGroup>
        );
      };
      return () => (
        <>
          {(() => {
            switch (props.selectType) {
              case 'checkbox': {
                return buildCheckbox();
              }
              case 'radio': {
                return buildRadio();
              }
              case 'select': {
                return buildSelect();
              }
              default: {
                return buildSelect();
              }
            }
          })()}
        </>
      );
    },
  });
}
