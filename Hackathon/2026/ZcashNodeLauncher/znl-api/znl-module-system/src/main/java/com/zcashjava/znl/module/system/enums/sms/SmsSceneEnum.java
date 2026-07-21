package com.zcashjava.znl.module.system.enums.sms;

import cn.hutool.core.util.ArrayUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import com.zcashjava.znl.framework.common.core.ArrayValuable;


@Getter
@AllArgsConstructor
public enum SmsSceneEnum implements ArrayValuable<Integer> {

    MEMBER_LOGIN(1, "user-sms-login", "Member user - cell phone landing"),
    MEMBER_UPDATE_MOBILE(2, "user-update-mobile", "Member User - Modify Cell Phone"),
    MEMBER_UPDATE_PASSWORD(3, "user-update-password", "Member User - Modify Password"),
    MEMBER_RESET_PASSWORD(4, "user-reset-password", "Member User - Forget Password"),

    ADMIN_MEMBER_LOGIN(21, "admin-sms-login", "Backstage user - cell phone number login"),
    ADMIN_MEMBER_REGISTER(22, "admin-sms-register", "Backstage user - mobile phone number registered"),
    ADMIN_MEMBER_RESET_PASSWORD(23, "admin-reset-password", "Backstage User - Forget Password");

    public static final Integer[] ARRAYS = Arrays.stream(values()).map(SmsSceneEnum::getScene).toArray(Integer[]::new);

    
    private final Integer scene;
    
    private final String templateCode;
    
    private final String description;

    @Override
    public Integer[] array() {
        return ARRAYS;
    }

    public static SmsSceneEnum getCodeByScene(Integer scene) {
        return ArrayUtil.firstMatch(sceneEnum -> sceneEnum.getScene().equals(scene),
                values());
    }

}
