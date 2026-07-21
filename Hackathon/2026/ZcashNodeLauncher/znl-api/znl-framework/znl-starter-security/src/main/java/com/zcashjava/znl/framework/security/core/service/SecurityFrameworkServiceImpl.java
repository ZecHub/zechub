package com.zcashjava.znl.framework.security.core.service;

import cn.hutool.core.collection.CollUtil;
import lombok.AllArgsConstructor;

import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.getLoginUserId;
import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.skipPermissionCheck;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.biz.system.permission.PermissionCommonApi;
import com.zcashjava.znl.framework.security.core.LoginUser;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;


@AllArgsConstructor
public class SecurityFrameworkServiceImpl implements SecurityFrameworkService {

    private final PermissionCommonApi permissionApi;

    @Override
    public boolean hasPermission(String permission) {
        return hasAnyPermissions(permission);
    }

    @Override
    public boolean hasAnyPermissions(String... permissions) {
        
        if (skipPermissionCheck()) {
            return true;
        }

        
        Long userId = getLoginUserId();
        if (userId == null) {
            return false;
        }
        return permissionApi.hasAnyPermissions(userId, permissions);
    }

    @Override
    public boolean hasRole(String role) {
        return hasAnyRoles(role);
    }

    @Override
    public boolean hasAnyRoles(String... roles) {
        
        if (skipPermissionCheck()) {
            return true;
        }

        
        Long userId = getLoginUserId();
        if (userId == null) {
            return false;
        }
        return permissionApi.hasAnyRoles(userId, roles);
    }

    @Override
    public boolean hasScope(String scope) {
        return hasAnyScopes(scope);
    }

    @Override
    public boolean hasAnyScopes(String... scope) {
        
        if (skipPermissionCheck()) {
            return true;
        }

        
        LoginUser user = SecurityFrameworkUtils.getLoginUser();
        if (user == null) {
            return false;
        }
        return CollUtil.containsAny(user.getScopes(), Arrays.asList(scope));
    }

}
