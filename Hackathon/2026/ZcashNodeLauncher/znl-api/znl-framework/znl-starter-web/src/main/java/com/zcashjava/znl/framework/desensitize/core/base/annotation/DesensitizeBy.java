package com.zcashjava.znl.framework.desensitize.core.base.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zcashjava.znl.framework.desensitize.core.base.handler.DesensitizationHandler;
import com.zcashjava.znl.framework.desensitize.core.base.serializer.StringDesensitizeSerializer;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target(ElementType.ANNOTATION_TYPE)
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside 
@JsonSerialize(using = StringDesensitizeSerializer.class) 
public @interface DesensitizeBy {

    
    @SuppressWarnings("rawtypes")
    Class<? extends DesensitizationHandler> handler();

}
