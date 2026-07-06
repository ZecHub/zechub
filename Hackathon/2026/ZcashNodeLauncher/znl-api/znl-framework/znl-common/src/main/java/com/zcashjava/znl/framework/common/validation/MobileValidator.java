package com.zcashjava.znl.framework.common.validation;

import cn.hutool.core.util.StrUtil;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.zcashjava.znl.framework.common.util.validation.ValidationUtils;

public class MobileValidator implements ConstraintValidator<Mobile, String> {

    @Override
    public void initialize(Mobile annotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        
        if (StrUtil.isEmpty(value)) {
            return true;
        }
        
        return ValidationUtils.isMobile(value);
    }

}
