package com.zcashjava.znl.module.system.enums.common;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum SexEnum {

    
    MALE(1),
    
    FEMALE(2),
    
    UNKNOWN(0);

    
    private final Integer sex;

}
