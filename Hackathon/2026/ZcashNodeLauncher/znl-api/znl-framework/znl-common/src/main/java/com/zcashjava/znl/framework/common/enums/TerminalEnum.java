package com.zcashjava.znl.framework.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.core.ArrayValuable;


@RequiredArgsConstructor
@Getter
public enum TerminalEnum implements ArrayValuable<Integer> {

    UNKNOWN(0, "Unknown"), 
    WECHAT_MINI_PROGRAM(10, "Can not open message"),
    WECHAT_WAP(11, "CVC."),
    H5(20, "H5 Web page"),
    APP(31, "Cell phone, App."),
    ;

    public static final Integer[] ARRAYS = Arrays.stream(values()).map(TerminalEnum::getTerminal).toArray(Integer[]::new);

    
    private final Integer terminal;
    
    private final String name;

    @Override
    public Integer[] array() {
        return ARRAYS;
    }
}
