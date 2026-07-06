package com.zcashjava.znl.framework.datapermission.core.annotation;

import java.lang.annotation.*;

import com.zcashjava.znl.framework.datapermission.core.rule.DataPermissionRule;


@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataPermission {

    
    boolean enable() default true;

    
    Class<? extends DataPermissionRule>[] includeRules() default {};

    
    Class<? extends DataPermissionRule>[] excludeRules() default {};

}
