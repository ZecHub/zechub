<script lang="ts" setup>
import type { IPropTypes } from '@tinymce/tinymce-vue/lib/cjs/main/ts/components/EditorPropTypes';
import type { Editor as EditorType } from 'tinymce/tinymce';

import {
  computed,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  unref,
  useAttrs,
  watch,
} from 'vue';

import { preferences, usePreferences } from '@vben/preferences';
import { buildShortUUID, isNumber } from '@vben/utils';

import Editor from '@tinymce/tinymce-vue';

import { useUpload } from '#/components/upload/use-upload';

import { bindHandlers } from './helper';
import ImgUpload from './img-upload.vue';
import {
  plugins as defaultPlugins,
  toolbar as defaultToolbar,
} from './tinymce';

type InitOptions = IPropTypes['init'];

defineOptions({ name: 'Tinymce', inheritAttrs: false });

const props = withDefaults(defineProps<TinymacProps>(), {
  height: 400,
  width: 'auto',
  options: () => ({}),
  plugins: defaultPlugins,
  toolbar: defaultToolbar,
  showImageUpload: true,
});

const emit = defineEmits(['change']);

interface TinymacProps {
  options?: Partial<InitOptions>;
  toolbar?: string;
  plugins?: string;
  height?: number | string;
  width?: number | string;
  showImageUpload?: boolean;
}

/** External use of v-model binding values */
const modelValue = defineModel('modelValue', { default: '', type: String });

/** TinyMCE self-hosted: https://www.jianshu.com/p/59a9c382443 */
const tinymceScriptSrc = `${import.meta.env.VITE_BASE}tinymce/tinymce.min.js`;

const attrs = useAttrs();
const editorRef = ref<EditorType>();
const fullscreen = ref(false); // Image Uploading, Whether to Place on Full Screen
const tinymceId = ref<string>(buildShortUUID('tiny-vue'));
const elRef = ref<HTMLElement | null>(null);

const containerWidth = computed(() => {
  const width = props.width;
  if (isNumber(width)) {
    return `${width}px`;
  }
  return width;
});

/** Theme Skin */
const { isDark } = usePreferences();
const skinName = computed(() => {
  return isDark.value ? 'oxide-dark' : 'oxide';
});

const contentCss = computed(() => {
  return isDark.value ? 'dark' : 'default';
});

/** Internationalization: need to put a language bag in a langs directory */
const { locale } = usePreferences();
const langName = computed(() => {
  if (locale.value === 'en-US') {
    return 'en';
  }
  return 'zh_CN';
});

/** Listen to mode, locale for theme, language switch */
const init = ref(true);
watch(
  () => [preferences.theme.mode, preferences.app.locale],
  async () => {
    if (!editorRef.value) {
      return;
    }
    // Mount/ unmount components by init+v-if
    destroy();
    init.value = false;
    await nextTick();
    init.value = true;
    // Waiting for loading complete
    await nextTick();
    setEditorMode();
  },
);

const initOptions = computed((): InitOptions => {
  const { height, options, plugins, toolbar } = props;
  return {
    height,
    toolbar,
    menubar: 'file edit view insert format tools table help',
    plugins,
    language: langName.value,
    branding: false, // Disable display of "Building with TinyMCE" at the lower right corner
    default_link_target: '_blank',
    link_title: false,
    object_resizing: true, // Unlike vben 2.0, the default is false
    auto_focus: undefined, // Unlike vben 2.0, the default is true
    skin: skinName.value,
    content_css: contentCss.value,
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    contextmenu: 'link image table',
    image_advtab: true, // Advanced Options for Pictures
    image_caption: true,
    importcss_append: true,
    noneditable_class: 'mceNonEditable',
    paste_data_images: true, // Allows pasting of pictures, default base64 format, upload when the images_upload_handler is enabled
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    toolbar_mode: 'sliding',
    ...options,
    images_upload_handler: (blobInfo: any) => {
      return new Promise((resolve, reject) => {
        const file = blobInfo.blob() as File;
        const { httpRequest } = useUpload();
        httpRequest(file)
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            console.error('Error', error);
            reject(error.message);
          });
      });
    },
    setup: (editor: EditorType) => {
      editorRef.value = editor;
      editor.on('init', (e: any) => initSetup(e));
    },
  };
});

