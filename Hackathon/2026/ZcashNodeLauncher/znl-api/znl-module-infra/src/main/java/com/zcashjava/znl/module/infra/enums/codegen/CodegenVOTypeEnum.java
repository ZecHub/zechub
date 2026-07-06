package com.zcashjava.znl.module.infra.enums.codegen;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum CodegenVOTypeEnum {

    VO(10, "VO"),
    DO(20, "DO");

    
    private final Integer type;
    
    private final String name;

}
