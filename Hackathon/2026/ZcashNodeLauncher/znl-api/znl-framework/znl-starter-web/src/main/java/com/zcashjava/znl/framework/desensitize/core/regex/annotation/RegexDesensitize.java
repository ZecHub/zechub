package com.zcashjava.znl.framework.desensitize.core.regex.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.zcashjava.znl.framework.desensitize.core.base.annotation.DesensitizeBy;
import com.zcashjava.znl.framework.desensitize.core.regex.handler.DefaultRegexDesensitizationHandler;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target({ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@DesensitizeBy(handler = DefaultRegexDesensitizationHandler.class)
public @interface RegexDesensitize {

    
    String regex() default "^[\\s\\S]*$";

    
    String replacer() default "******";

    
    String disable() default "";

}
