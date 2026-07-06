import { requestClient } from '#/api/request';

export namespace SystemMenuApi {
  /** Menu Information */
  export interface Menu {
    id: number;
    name: string;
    permission: string;
    type: number;
    sort: number;
    parentId: number;
    path: string;
    icon: string;
    component: string;
    componentName?: string;
    status: number;
    visible: boolean;
    keepAlive: boolean;
    alwaysShow?: boolean;
    createTime: Date;
  }
}

/** Query Menu (Simplified) List */
export async function getSimpleMenusList() {
  return requestClient.get<SystemMenuApi.Menu[]>('/system/menu/simple-list');
}

/** Query Menu List */
export async function getMenuList(params?: Record<string, any>) {
  return requestClient.get<SystemMenuApi.Menu[]>('/system/menu/list', {
    params,
  });
}

/** Get Menu Details */
export async function getMenu(id: number) {
  return requestClient.get<SystemMenuApi.Menu>(`/system/menu/get?id=${id}`);
}

/** New Menu */
export async function createMenu(data: SystemMenuApi.Menu) {
  return requestClient.post('/system/menu/create', data);
}

/** Modify Menu */
export async function updateMenu(data: SystemMenuApi.Menu) {
  return requestClient.put('/system/menu/update', data);
}

/** Remove Menu */
export async function deleteMenu(id: number) {
  return requestClient.delete(`/system/menu/delete?id=${id}`);
}

/** Batch Delete Menu */
export async function deleteMenuList(ids: number[]) {
  return requestClient.delete(`/system/menu/delete-list?ids=${ids.join(',')}`);
}