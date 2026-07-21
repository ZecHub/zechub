import { requestClient } from '#/api/request';

export namespace SystemAreaApi {
  /** Regional information */
  export interface Area {
    id?: number;
    name: string;
    code: string;
    parentId?: number;
    sort?: number;
    status?: number;
    createTime?: Date;
  }
}

/** Access to area trees */
export function getAreaTree() {
  return requestClient.get<SystemAreaApi.Area[]>('/system/area/tree');
}

/** Get IP corresponding area name */
export function getAreaByIp(ip: string) {
  return requestClient.get<string>(`/system/area/get-by-ip?ip=${ip}`);
}