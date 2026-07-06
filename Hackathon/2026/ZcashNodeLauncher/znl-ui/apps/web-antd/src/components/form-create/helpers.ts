import type { Ref } from 'vue';

import type { Menu } from '#/components/form-create/typing';

import { isRef, nextTick, onMounted } from 'vue';

import formCreate from '@form-create/ant-design-vue';

import { apiSelectRule } from '#/components/form-create/rules/data';

import {
  useDictSelectRule,
  useEditorRule,
  useSelectRule,
  useUploadFileRule,
  useUploadImageRule,
  useUploadImagesRule,
} from './rules';

// Encode Form Conf
export function encodeConf(designerRef: any) {
  return JSON.stringify(designerRef.value.getOption());
}

// Encoding Forms Fields
export function encodeFields(designerRef: any) {
  const rule = JSON.parse(designerRef.value.getJson());
  const fields: string[] = [];
  rule.forEach((item: unknown) => {
    fields.push(JSON.stringify(item));
  });
  return fields;
}

// Decoding Forms Fields
export function decodeFields(fields: string[]) {
  const rule: object[] = [];
  fields.forEach((item) => {
    rule.push(formCreate.parseJson(item));
  });
  return rule;
}

// Set Table Conf and Fields for FcDesigner scenes
export function setConfAndFields(
  designerRef: any,
  conf: string,
  fields: string | string[],
) {
  designerRef.value.setOption(formCreate.parseJson(conf));
  // Handle the fileds parameter type, ensuring that decodeFilds is passed on to the string[] type
  const fieldsArray = Array.isArray(fields) ? fields : [fields];
  designerRef.value.setRule(decodeFields(fieldsArray));
}

// Set form Conf and Fields, fit form-create scenes
export function setConfAndFields2(
  detailPreview: any,
  conf: string,
  fields: string[],
  value?: any,
) {
  if (isRef(detailPreview)) {
    detailPreview = detailPreview.value;
  }
  detailPreview.option = formCreate.parseJson(conf);
  detailPreview.rule = decodeFields(fields);
  if (value) {
    detailPreview.value = value;
  }
}

export function makeRequiredRule() {
  return {
    type: 'Required',
    field: 'formCreate$required',
    title: 'Whether to fill in',
  };
}

export function localeProps(
  t: (msg: string) => any,
  prefix: string,
  rules: any[],
) {
  return rules.map((rule: { field: string; title: any }) => {
    if (rule.field === 'formCreate$required') {
      rule.title = t('props.required') || rule.title;
    } else if (rule.field && rule.field !== '_optionType') {
      rule.title = t(`components.${prefix}.${rule.field}`) || rule.title;
    }
    return rule;
  });
}

/**
 * parsing the field of form components (reversely, if the component contains sub-components)* *The generation rules of the @param rule component https://www.form-create.com/v3/guide/ rile* @paramfields parsing the form component field * @paraam parentTitle, if sub-form, sub-form title, default is empty
 */
export function parseFormFields(
  rule: Record<string, any>,
  fields: Array<Record<string, any>> = [],
  parentTitle: string = '',
) {
  const { type, field, $required, title: tempTitle, children } = rule;
  if (field && tempTitle) {
    let title = tempTitle;
    if (parentTitle) {
      title = `${parentTitle}.${tempTitle}`;
    }
    let required = false;
    if ($required) {
      required = true;
    }
    fields.push({
      field,
      title,
      type,
      required,
    });
    // TODO sub-forms need to process sub-table fields
    // if (type === 'group' && rule.props?.rule && Array.isArray(rule.props.rule)) {
    //   / / parsing sub-table fields
    //   rule.props.rule.forEach((item) => {
    //     parseFields(item, fieldsPermission, title)
    //   })
    // }
  }
  if (children && Array.isArray(children)) {
    children.forEach((rule) => {
      parseFormFields(rule, fields);
    });
  }
}

/**
 * Form Designer Enhancement Hook * Add - File Upload * - Sheet Upload * - Multichart Upload * - Dictionary Selector * - User Selector * - Sector Selector * - Rich Text
 */
export async function useFormCreateDesigner(designer: Ref) {
  const editorRule = useEditorRule();
  const uploadFileRule = useUploadFileRule();
  const uploadImageRule = useUploadImageRule();
  const uploadImagesRule = useUploadImagesRule();

  /**
   * Build Form Component
   */
  function buildFormComponents() {
    // Remove own upload component rules, replace with uploadFileRile, uploadImgRile, uploadImgsRile
    designer.value?.removeMenuItem('upload');
    // Remove your own rich text component rules, replace with editorrule
    designer.value?.removeMenuItem('fc-editor');
    const components = [
      editorRule,
      uploadFileRule,
      uploadImageRule,
      uploadImagesRule,
    ];
    components.forEach((component) => {
      // Insert component rules
      designer.value?.addComponent(component);
      // Insert Drag button to category `main '
      designer.value?.appendMenuItem('main', {
        icon: component.icon,
        name: component.name,
        label: component.label,
      });
    });
  }

  const userSelectRule = useSelectRule({
    name: 'UserSelect',
    label: 'User Selector',
    icon: 'icon-eye',
  });
  const deptSelectRule = useSelectRule({
    name: 'DeptSelect',
    label: 'Sector Selector',
    icon: 'icon-tree',
  });
  const dictSelectRule = useDictSelectRule();
  const apiSelectRule0 = useSelectRule({
    name: 'ApiSelect',
    label: 'Interface Chooser',
    icon: 'icon-json',
    props: [...apiSelectRule],
    event: ['click', 'change', 'visibleChange', 'clear', 'blur', 'focus'],
  });

  /**
   * Build System Field Menu
   */
  function buildSystemMenu() {
    // Remove your own drop-down selection component and replace it with currenceSelectRile
    // designer.value?.removeMenuItem('select')
    // designer.value?.removeMenuItem('radio')
    // designer.value?.removeMenuItem('checkbox')
    const components = [
      userSelectRule,
      deptSelectRule,
      dictSelectRule,
      apiSelectRule0,
    ];
    const menu: Menu = {
      name: 'system',
      title: 'System Fields',
      list: components.map((component) => {
        // Insert component rules
        designer.value?.addComponent(component);
        // Insert drag-and-drop button to category `system '
        return {
          icon: component.icon,
          name: component.name,
          label: component.label,
        };
      }),
    };
    designer.value?.addMenu(menu);
  }

  onMounted(async () => {
    await nextTick();
    buildFormComponents();
    buildSystemMenu();
  });
}