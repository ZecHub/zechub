package com.zcashjava.znl.module.system.service.oauth2;

import java.util.List;

import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2CodeDO;


public interface OAuth2CodeService {

    
    OAuth2CodeDO createAuthorizationCode(Long userId, Integer userType, String clientId,
                                         List<String> scopes, String redirectUri, String state);

    
    OAuth2CodeDO consumeAuthorizationCode(String code);

}
