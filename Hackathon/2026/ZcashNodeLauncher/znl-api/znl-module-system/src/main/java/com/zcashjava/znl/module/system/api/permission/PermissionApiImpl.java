package com.zcashjava.znl.module.system.api.permission;

import org.springframework.stereotype.Service;

import com.zcashjava.znl.framework.common.biz.system.permission.dto.DeptDataPermissionRespDTO;
import com.zcashjava.znl.module.system.service.permission.PermissionService;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Set;


@Service
public class PermissionApiImpl implements PermissionApi {

    @Resource
    private PermissionService permissionService;

    @Override
    public Set<Long> getUserRoleIdListByRoleIds(Collection<Long> roleIds) {
        return permissionService.getUserRoleIdListByRoleId(roleIds);
    }

    @Override
    public boolean hasAnyPermissions(Long userId, String... permissions) {
        return permissionService.hasAnyPermissions(userId, permissions);
    }

    @Override
    public boolean hasAnyRoles(Long userId, String... roles) {
        return permissionService.hasAnyRoles(userId, roles);
    }

    @Override
    public DeptDataPermissionRespDTO getDeptDataPermission(Long userId) {
        return permissionService.getDeptDataPermission(userId);
    }

}
