package com.zcashjava.znl.module.system.service.oauth2;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2ApproveDO;


public interface OAuth2ApproveService {

    
    boolean checkForPreApproval(Long userId, Integer userType, String clientId, Collection<String> requestedScopes);

    
    boolean updateAfterApproval(Long userId, Integer userType, String clientId, Map<String, Boolean> requestedScopes);

    
    List<OAuth2ApproveDO> getApproveList(Long userId, Integer userType, String clientId);

}
