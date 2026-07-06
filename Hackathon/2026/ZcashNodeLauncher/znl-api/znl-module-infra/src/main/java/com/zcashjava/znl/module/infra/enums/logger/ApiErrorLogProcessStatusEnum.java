package com.zcashjava.znl.module.infra.enums.logger;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum ApiErrorLogProcessStatusEnum {

    INIT(0, "Not processed"),
    DONE(1, "Processed"),
    IGNORE(2, "Ignored");

    
    private final Integer status;
    
    private final String name;

}
