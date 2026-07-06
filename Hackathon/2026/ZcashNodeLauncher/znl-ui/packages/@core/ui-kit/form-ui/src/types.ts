import type { FieldOptions, FormContext, GenericObject } from 'vee-validate';
import type { ZodTypeAny } from 'zod';

import type { Component, HtmlHTMLAttributes, Ref } from 'vue';

import type { VbenButtonProps } from '@vben-core/shadcn-ui';
import type { ClassType, MaybeComputedRef } from '@vben-core/typings';

import type { FormApi } from './form-api';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export type BaseFormComponentType =
  | 'DefaultButton'
  | 'PrimaryButton'
  | 'VbenCheckbox'
  | 'VbenInput'
  | 'VbenInputPassword'
  | 'VbenPinInput'
  | 'VbenSelect'
  | (Record<never, never> & string);

type Breakpoints = '2xl:' | '3xl:' | '' | 'lg:' | 'md:' | 'sm:' | 'xl:';

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type WrapperClassType =
  | `${Breakpoints}grid-cols-${GridCols}`
  | (Record<never, never> & string);

export type FormItemClassType =
  | `${Breakpoints}cols-end-${'auto' | GridCols}`
  | `${Breakpoints}cols-span-${'auto' | 'full' | GridCols}`
  | `${Breakpoints}cols-start-${'auto' | GridCols}`
  | (Record<never, never> & string)
  | WrapperClassType;

export type FormFieldOptions = Partial<
  FieldOptions & {
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validateOnInput?: boolean;
    validateOnModelUpdate?: boolean;
  }
>;

export interface FormShape {
  /** Default value */
  default?: any;
  /** Field Name */
  fieldName: string;
  /** Whether to fill in */
  required?: boolean;
  rules?: ZodTypeAny;
}

export type MaybeComponentPropKey =
  | 'options'
  | 'placeholder'
  | 'title'
  | keyof HtmlHTMLAttributes
  | (Record<never, never> & string);

export type MaybeComponentProps = { [K in MaybeComponentPropKey]?: any };

export type FormActions = FormContext<GenericObject>;

export type CustomRenderType = (() => Component | string) | string;

export type FormSchemaRuleType =
  | 'mobile'
  | 'mobileRequired'
  | 'required'
  | 'selectRequired'
  | null
  | (Record<never, never> & string)
  | ZodTypeAny;

type FormItemDependenciesCondition<T = boolean | PromiseLike<boolean>> = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => T;

type FormItemDependenciesConditionWithRules = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => FormSchemaRuleType | PromiseLike<FormSchemaRuleType>;

type FormItemDependenciesConditionWithProps = (
  value: Partial<Record<string, any>>,
  actions: FormActions,
) => MaybeComponentProps | PromiseLike<MaybeComponentProps>;

export interface FormItemDependencies {
  /**
   * Component Parameters * @returns Component Parameters
   */
  componentProps?: FormItemDependenciesConditionWithProps;
  /**
   * Whether to disable * @returns
   */
  disabled?: boolean | FormItemDependenciesCondition;
  /**
   * Whether to render (delete dom) * @returns
   */
  if?: boolean | FormItemDependenciesCondition;
  /**
   * Whether to fill * @returns
   */
  required?: FormItemDependenciesCondition;
  /**
   * Field Rule
   */
  rules?: FormItemDependenciesConditionWithRules;
  /**
   * Whether to hide (Css) * @returns whether to hide
   */
  show?: boolean | FormItemDependenciesCondition;
  /**
   * Any trigger will be executed.
   */
  trigger?: FormItemDependenciesCondition<void>;
  /**
   * Trigger Fields
   */
  triggerFields: string[];
}

type ComponentProps =
  | ((
      value: Partial<Record<string, any>>,
      actions: FormActions,
    ) => MaybeComponentProps)
  | MaybeComponentProps;

export interface FormCommonConfig {
  /**
   * Show a colon after Label
   */
  colon?: boolean;
  /**
   * Props for all forms
   */
  componentProps?: ComponentProps;
  /**
   * Control Style for All Form Items
   */
  controlClass?: string;
  /**
   * Disable Status of All Form Items
   */
  disabled?: boolean;
  /**
   */
  disabledOnChangeListener?: boolean;
  /**
   * Whether to disable input events for all form entries* @default True
   */
  disabledOnInputListener?: boolean;
  /**
   * The empty status of all forms is by default undefined and the empty state of naive-ui is null
   */
  emptyStateValue?: null | undefined;
  /**
   * Control Style for All Form Items * @default {}
   */
  formFieldProps?: FormFieldOptions;
  /**
   * A grid layout for all forms, supporting function form * @default ""
   */
  formItemClass?: (() => string) | string;
  /**
   * Hide all form entries
   */
  hideLabel?: boolean;
  /**
   * Whether to hide mandatory tags
   */
  hideRequiredMark?: boolean;
  /**
   * Label style for all forms * @default ""
   */
  labelClass?: string;
  /**
   * Label width for all forms
   */
  labelWidth?: number;
  /**
   * Model Properties for All Form Items* @default "modelValue"
   */
  modelPropName?: string;
  /**
   * Wrapper Style for All Form Items
   */
  wrapperClass?: string;
}

type RenderComponentContentType = (
  value: Partial<Record<string, any>>,
  api: FormActions,
) => Record<string, any>;

export type HandleSubmitFn = (
  values: Record<string, any>,
) => Promise<void> | void;

export type HandleResetFn = (
  values: Record<string, any>,
) => Promise<void> | void;

export type FieldMappingTime = [
  string,
  [string, string],
  (
    | ((value: any, fieldName: string) => any)
    | [string, string]
    | null
    | string
  )?,
][];

