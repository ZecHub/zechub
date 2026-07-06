package com.zcashjava.znl.module.system.service.oauth2;

import java.util.List;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.token.OAuth2AccessTokenPageReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2AccessTokenDO;


public interface OAuth2TokenService {

    
    OAuth2AccessTokenDO createAccessToken(Long userId, Integer userType, String clientId, List<String> scopes);

    
    OAuth2AccessTokenDO refreshAccessToken(String refreshToken, String clientId);

    
    OAuth2AccessTokenDO getAccessToken(String accessToken);

    
    OAuth2AccessTokenDO checkAccessToken(String accessToken);

    
    OAuth2AccessTokenDO removeAccessToken(String accessToken);

    
    PageResult<OAuth2AccessTokenDO> getAccessTokenPage(OAuth2AccessTokenPageReqVO reqVO);

}
