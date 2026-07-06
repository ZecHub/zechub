package com.zcashjava.znl.module.infra.enums.codegen;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static cn.hutool.core.util.ArrayUtil.*;


@AllArgsConstructor
@Getter
public enum CodegenSceneEnum {

    ADMIN(1, "Manage backstage", "admin", ""),
    APP(2, "User APP", "app", "App");

    
    private final Integer scene;
    
    private final String name;
    
    private final String basePackage;
    
    private final String prefixClass;

    public static CodegenSceneEnum valueOf(Integer scene) {
        return firstMatch(sceneEnum -> sceneEnum.getScene().equals(scene), values());
    }

}
