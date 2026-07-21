package com.zcashjava.znl.framework.desensitize.core.slider.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.zcashjava.znl.framework.desensitize.core.base.annotation.DesensitizeBy;
import com.zcashjava.znl.framework.desensitize.core.slider.handler.ChineseNameDesensitization;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@DesensitizeBy(handler = ChineseNameDesensitization.class)
public @interface ChineseNameDesensitize {

    
    int prefixKeep() default 1;

    
    int suffixKeep() default 0;

    
    String replacer() default "*";

    
    String disable() default "";

}
