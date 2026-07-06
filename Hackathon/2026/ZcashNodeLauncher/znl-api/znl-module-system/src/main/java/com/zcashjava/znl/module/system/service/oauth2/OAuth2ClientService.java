package com.zcashjava.znl.module.system.service.oauth2;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.client.OAuth2ClientPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.client.OAuth2ClientSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2ClientDO;

import java.util.Collection;
import java.util.List;


public interface OAuth2ClientService {

    
    Long createOAuth2Client(@Valid OAuth2ClientSaveReqVO createReqVO);

    
    void updateOAuth2Client(@Valid OAuth2ClientSaveReqVO updateReqVO);

    
    void deleteOAuth2Client(Long id);

    
    void deleteOAuth2ClientList(List<Long> ids);

    
    OAuth2ClientDO getOAuth2Client(Long id);

    
    OAuth2ClientDO getOAuth2ClientFromCache(String clientId);

    
    PageResult<OAuth2ClientDO> getOAuth2ClientPage(OAuth2ClientPageReqVO pageReqVO);

    
    default OAuth2ClientDO validOAuthClientFromCache(String clientId) {
        return validOAuthClientFromCache(clientId, null, null, null, null);
    }

    
    OAuth2ClientDO validOAuthClientFromCache(String clientId, String clientSecret, String authorizedGrantType,
                                             Collection<String> scopes, String redirectUri);

}
