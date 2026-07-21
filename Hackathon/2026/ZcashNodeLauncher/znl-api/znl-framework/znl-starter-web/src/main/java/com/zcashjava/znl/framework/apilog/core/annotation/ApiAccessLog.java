package com.zcashjava.znl.framework.apilog.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum;


@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiAccessLog {

    

    
    boolean enable() default true;
    
    boolean requestEnable() default true;
    
    boolean responseEnable() default false;
    
    String[] sanitizeKeys() default {};

    

    
    String operateModule() default "";
    
    String operateName() default "";
    
    OperateTypeEnum[] operateType() default {};

}
