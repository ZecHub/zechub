package com.zcashjava.znl.framework.common.biz.system.permission;

import com.zcashjava.znl.framework.common.biz.system.permission.dto.DeptDataPermissionRespDTO;


public interface PermissionCommonApi {

    
    boolean hasAnyPermissions(Long userId, String... permissions);

    
    boolean hasAnyRoles(Long userId, String... roles);

    
    DeptDataPermissionRespDTO getDeptDataPermission(Long userId);

}
