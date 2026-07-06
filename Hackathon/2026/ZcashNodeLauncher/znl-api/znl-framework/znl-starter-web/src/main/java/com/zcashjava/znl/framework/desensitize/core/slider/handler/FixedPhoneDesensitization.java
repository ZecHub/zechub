package com.zcashjava.znl.framework.desensitize.core.slider.handler;

import com.zcashjava.znl.framework.desensitize.core.slider.annotation.FixedPhoneDesensitize;


public class FixedPhoneDesensitization extends AbstractSliderDesensitizationHandler<FixedPhoneDesensitize> {

    @Override
    Integer getPrefixKeep(FixedPhoneDesensitize annotation) {
        return annotation.prefixKeep();
    }

    @Override
    Integer getSuffixKeep(FixedPhoneDesensitize annotation) {
        return annotation.suffixKeep();
    }

    @Override
    String getReplacer(FixedPhoneDesensitize annotation) {
        return annotation.replacer();
    }

}
