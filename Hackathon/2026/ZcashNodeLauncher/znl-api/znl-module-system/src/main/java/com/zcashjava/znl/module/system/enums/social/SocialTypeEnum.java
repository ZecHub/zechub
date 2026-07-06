package com.zcashjava.znl.module.system.enums.social;

import cn.hutool.core.util.ArrayUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.core.ArrayValuable;


@Getter
@AllArgsConstructor
public enum SocialTypeEnum implements ArrayValuable<Integer> {

    
    GITEE(10, "GITEE"),
    
    DINGTALK(20, "DINGTALK"),

    
    WECHAT_ENTERPRISE(30, "WECHAT_ENTERPRISE"),
    
    WECHAT_MP(31, "WECHAT_MP"),
    
    WECHAT_OPEN(32, "WECHAT_OPEN"),
    
    WECHAT_MINI_PROGRAM(34, "WECHAT_MINI_PROGRAM"),
    ;

    public static final Integer[] ARRAYS = Arrays.stream(values()).map(SocialTypeEnum::getType).toArray(Integer[]::new);

    
    private final Integer type;
    
    private final String source;

    @Override
    public Integer[] array() {
        return ARRAYS;
    }

    public static SocialTypeEnum valueOfType(Integer type) {
        return ArrayUtil.firstMatch(o -> o.getType().equals(type), values());
    }

}
