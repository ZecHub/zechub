package com.zcashjava.znl.module.system.api.permission;

import java.util.Collection;
import java.util.Set;

import com.zcashjava.znl.framework.common.biz.system.permission.PermissionCommonApi;


public interface PermissionApi extends PermissionCommonApi {

    
    Set<Long> getUserRoleIdListByRoleIds(Collection<Long> roleIds);

}
