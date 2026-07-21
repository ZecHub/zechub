package com.zcashjava.znl.framework.desensitize.core.slider.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.zcashjava.znl.framework.desensitize.core.base.annotation.DesensitizeBy;
import com.zcashjava.znl.framework.desensitize.core.slider.handler.BankCardDesensitization;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@DesensitizeBy(handler = BankCardDesensitization.class)
public @interface BankCardDesensitize {

    
    int prefixKeep() default 6;

    
    int suffixKeep() default 2;

    
    String replacer() default "*";

    
    String disable() default "";

}
