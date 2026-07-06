package com.zcashjava.znl.module.infra.enums.codegen;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum CodegenColumnHtmlTypeEnum {

    INPUT("input"), 
    TEXTAREA("textarea"), 
    SELECT("select"), 
    RADIO("radio"), 
    CHECKBOX("checkbox"), 
    DATETIME("datetime"), 
    IMAGE_UPLOAD("imageUpload"), 
    FILE_UPLOAD("fileUpload"), 
    EDITOR("editor"), 
    ;

    
    private final String type;

}
