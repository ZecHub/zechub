package com.zcashjava.znl.module.system.enums.sms;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum SmsReceiveStatusEnum {

    INIT(0), 
    SUCCESS(10), 
    FAILURE(20), 
    ;

    private final int status;

}
