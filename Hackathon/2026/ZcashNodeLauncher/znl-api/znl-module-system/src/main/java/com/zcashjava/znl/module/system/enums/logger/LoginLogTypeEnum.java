package com.zcashjava.znl.module.system.enums.logger;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum LoginLogTypeEnum {

    LOGIN_USERNAME(100), 
    LOGIN_SOCIAL(101), 
    LOGIN_MOBILE(103), 
    LOGIN_SMS(104), 

    LOGOUT_SELF(200),  
    LOGOUT_DELETE(202), 
    ;

    
    private final Integer type;

}
