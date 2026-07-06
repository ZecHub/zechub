import { requestClient } from '#/api/request';

export namespace SystemDeptApi {
  /** Sectoral information */
  export interface Dept {
    id?: number;
    name: string;
    parentId?: number;
    status: number;
    sort: number;
    leaderUserId: number;
    phone: string;
    email: string;
    createTime: Date;
    children?: Dept[];
  }
}

/** List of Query Departments (Simplification) */
export async function getSimpleDeptList() {
  return requestClient.get<SystemDeptApi.Dept[]>('/system/dept/simple-list');
}

/** Query Sector List */
export async function getDeptList() {
  return requestClient.get('/system/dept/list');
}

/** Query department details */
export async function getDept(id: number) {
  return requestClient.get<SystemDeptApi.Dept>(`/system/dept/get?id=${id}`);
}

/** Add a new department */
export async function createDept(data: SystemDeptApi.Dept) {
  return requestClient.post('/system/dept/create', data);
}

/** Modify Sectors */
export async function updateDept(data: SystemDeptApi.Dept) {
  return requestClient.put('/system/dept/update', data);
}

/** Delete Department */
export async function deleteDept(id: number) {
  return requestClient.delete(`/system/dept/delete?id=${id}`);
}

/** Bulk Remove Sectors */
export async function deleteDeptList(ids: number[]) {
  return requestClient.delete(`/system/dept/delete-list?ids=${ids.join(',')}`);
}