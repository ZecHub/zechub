package com.zcashjava.znl.framework.common.enums;

import cn.hutool.core.util.ObjUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.core.ArrayValuable;


@Getter
@AllArgsConstructor
public enum CommonStatusEnum implements ArrayValuable<Integer> {

    ENABLE(0, "Open"),
    DISABLE(1, "Close");

    public static final Integer[] ARRAYS = Arrays.stream(values()).map(CommonStatusEnum::getStatus).toArray(Integer[]::new);

    
    private final Integer status;
    
    private final String name;

    @Override
    public Integer[] array() {
        return ARRAYS;
    }

    public static boolean isEnable(Integer status) {
        return ObjUtil.equal(ENABLE.status, status);
    }

    public static boolean isDisable(Integer status) {
        return ObjUtil.equal(DISABLE.status, status);
    }

}
