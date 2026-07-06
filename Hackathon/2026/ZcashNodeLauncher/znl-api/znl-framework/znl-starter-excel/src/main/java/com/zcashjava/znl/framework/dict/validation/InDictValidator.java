package com.zcashjava.znl.framework.dict.validation;

import cn.hutool.core.util.StrUtil;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.zcashjava.znl.framework.dict.core.DictFrameworkUtils;

import java.util.List;

public class InDictValidator implements ConstraintValidator<InDict, Object> {

    private String dictType;

    @Override
    public void initialize(InDict annotation) {
        this.dictType = annotation.type();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        
        if (value == null) {
            return true;
        }
        
        final List<String> values = DictFrameworkUtils.getDictDataValueList(dictType);
        boolean match = values.stream().anyMatch(v -> StrUtil.equalsIgnoreCase(v, value.toString()));
        if (match) {
            return true;
        }

        
        context.disableDefaultConstraintViolation(); 
        context.buildConstraintViolationWithTemplate(
                context.getDefaultConstraintMessageTemplate().replaceAll("\\{value}", values.toString())
        ).addConstraintViolation(); 
        return false;
    }

}

