package com.zcashjava.znl.module.infra.enums.codegen;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum CodegenFrontTypeEnum {

    VUE2_ELEMENT_UI(10), 

    VUE3_ELEMENT_PLUS(20), 

    VUE3_VBEN2_ANTD_SCHEMA(30), 

    VUE3_VBEN5_ANTD_SCHEMA(40), 
    VUE3_VBEN5_ANTD_GENERAL(41), 

    VUE3_VBEN5_EP_SCHEMA(50), 
    VUE3_VBEN5_EP_GENERAL(51), 
    ;

    
    private final Integer type;

}
