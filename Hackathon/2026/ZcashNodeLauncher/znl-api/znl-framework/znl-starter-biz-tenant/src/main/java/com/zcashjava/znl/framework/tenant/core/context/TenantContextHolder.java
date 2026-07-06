package com.zcashjava.znl.framework.tenant.core.context;

import com.alibaba.ttl.TransmittableThreadLocal;
import com.zcashjava.znl.framework.common.enums.DocumentEnum;


public class TenantContextHolder {

    
    private static final ThreadLocal<Long> TENANT_ID = new TransmittableThreadLocal<>();

    
    private static final ThreadLocal<Boolean> IGNORE = new TransmittableThreadLocal<>();

    
    public static Long getTenantId() {
        return TENANT_ID.get();
    }

    
    public static Long getRequiredTenantId() {
        Long tenantId = getTenantId();
        if (tenantId == null) {
            throw new NullPointerException("TenantContextHolder does not have a tenant number!"
                + DocumentEnum.TENANT.getUrl());
        }
        return tenantId;
    }

    public static void setTenantId(Long tenantId) {
        TENANT_ID.set(tenantId);
    }

    public static void setIgnore(Boolean ignore) {
        IGNORE.set(ignore);
    }

    
    public static boolean isIgnore() {
        return Boolean.TRUE.equals(IGNORE.get());
    }

    public static void clear() {
        TENANT_ID.remove();
        IGNORE.remove();
    }

}
