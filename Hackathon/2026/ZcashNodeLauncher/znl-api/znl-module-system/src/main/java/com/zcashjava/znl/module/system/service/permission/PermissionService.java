package com.zcashjava.znl.module.system.service.permission;

import java.util.Collection;
import java.util.Set;

import com.zcashjava.znl.framework.common.biz.system.permission.dto.DeptDataPermissionRespDTO;

import static java.util.Collections.singleton;


public interface PermissionService {

    
    boolean hasAnyPermissions(Long userId, String... permissions);

    
    boolean hasAnyRoles(Long userId, String... roles);

    

    
    void assignRoleMenu(Long roleId, Set<Long> menuIds);

    
    void processRoleDeleted(Long roleId);

    
    void processMenuDeleted(Long menuId);

    
    default Set<Long> getRoleMenuListByRoleId(Long roleId) {
        return getRoleMenuListByRoleId(singleton(roleId));
    }

    
    Set<Long> getRoleMenuListByRoleId(Collection<Long> roleIds);

    
    Set<Long> getMenuRoleIdListByMenuIdFromCache(Long menuId);

    

    
    void assignUserRole(Long userId, Set<Long> roleIds);

    
    void processUserDeleted(Long userId);

    
    Set<Long> getUserRoleIdListByRoleId(Collection<Long> roleIds);

    
    Set<Long> getUserRoleIdListByUserId(Long userId);

    
    Set<Long> getUserRoleIdListByUserIdFromCache(Long userId);

    

    
    void assignRoleDataScope(Long roleId, Integer dataScope, Set<Long> dataScopeDeptIds);

    
    DeptDataPermissionRespDTO getDeptDataPermission(Long userId);

}
