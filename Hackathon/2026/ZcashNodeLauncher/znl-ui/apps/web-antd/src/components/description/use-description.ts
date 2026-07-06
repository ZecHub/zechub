import type { Component } from 'vue';

import type { DescInstance, DescriptionProps } from './typing';

import { h, reactive } from 'vue';

import Description from './description.vue';

export function useDescription(options?: Partial<DescriptionProps>) {
  const propsState = reactive<Partial<DescriptionProps>>(options || {});

  const api: DescInstance = {
    setDescProps: (descProps: Partial<DescriptionProps>): void => {
      Object.assign(propsState, descProps);
    },
  };

  // Create a packaging component to merge propsState into props
  const DescriptionWrapper: Component = {
    name: 'UseDescription',
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      return () => {
        // @ts-ignore - avoids the type of example being overdrawn
        return h(Description, { ...propsState, ...attrs }, slots);
      };
    },
  };

  return [DescriptionWrapper, api] as const;
}