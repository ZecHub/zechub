package com.zcashjava.znl.framework.common.biz.system.oauth2;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.biz.system.oauth2.dto.OAuth2AccessTokenCheckRespDTO;
import com.zcashjava.znl.framework.common.biz.system.oauth2.dto.OAuth2AccessTokenCreateReqDTO;
import com.zcashjava.znl.framework.common.biz.system.oauth2.dto.OAuth2AccessTokenRespDTO;


public interface OAuth2TokenCommonApi {

    
    OAuth2AccessTokenRespDTO createAccessToken(@Valid OAuth2AccessTokenCreateReqDTO reqDTO);

    
    OAuth2AccessTokenCheckRespDTO checkAccessToken(String accessToken);

    
    OAuth2AccessTokenRespDTO removeAccessToken(String accessToken);

    
    OAuth2AccessTokenRespDTO refreshAccessToken(String refreshToken, String clientId);

}
