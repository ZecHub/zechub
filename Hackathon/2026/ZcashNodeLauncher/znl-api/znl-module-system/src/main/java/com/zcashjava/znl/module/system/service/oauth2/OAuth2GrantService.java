package com.zcashjava.znl.module.system.service.oauth2;

import java.util.List;

import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2AccessTokenDO;


public interface OAuth2GrantService {

    
    OAuth2AccessTokenDO grantImplicit(Long userId, Integer userType,
                                      String clientId, List<String> scopes);

    
    String grantAuthorizationCodeForCode(Long userId, Integer userType,
                                         String clientId, List<String> scopes,
                                         String redirectUri, String state);

    
    OAuth2AccessTokenDO grantAuthorizationCodeForAccessToken(String clientId, String code,
                                                             String redirectUri, String state);

    
    OAuth2AccessTokenDO grantPassword(String username, String password,
                                      String clientId, List<String> scopes);

    
    OAuth2AccessTokenDO grantRefreshToken(String refreshToken, String clientId);

    
    OAuth2AccessTokenDO grantClientCredentials(String clientId, List<String> scopes);

    
    boolean revokeToken(String clientId, String accessToken);

}
