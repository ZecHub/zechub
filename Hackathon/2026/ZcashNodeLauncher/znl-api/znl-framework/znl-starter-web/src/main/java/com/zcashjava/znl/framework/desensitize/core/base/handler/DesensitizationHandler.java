package com.zcashjava.znl.framework.desensitize.core.base.handler;

import cn.hutool.core.util.ReflectUtil;

import java.lang.annotation.Annotation;


public interface DesensitizationHandler<T extends Annotation> {

    
    String desensitize(String origin, T annotation);

    
    default String getDisable(T annotation) {
        
        try {
            return (String) ReflectUtil.invoke(annotation, "disable");
        } catch (Exception ex) {
            return "";
        }
    }

}
