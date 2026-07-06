package com.zcashjava.znl.framework.desensitize.core.slider.handler;

import cn.hutool.core.util.StrUtil;

import java.lang.annotation.Annotation;

import com.zcashjava.znl.framework.common.util.spring.SpringExpressionUtils;
import com.zcashjava.znl.framework.desensitize.core.base.handler.DesensitizationHandler;


public abstract class AbstractSliderDesensitizationHandler<T extends Annotation>
        implements DesensitizationHandler<T> {

    @Override
    public String desensitize(String origin, T annotation) {
        
        Object disable = SpringExpressionUtils.parseExpression(getDisable(annotation));
        if (Boolean.TRUE.equals(disable)) {
            return origin;
        }

        
        int prefixKeep = getPrefixKeep(annotation);
        int suffixKeep = getSuffixKeep(annotation);
        String replacer = getReplacer(annotation);
        int length = origin.length();
        int interval = length - prefixKeep - suffixKeep;

        
        if (interval <= 0) {
            return buildReplacerByLength(replacer, length);
        }

        
        return origin.substring(0, prefixKeep) +
                buildReplacerByLength(replacer, interval) +
                origin.substring(prefixKeep + interval);
    }

    
    private String buildReplacerByLength(String replacer, int length) {
        return StrUtil.repeat(replacer, length);
    }

    
    abstract Integer getPrefixKeep(T annotation);

    
    abstract Integer getSuffixKeep(T annotation);

    
    abstract String getReplacer(T annotation);

}
