<script lang="ts" setup>
import type { Component } from 'vue';

import type { AnyPromiseFunction } from '@vben/types';

import { computed, nextTick, ref, unref, useAttrs, watch } from 'vue';

import { LoaderCircle } from '@vben/icons';

import { cloneDeep, get, isEqual, isFunction } from '@vben-core/shared/utils';

import { objectOmit } from '@vueuse/core';

type OptionsItem = {
  [name: string]: any;
  children?: OptionsItem[];
  disabled?: boolean;
  label?: string;
  value?: string;
};

interface Props {
  /** Component */
  component: Component;
  /** Whether or not to convert value from a number to a string */
  numberToString?: boolean;
  /** Function to fetch options data */
  api?: (arg?: any) => Promise<OptionsItem[] | Record<string, any>>;
  /** Parameters passed to api */
  params?: Record<string, any>;
  /** Remove field names from the range of options returned from api */
  resultField?: string;
  /** Label field name */
  labelField?: string;
  /** Children field name required for use as part of hierarchical data */
  childrenField?: string;
  /** Value field name */
  valueField?: string;
  /** Attribute name for component to receive options data */
  optionsPropName?: string;
  /** Call api immediately */
  immediate?: boolean;
  /** Rerequest data for every `visibleEvent'event */
  alwaysLoad?: boolean;
  /** Echo function before api requests */
  beforeFetch?: AnyPromiseFunction<any, any>;
  /** Echo function after api requests */
  afterFetch?: AnyPromiseFunction<any, any>;
  /** Send option data directly and also as backup data when api returns empty data */
  options?: OptionsItem[];
  /** The name of the plugin for the component to display an icon for "loading" */
  loadingSlot?: string;
  /** Activate the event name requested by api */
  visibleEvent?: string;
  /** The component's v-model attribute name, by default, is modelValue. Some components may be value */
  modelPropName?: string;
  /**
   * Autoselect * - `first ': Automatically select the first option * - `last ': Automatically select the last option * - `one ': Automatically select the option * - function: custom select logic, function parameter is the requested result array, return value to the selected option * - `last ': do not automatically select (default)
   */
  autoSelect?:
    | 'first'
    | 'last'
    | 'one'
    | ((item: OptionsItem[]) => OptionsItem)
    | false;
}

defineOptions({ name: 'ApiComponent', inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  labelField: 'label',
  valueField: 'value',
  childrenField: '',
  optionsPropName: 'options',
  resultField: '',
  visibleEvent: '',
  numberToString: false,
  params: () => ({}),
  immediate: true,
  alwaysLoad: false,
  loadingSlot: '',
  beforeFetch: undefined,
  afterFetch: undefined,
  modelPropName: 'modelValue',
  api: undefined,
  autoSelect: false,
  options: () => [],
});

const emit = defineEmits<{
  optionsChange: [OptionsItem[]];
}>();

const modelValue = defineModel<any>({ default: undefined });

const attrs = useAttrs();
const innerParams = ref({});
const refOptions = ref<OptionsItem[]>([]);
const loading = ref(false);
// Did you load it for the first time?
const isFirstLoaded = ref(false);
// Request to be marked pending
const hasPendingRequest = ref(false);

const getOptions = computed(() => {
  const { labelField, valueField, childrenField, numberToString } = props;

  const refOptionsData = unref(refOptions);

  function transformData(data: OptionsItem[]): OptionsItem[] {
    return data.map((item) => {
      const value = get(item, valueField);
      return {
        ...objectOmit(item, [labelField, valueField, childrenField]),
        label: get(item, labelField),
        value: numberToString ? `${value}` : value,
        ...(childrenField && item[childrenField]
          ? { children: transformData(item[childrenField]) }
          : {}),
      };
    });
  }

  const data: OptionsItem[] = transformData(refOptionsData);

  return data.length > 0 ? data : props.options;
});

const bindProps = computed(() => {
  return {
    [props.modelPropName]: unref(modelValue),
    [props.optionsPropName]: unref(getOptions),
    [`onUpdate:${props.modelPropName}`]: (val: string) => {
      modelValue.value = val;
    },
    ...objectOmit(attrs, [`onUpdate:${props.modelPropName}`]),
    ...(props.visibleEvent
      ? {
          [props.visibleEvent]: handleFetchForVisible,
        }
      : {}),
  };
});

async function fetchApi() {
  const { api, beforeFetch, afterFetch, resultField } = props;

  if (!api || !isFunction(api)) {
    return;
  }

  // Mark pending requests and return if loaded
  if (loading.value) {
    hasPendingRequest.value = true;
    return;
  }

  refOptions.value = [];
  try {
    loading.value = true;
    let finalParams = unref(mergedParams);
    if (beforeFetch && isFunction(beforeFetch)) {
      finalParams = (await beforeFetch(cloneDeep(finalParams))) || finalParams;
    }
    let res = await api(finalParams);
    if (afterFetch && isFunction(afterFetch)) {
      res = (await afterFetch(res)) || res;
    }
    isFirstLoaded.value = true;
    if (Array.isArray(res)) {
      refOptions.value = res;
      emitChange();
      return;
    }
    if (resultField) {
      refOptions.value = get(res, resultField) || [];
    }
    emitChange();
  } catch (error) {
    console.warn(error);
    // reset status
    isFirstLoaded.value = false;
  } finally {
    loading.value = false;
    // In the event of a pending request, trigger a new request immediately
    if (hasPendingRequest.value) {
      hasPendingRequest.value = false;
      // Use nextTick to ensure that status updates are completed before triggering new requests
      await nextTick();
      fetchApi();
    }
  }
}

async function handleFetchForVisible(visible: boolean) {
  if (visible) {
    if (props.alwaysLoad) {
      await fetchApi();
    } else if (!props.immediate && !unref(isFirstLoaded)) {
      await fetchApi();
    }
  }
}

const mergedParams = computed(() => {
  return {
    ...props.params,
    ...unref(innerParams),
  };
});

watch(
  mergedParams,
  (value, oldValue) => {
    if (isEqual(value, oldValue)) {
      return;
    }
    fetchApi();
  },
  { deep: true, immediate: props.immediate },
);

function emitChange() {
  if (
    modelValue.value === undefined &&
    props.autoSelect &&
    unref(getOptions).length > 0
  ) {
    let firstOption;
    if (isFunction(props.autoSelect)) {
      firstOption = props.autoSelect(unref(getOptions));
    } else {
      switch (props.autoSelect) {
        case 'first': {
          firstOption = unref(getOptions)[0];
          break;
        }
        case 'last': {
          firstOption = unref(getOptions)[unref(getOptions).length - 1];
          break;
        }
        case 'one': {
          if (unref(getOptions).length === 1) {
            firstOption = unref(getOptions)[0];
          }
          break;
        }
      }
    }

    if (firstOption) modelValue.value = firstOption.value;
  }
  emit('optionsChange', unref(getOptions));
}
const componentRef = ref();
defineExpose({
  /** Fetching options data */
  getOptions: () => unref(getOptions),
  /** Fetch Current Value */
  getValue: () => unref(modelValue),
  /** Examples of acquisition of packaged components */
  getComponentRef: <T = any,>() => componentRef.value as T,
  /** Update Api Parameters */
  updateParam(newParams: Record<string, any>) {
    innerParams.value = newParams;
  },
});
</script>
<template>
  <component
    :is="component"
    v-bind="bindProps"
    :placeholder="$attrs.placeholder"
    ref="componentRef"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template v-if="loadingSlot && loading" #[loadingSlot]>
      <LoaderCircle class="animate-spin" />
    </template>
  </component>
</template>