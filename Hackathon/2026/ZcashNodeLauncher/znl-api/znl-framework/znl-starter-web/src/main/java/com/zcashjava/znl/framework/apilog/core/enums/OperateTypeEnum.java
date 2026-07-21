package com.zcashjava.znl.framework.apilog.core.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum OperateTypeEnum {

    
    GET(1),
    
    CREATE(2),
    
    UPDATE(3),
    
    DELETE(4),
    
    EXPORT(5),
    
    IMPORT(6),
    
    OTHER(0);

    
    private final Integer type;

}
