package com.zcashjava.znl.module.system.enums.permission;

import com.zcashjava.znl.framework.common.util.object.ObjectUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum RoleCodeEnum {

    SUPER_ADMIN("super_admin", "Super admin."),
    TENANT_ADMIN("tenant_admin", "Tenant Administrator"),
    CRM_ADMIN("crm_admin", "CRM Administrator"); 
    ;

    
    private final String code;
    
    private final String name;

    public static boolean isSuperAdmin(String code) {
        return ObjectUtils.equalsAny(code, SUPER_ADMIN.getCode());
    }

}