/** Listening options.readonly read-only */
const disabled = computed(() => props.options.readonly ?? false);
watch(
  () => props.options,
  (options) => {
    const getDisabled = options && Reflect.get(options, 'readonly');
    const editor = unref(editorRef);
    if (editor) {
      editor.mode.set(getDisabled ? 'readonly' : 'design');
    }
  },
);

onMounted(() => {
  if (!initOptions.value.inline) {
    tinymceId.value = buildShortUUID('tiny-vue');
  }
  nextTick(() => {
    setTimeout(() => {
      initEditor();
      setEditorMode();
    }, 30);
  });
});

onBeforeUnmount(() => {
  destroy();
});

onDeactivated(() => {
  destroy();
});

onActivated(() => {
  setEditorMode();
});

function setEditorMode() {
  const editor = unref(editorRef);
  if (editor) {
    const mode = props.options.readonly ? 'readonly' : 'design';
    editor.mode.set(mode);
  }
}

function destroy() {
  const editor = unref(editorRef);
  editor?.destroy();
}

function initEditor() {
  const el = unref(elRef);
  if (el) {
    el.style.visibility = '';
  }
}

function initSetup(e: any) {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  const value = modelValue.value || '';

  editor.setContent(value);
  bindModelHandlers(editor);
  bindHandlers(e, attrs, unref(editorRef));
}

function setValue(editor: Record<string, any>, val?: string, prevVal?: string) {
  if (
    editor &&
    typeof val === 'string' &&
    val !== prevVal &&
    val !== editor.getContent({ format: attrs.outputFormat })
  ) {
    editor.setContent(val);
  }
}

function bindModelHandlers(editor: any) {
  const modelEvents = attrs.modelEvents ?? null;
  const normalizedEvents = Array.isArray(modelEvents)
    ? modelEvents.join(' ')
    : modelEvents;

  watch(
    () => modelValue.value,
    (val, prevVal) => {
      setValue(editor, val, prevVal);
    },
  );

  editor.on(normalizedEvents || 'change keyup undo redo', () => {
    const content = editor.getContent({ format: attrs.outputFormat });
    emit('change', content);
  });

  editor.on('FullscreenStateChanged', (e: any) => {
    fullscreen.value = e.state;
  });
}

function getUploadingImgName(name: string) {
  return `[uploading:${name}]`;
}

function handleImageUploading(name: string) {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  editor.execCommand('mceInsertContent', false, getUploadingImgName(name));
  const content = editor?.getContent() ?? '';
  setValue(editor, content);
}

function handleDone(name: string, url: string) {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  const content = editor?.getContent() ?? '';
  const val =
    content?.replace(getUploadingImgName(name), `<img src="${url}"/>`) ?? '';
  setValue(editor, val);
}

function handleError(name: string) {
  const editor = unref(editorRef);
  if (!editor) {
    return;
  }
  const content = editor?.getContent() ?? '';
  const val = content?.replace(getUploadingImgName(name), '') ?? '';
  setValue(editor, val);
}
</script>

<template>
  <div :style="{ width: containerWidth }" class="app-tinymce">
    <ImgUpload
      v-if="showImageUpload"
      v-show="editorRef"
      :disabled="disabled"
      :fullscreen="fullscreen"
      @done="handleDone"
      @error="handleError"
      @uploading="handleImageUploading"
    />
    <Editor
      v-if="!initOptions.inline && init"
      v-model="modelValue"
      :init="initOptions"
      :style="{ visibility: 'hidden', zIndex: 3000 }"
      :tinymce-script-src="tinymceScriptSrc"
      license-key="gpl"
    />
    <slot v-else></slot>
  </div>
</template>
<style lang="scss">
.tox.tox-silver-sink.tox-tinymce-aux {
  z-index: 2025; /* As zIndex for vben motor/drawer is 2000, it is necessary to adjust z-index (default 1300) to exceed it and avoid covering. */
}
</style>

<style lang="scss" scoped>
.app-tinymce {
  position: relative;
  line-height: normal;

  :deep(.textarea) {
    z-index: -1;
    visibility: hidden;
  }
}

/* Hide top right cornertinymce upgrade button */
:deep(.tox-promotion) {
  display: none !important;
}
</style>
