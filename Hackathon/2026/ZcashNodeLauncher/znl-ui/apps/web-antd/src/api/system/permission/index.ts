import { requestClient } from '#/api/request';

export namespace SystemPermissionApi {
  /** Assign user role requests */
  export interface AssignUserRoleReqVO {
    userId: number;
    roleIds: number[];
  }

  /**  */
  export interface AssignRoleMenuReqVO {
    roleId: number;
    menuIds: number[];
  }

  /** Distribution of role data permission requests */
  export interface AssignRoleDataScopeReqVO {
    roleId: number;
    dataScope: number;
    dataScopeDeptIds: number[];
  }
}

/** */
export async function getRoleMenuList(roleId: number) {
  return requestClient.get(
    `/system/permission/list-role-menus?roleId=${roleId}`,
  );
}

/** Give role menu privileges */
export async function assignRoleMenu(
  data: SystemPermissionApi.AssignRoleMenuReqVO,
) {
  return requestClient.post('/system/permission/assign-role-menu', data);
}

/** Give role data privileges */
export async function assignRoleDataScope(
  data: SystemPermissionApi.AssignRoleDataScopeReqVO,
) {
  return requestClient.post('/system/permission/assign-role-data-scope', data);
}

/** Query user-owned role arrays */
export async function getUserRoleList(userId: number) {
  return requestClient.get(
    `/system/permission/list-user-roles?userId=${userId}`,
  );
}

/** Empowering users */
export async function assignUserRole(
  data: SystemPermissionApi.AssignUserRoleReqVO,
) {
  return requestClient.post('/system/permission/assign-user-role', data);
}
