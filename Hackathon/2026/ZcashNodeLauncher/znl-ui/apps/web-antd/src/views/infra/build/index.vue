<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { isString } from '@vben/utils';

import formCreate from '@form-create/ant-design-vue';
import FcDesigner from '@form-create/antd-designer';
import { useClipboard } from '@vueuse/core';
import { Button, message } from 'ant-design-vue';
import hljs from 'highlight.js';
import xml from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';

import { useFormCreateDesigner } from '#/components/form-create';

import 'highlight.js/styles/github.css';

defineOptions({ name: 'InfraBuild' });

const [Modal, modalApi] = useVbenModal();

const designer = ref(); // Form Designer

// Form Designer Configuration
const designerConfig = ref({
  switchType: [], // Whether component types can be changed, or fields that can be changed from one another
  autoActive: true, //
  useTemplate: false, // Whether to generate a template component for the Vue syntax
  formOptions: {
    form: {
      labelWidth: '100px', // Set the default label width to 100px
    },
  }, // Define Form Configuration Defaults
  fieldReadonly: false, // Configure whether Field can edit
  hiddenDragMenu: false, // Hide Drag Operations Buttons
  hiddenDragBtn: false, // Hide drag buttons
  hiddenMenu: [], // Hide Part Menu
  hiddenItem: [], // Hide some components
  hiddenItemConfig: {}, // Hide some component configurations
  disabledItemConfig: {}, // Disable some configurations of components
  showSaveBtn: false, // Whether to show saving buttons
  showConfig: true, // Whether to show the right configuration interface
  showBaseForm: true, // Whether to show basic configuration forms for components
  showControl: true, // Whether components should be shown in connection
  showPropsForm: true, // Whether to show the component's attribute profile form
  showEventForm: true, // Whether to show the component's event configuration form
  showValidateForm: true, // Whether or not to show the component's authentication configuration form
  showFormConfig: true, // Whether form configuration should be displayed
  showInputData: true, // Whether to show the entry button
  showDevice: true, // Whether or not to show multiend fit options
  appendConfigData: [], // Defines the formData required for rendering rules
});

const dialogVisible = ref(false); // Whether or not the window is displayed
const dialogTitle = ref(''); // The title of the window.
const formType = ref(-1); // Type of form: 0 - Generate JSON; 1 - Generate options; 2 - Generate components
const formData = ref(''); // Form data
useFormCreateDesigner(designer); // Form Designer Enhancement

/** Open the window. */
function openModel(title: string) {
  dialogVisible.value = true;
  dialogTitle.value = title;
  modalApi.open();
}

/** Generate JSON */
function showJson() {
  openModel('Generate JSON');
  formType.value = 0;
  formData.value = designer.value.getRule();
}

/** Organisation */
function showOption() {
  openModel('Organisation');
  formType.value = 1;
  formData.value = designer.value.getOption();
}

/** Generate Component */
function showTemplate() {
  openModel('Generate Component');
  formType.value = 2;
  formData.value = makeTemplate();
}

/** Generate Component */
function makeTemplate() {
  const rule = designer.value.getRule();
  const opt = designer.value.getOption();
  return `<template>
    <form-create
      v-model:api="fApi"
      :rule="rule"
      :option="option"
      @submit="onSubmit"
    ></form-create>
  </template>
  <script setup lang=ts>
    const faps = ref(null)
    const rule = ref('')
    const option = ref('')
    const init = () => {
      rule.value = formCreate.parseJson('${formCreate.toJson(rule).replaceAll('\\', '\\\\')}')
      option.value = formCreate.parseJson('${JSON.stringify(opt, null, 2)}')
    }
    const onSubmit = (formData) => {
      //Todo Submit Forms
    }
    init()
  <\/script>`;
}

/** Copy */
async function copy(text: string) {
  const textToCopy = JSON.stringify(text, null, 2);
  const { copy, copied, isSupported } = useClipboard({ source: textToCopy });
  if (isSupported) {
    await copy();
    if (unref(copied)) {
      message.success('Copy Successful');
    }
  } else {
    message.error('Copy Failed');
  }
}

/** Code Highlights */
function highlightedCode(code: string) {
  // Handle languages and codes
  let language = 'json';
  if (formType.value === 2) {
    language = 'xml';
  }
  // debugger
  if (!isString(code)) {
    code = JSON.stringify(code, null, 2);
  }
  // Highlight
  const result = hljs.highlight(code, { language, ignoreIllegals: true });
  return result.value || '&nbsp;';
}

/** Initialization */
onMounted(async () => {
  // Various languages with strong registration code
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('json', json);
});
</script>

<template>
  <Page auto-content-height>
    <FcDesigner ref="designer" height="90vh" :config="designerConfig">
      <template #handle>
        <Button size="small" type="primary" ghost @click="showJson">
          GenerateJSON
        </Button>
        <Button size="small" type="primary" ghost @click="showOption">
          GenerateOptions
        </Button>
        <Button size="small" type="primary" ghost @click="showTemplate">
          Generate Component
        </Button>
      </template>
    </FcDesigner>

    <!-- Bounce the window. -->
    <Modal :title="dialogTitle" :footer="false" :fullscreen-button="false">
      <div>
        <Button style="float: right" @click="copy(formData)"> Copy </Button>
        <div>
          <pre><code v-dompurify-html="highlightedCode(formData)" class="hljs"></code></pre>
        </div>
      </div>
    </Modal>
  </Page>
</template>
