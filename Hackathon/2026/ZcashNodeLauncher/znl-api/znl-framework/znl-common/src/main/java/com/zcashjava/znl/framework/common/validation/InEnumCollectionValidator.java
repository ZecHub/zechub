package com.zcashjava.znl.framework.common.validation;

import cn.hutool.core.collection.CollUtil;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.zcashjava.znl.framework.common.core.ArrayValuable;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class InEnumCollectionValidator implements ConstraintValidator<InEnum, Collection<?>> {

    private List<?> values;

    @Override
    public void initialize(InEnum annotation) {
        ArrayValuable<?>[] values = annotation.value().getEnumConstants();
        if (values.length == 0) {
            this.values = Collections.emptyList();
        } else {
            this.values = Arrays.asList(values[0].array());
        }
    }

    @Override
    public boolean isValid(Collection<?> list, ConstraintValidatorContext context) {
        if (list == null) {
            return true;
        }
        
        if (CollUtil.containsAll(values, list)) {
            return true;
        }
        
        context.disableDefaultConstraintViolation(); 
        context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()
                .replaceAll("\\{value}", CollUtil.join(list, ","))).addConstraintViolation(); 
        return false;
    }

}

