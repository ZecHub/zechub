package com.zcashjava.znl.framework.desensitize.core.regex.handler;

import java.lang.annotation.Annotation;

import com.zcashjava.znl.framework.common.util.spring.SpringExpressionUtils;
import com.zcashjava.znl.framework.desensitize.core.base.handler.DesensitizationHandler;


public abstract class AbstractRegexDesensitizationHandler<T extends Annotation>
        implements DesensitizationHandler<T> {

    @Override
    public String desensitize(String origin, T annotation) {
        
        Object disable = SpringExpressionUtils.parseExpression(getDisable(annotation));
        if (Boolean.TRUE.equals(disable)) {
            return origin;
        }

        
        String regex = getRegex(annotation);
        String replacer = getReplacer(annotation);
        return origin.replaceAll(regex, replacer);
    }

    
    abstract String getRegex(T annotation);

    
    abstract String getReplacer(T annotation);

}
