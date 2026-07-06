package com.zcashjava.znl.module.system.api.permission;

import org.springframework.stereotype.Service;

import com.zcashjava.znl.module.system.service.permission.RoleService;

import javax.annotation.Resource;
import java.util.Collection;


@Service
public class RoleApiImpl implements RoleApi {

    @Resource
    private RoleService roleService;

    @Override
    public void validRoleList(Collection<Long> ids) {
        roleService.validateRoleList(ids);
    }
}
