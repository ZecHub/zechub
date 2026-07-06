package com.zcashjava.znl.framework.tenant.core.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

import com.zcashjava.znl.framework.common.util.spring.SpringExpressionUtils;
import com.zcashjava.znl.framework.tenant.core.context.TenantContextHolder;
import com.zcashjava.znl.framework.tenant.core.util.TenantUtils;


@Aspect
@Slf4j
public class TenantIgnoreAspect {

    @Around("@annotation(tenantIgnore)")
    public Object around(ProceedingJoinPoint joinPoint, TenantIgnore tenantIgnore) throws Throwable {
        Boolean oldIgnore = TenantContextHolder.isIgnore();
        try {
            
            Object enable = SpringExpressionUtils.parseExpression(tenantIgnore.enable());
            if (Boolean.TRUE.equals(enable)) {
                TenantContextHolder.setIgnore(true);
            }

            
            return joinPoint.proceed();
        } finally {
            TenantContextHolder.setIgnore(oldIgnore);
        }
    }

}
