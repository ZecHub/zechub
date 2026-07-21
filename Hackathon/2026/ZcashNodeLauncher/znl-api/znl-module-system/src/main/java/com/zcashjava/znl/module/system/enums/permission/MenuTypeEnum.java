package com.zcashjava.znl.module.system.enums.permission;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum MenuTypeEnum {

    DIR(1), 
    MENU(2), 
    BUTTON(3) 
    ;

    
    private final Integer type;

}
