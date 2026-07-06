package com.zcashjava.znl.module.system.enums.mail;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum MailSendStatusEnum {

    INIT(0), 
    SUCCESS(10), 
    FAILURE(20), 
    IGNORE(30), 
    ;

    private final int status;

}
