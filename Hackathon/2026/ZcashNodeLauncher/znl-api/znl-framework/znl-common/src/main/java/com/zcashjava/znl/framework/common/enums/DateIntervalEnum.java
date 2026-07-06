package com.zcashjava.znl.framework.common.enums;

import cn.hutool.core.util.ArrayUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.core.ArrayValuable;


@Getter
@AllArgsConstructor
public enum DateIntervalEnum implements ArrayValuable<Integer> {

    HOUR(0, "Hours"), 
    DAY(1, "Oh, my God."),
    WEEK(2, "Week"),
    MONTH(3, "Month"),
    QUARTER(4, "Quarterly"),
    YEAR(5, "Year")
    ;

    public static final Integer[] ARRAYS = Arrays.stream(values()).map(DateIntervalEnum::getInterval).toArray(Integer[]::new);

    
    private final Integer interval;
    
    private final String name;

    @Override
    public Integer[] array() {
        return ARRAYS;
    }

    public static DateIntervalEnum valueOf(Integer interval) {
        return ArrayUtil.firstMatch(item -> item.getInterval().equals(interval), DateIntervalEnum.values());
    }

}