package com.zcashjava.znl.framework.desensitize.core.slider.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.zcashjava.znl.framework.desensitize.core.base.annotation.DesensitizeBy;
import com.zcashjava.znl.framework.desensitize.core.slider.handler.CarLicenseDesensitization;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@DesensitizeBy(handler = CarLicenseDesensitization.class)
public @interface CarLicenseDesensitize {

    
    int prefixKeep() default 3;

    
    int suffixKeep() default 1;

    
    String replacer() default "*";

    
    String disable() default "";

}
