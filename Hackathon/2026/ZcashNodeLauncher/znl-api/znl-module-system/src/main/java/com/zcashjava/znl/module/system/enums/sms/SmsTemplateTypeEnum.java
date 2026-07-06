package com.zcashjava.znl.module.system.enums.sms;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum SmsTemplateTypeEnum {

    VERIFICATION_CODE(1), 
    NOTICE(2), 
    PROMOTION(3), 
    ;

    
    private final int type;

}
