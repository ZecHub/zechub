package com.zcashjava.znl.module.system.enums.notify;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum NotifyTemplateTypeEnum {

    
    SYSTEM_MESSAGE(2),
    
    NOTIFICATION_MESSAGE(1);

    private final Integer type;

}
