package com.zcashjava.znl.framework.tenant.core.aop;

import java.lang.annotation.*;

import com.zcashjava.znl.framework.tenant.config.TenantProperties;


@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface TenantIgnore {

    
    String enable() default "true";

}
