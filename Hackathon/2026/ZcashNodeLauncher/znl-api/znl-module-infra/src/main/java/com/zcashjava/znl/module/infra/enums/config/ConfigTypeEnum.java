package com.zcashjava.znl.module.infra.enums.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ConfigTypeEnum {

    
    SYSTEM(1),
    
    CUSTOM(2);

    private final Integer type;

}
