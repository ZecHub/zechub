package com.zcashjava.znl.module.system.enums.permission;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.core.ArrayValuable;


@Getter
@AllArgsConstructor
public enum DataScopeEnum implements ArrayValuable<Integer> {

    ALL(1), 

    DEPT_CUSTOM(2), 
    DEPT_ONLY(3), 
    DEPT_AND_CHILD(4), 

    SELF(5); 

    
    private final Integer scope;

    public static final Integer[] ARRAYS = Arrays.stream(values()).map(DataScopeEnum::getScope).toArray(Integer[]::new);

    @Override
    public Integer[] array() {
        return ARRAYS;
    }

}
