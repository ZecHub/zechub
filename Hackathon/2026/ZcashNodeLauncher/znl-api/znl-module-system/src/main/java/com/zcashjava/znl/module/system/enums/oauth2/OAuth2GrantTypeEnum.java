package com.zcashjava.znl.module.system.enums.oauth2;

import cn.hutool.core.util.ArrayUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum OAuth2GrantTypeEnum {

    PASSWORD("password"), 
    AUTHORIZATION_CODE("authorization_code"), 
    IMPLICIT("implicit"), 
    CLIENT_CREDENTIALS("client_credentials"), 
    REFRESH_TOKEN("refresh_token"), 
    ;

    private final String grantType;

    public static OAuth2GrantTypeEnum getByGrantType(String grantType) {
        return ArrayUtil.firstMatch(o -> o.getGrantType().equals(grantType), values());
    }

}
