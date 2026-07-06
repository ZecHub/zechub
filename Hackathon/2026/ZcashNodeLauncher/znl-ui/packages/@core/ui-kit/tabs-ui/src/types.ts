import type { IContextMenuItem } from '@vben-core/shadcn-ui';
import type { TabDefinition, TabsStyleType } from '@vben-core/typings';

export type TabsEmits = {
  close: [string];
  sortTabs: [number, number];
  unpin: [TabDefinition];
};

export interface TabsProps {
  active?: string;
  /**
   * @zh_CN content class
   * @default tabs-chrome
   */
  contentClass?: string;
  /**
   * @zh_CN Right Key Menu
   */
  contextMenus?: (data: any) => IContextMenuItem[];
  /**
   * @zh_CN Can you drag
   */
  draggable?: boolean;
  /**
   * @zh_CN gap @default7 *tabs-chrome only
   */
  gap?: number;
  /**
   * @zh_CN tab Maximum width* tabs-chrome only
   */
  maxWidth?: number;
  /**
   * @zh_CN Close Tab on middle-click
   */
  middleClickToClose?: boolean;

  /**
   * @zh_CN tab minimum width* tabs-chrome only
   */
  minWidth?: number;

  /**
   * @zh_CN Whether to display icons
   */
  showIcon?: boolean;
  /**
   * @zh_CN tab style
   */
  styleType?: TabsStyleType;

  /**
   * @zh_CN tab data
   */
  tabs?: TabDefinition[];

  /**
   * @zh_CN Respond to Rolling Events
   */
  wheelable?: boolean;
}

export interface TabConfig extends TabDefinition {
  affixTab: boolean;
  closable: boolean;
  icon: string;
  key: string;
  title: string;
}