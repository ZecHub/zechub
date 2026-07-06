package com.zcashjava.znl.framework.desensitize.core.regex.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.zcashjava.znl.framework.desensitize.core.base.annotation.DesensitizeBy;
import com.zcashjava.znl.framework.desensitize.core.regex.handler.EmailDesensitizationHandler;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@DesensitizeBy(handler = EmailDesensitizationHandler.class)
public @interface EmailDesensitize {

    
    String regex() default "(^.)[^@]*(@.*$)";

    
    String replacer() default "$1****$2";

    
    String disable() default "";

}
