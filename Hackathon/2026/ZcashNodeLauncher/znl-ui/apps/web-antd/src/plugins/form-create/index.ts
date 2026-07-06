import type { App } from 'vue';

import formCreate from '@form-create/ant-design-vue';
import install from '@form-create/ant-design-vue/auto-import';
import FcDesigner from '@form-create/antd-designer';
// The use of form-create requires the introduction of ant-design-vu components on an additional global basis
import {
  Alert,
  Badge,
  Card,
  Collapse,
  CollapsePanel,
  ConfigProvider,
  Divider,
  Dropdown,
  Image,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Menu,
  MenuDivider,
  MenuItem,
  message,
  Popconfirm,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Transfer,
} from 'ant-design-vue';

// ======================= Custom Component=======================
import { useApiSelect } from '#/components/form-create';
import DictSelect from '#/components/form-create/components/dict-select.vue';
import { useImagesUpload } from '#/components/form-create/components/use-images-upload';
import { Tinymce } from '#/components/tinymce';
import { FileUpload, ImageUpload } from '#/components/upload';

const UserSelect = useApiSelect({
  name: 'UserSelect',
  labelField: 'nickname',
  valueField: 'id',
  url: '/system/user/simple-list',
});
const DeptSelect = useApiSelect({
  name: 'DeptSelect',
  labelField: 'name',
  valueField: 'id',
  url: '/system/dept/simple-list',
});
const ApiSelect = useApiSelect({
  name: 'ApiSelect',
});
const ImagesUpload = useImagesUpload();

const components = [
  Alert,
  Badge,
  Card,
  Collapse,
  CollapsePanel,
  ConfigProvider,
  Divider,
  Dropdown,
  Image,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Menu,
  MenuDivider,
  MenuItem,
  Popconfirm,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Transfer,
  UserSelect,
  DeptSelect,
  ApiSelect,
  ImagesUpload,
  DictSelect,
  Tinymce,
  ImageUpload,
  FileUpload,
];

// https://www.form-crime.com/v3/ant-design-vue/auto-import
export function setupFormCreate(app: App) {
  components.forEach((component) => {
    app.component(component.name as string, component);
  });
  // TODO @xingyu: Why are you here?
  app.component('AMessage', message);
  formCreate.use(install);
  app.use(formCreate);
  app.use(FcDesigner);
}