export type ArrayToStringFields = Array<
  | [string[], string?] // Embedded array format, optional separator
  | string // Single field with default separator
  | string[] // Simple array format, the last element can be a separator
>;

export interface FormSchema<
  T extends BaseFormComponentType = BaseFormComponentType,
> extends FormCommonConfig {
  /** Component */
  component: Component | T;
  /** Component parameters */
  componentProps?: ComponentProps;
  /** Default value */
  defaultValue?: any;
  /** Dependence */
  dependencies?: FormItemDependencies;
  /** Description */
  description?: CustomRenderType;
  /** Field Name */
  fieldName: string;
  /** Help Info */
  help?: CustomRenderType;
  /** Whether form items are hidden */
  hide?: boolean;
  /** Item 1 of the form */
  label?: CustomRenderType;
  // Custom Component Internal Rendering
  renderComponentContent?: RenderComponentContentType;
  /** Field Rule */
  rules?: FormSchemaRuleType;
  /** Suffix */
  suffix?: CustomRenderType;
}

export interface FormFieldProps extends FormSchema {
  required?: boolean;
}

export interface FormRenderProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> {
  /**
   * Table field arrays map string configuration Default use ","
   */
  arrayToStringFields?: ArrayToStringFields;
  /**
   * Whether or not to fold, effective under ShowCollapseButton=true
   */
  collapsed?: boolean;
  /**
   * Keep Lines When Collapse * @default1
   */
  collapsedRows?: number;
  /**
   * Whether to trigger resize events
   */
  collapseTriggerResize?: boolean;
  /**
   * Form item generic reserve configuration, which is used when sub-items are not configured, and sub-project configuration priority is higher than this configuration
   */
  commonConfig?: FormCommonConfig;
  /**
   * Condensed mode (remove the space reserved for verification information at the bottom of each form)
   */
  compact?: boolean;
  /**
   * Component v-model event binding
   */
  componentBindEventMap?: Partial<Record<BaseFormComponentType, string>>;
  /**
   * Component assembly
   */
  componentMap: Record<BaseFormComponentType, Component>;
  /**
   * Form field map to time format
   */
  fieldMappingTime?: FieldMappingTime;
  /**
   * Examples of forms
   */
  form?: FormContext<GenericObject>;
  /**
   * Table individual item layout
   */
  layout?: FormLayout;
  /**
   * Form Definitions
   */
  schema?: FormSchema<T>[];

  /**
   * Whether to show expansion/collapse
   */
  showCollapseButton?: boolean;
  /**
   * Format date
   */

  /**
   * Form grid grid layout* @default "grid-cols-1"
   */
  wrapperClass?: WrapperClassType;
}

export interface ActionButtonOptions extends VbenButtonProps {
  [key: string]: any;
  content?: MaybeComputedRef<string>;
  show?: boolean;
}

export interface VbenFormProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> extends Omit<
    FormRenderProps<T>,
    'componentBindEventMap' | 'componentMap' | 'form'
  > {
  /**
   * Operation Button Inverted (Submitting Button Prefix)
   */
  actionButtonsReverse?: boolean;
  /**
   * The style of the operating button group* newLine: display in new rows. RowEnd: display in rows, right alignment (default). Inline: use the grid default style
   */
  actionLayout?: 'inline' | 'newLine' | 'rowEnd';
  /**
   * Operation button group display position, default right display
   */
  actionPosition?: 'center' | 'left' | 'right';
  /**
   * Form Operations Area
   */
  actionWrapperClass?: ClassType;
  /**
   * Table field arrays map string configuration Default use ","
   */
  arrayToStringFields?: ArrayToStringFields;

  /**
   * Form Field Map
   */
  fieldMappingTime?: FieldMappingTime;
  /**
   * Reset Form Resume
   */
  handleReset?: HandleResetFn;
  /**
   * Form submission return
   */
  handleSubmit?: HandleSubmitFn;
  /**
   * Change in form value echoes
   */
  handleValuesChange?: (
    values: Record<string, any>,
    fieldsChanged: string[],
  ) => void;
  /**
   * Reset button parameters
   */
  resetButtonOptions?: ActionButtonOptions;

  /**
   * Whether to scroll automatically to the first error field on validation failed
   */
  scrollToFirstError?: boolean;

  /**
   * Whether to show the default operation button * @default true
   */
  showDefaultActions?: boolean;

  /**
   * Submit button parameters
   */
  submitButtonOptions?: ActionButtonOptions;

  /**
   * Whether form should be submitted when field values change * @default file
   */
  submitOnChange?: boolean;

  /**
   * Whether or not to submit a form when returning to the car*
   */
  submitOnEnter?: boolean;
}

export type ExtendedFormApi = FormApi & {
  useStore: <T = NoInfer<VbenFormProps>>(
    selector?: (state: NoInfer<VbenFormProps>) => T,
  ) => Readonly<Ref<T>>;
};

export interface VbenFormAdapterOptions<
  T extends BaseFormComponentType = BaseFormComponentType,
> {
  config?: {
    baseModelPropName?: string;
    disabledOnChangeListener?: boolean;
    disabledOnInputListener?: boolean;
    emptyStateValue?: null | undefined;
    modelPropNameMap?: Partial<Record<T, string>>;
  };
  defineRules?: {
    mobile?: (
      value: any,
      params: any,
      ctx: Record<string, any>,
    ) => boolean | string;
    mobileRequired?: (
      value: any,
      params: any,
      ctx: Record<string, any>,
    ) => boolean | string;
    required?: (
      value: any,
      params: any,
      ctx: Record<string, any>,
    ) => boolean | string;
    selectRequired?: (
      value: any,
      params: any,
      ctx: Record<string, any>,
    ) => boolean | string;
  };
}
