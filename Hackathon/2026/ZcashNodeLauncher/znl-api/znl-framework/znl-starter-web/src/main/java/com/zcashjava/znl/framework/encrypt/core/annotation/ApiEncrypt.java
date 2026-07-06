package com.zcashjava.znl.framework.encrypt.core.annotation;

import java.lang.annotation.*;


@Documented
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiEncrypt {

    
    boolean request() default true;

    
    boolean response() default true;

}
