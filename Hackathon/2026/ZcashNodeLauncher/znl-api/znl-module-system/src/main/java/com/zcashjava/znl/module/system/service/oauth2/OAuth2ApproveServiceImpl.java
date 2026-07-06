package com.zcashjava.znl.module.system.service.oauth2;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.Assert;

import com.google.common.annotations.VisibleForTesting;
import com.zcashjava.znl.framework.common.util.date.DateUtils;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2ApproveDO;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2ClientDO;
import com.zcashjava.znl.module.system.dal.mysql.oauth2.OAuth2ApproveMapper;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import javax.annotation.Resource;

import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertSet;

import java.time.LocalDateTime;
import java.util.*;


@Service
@Validated
public class OAuth2ApproveServiceImpl implements OAuth2ApproveService {

    
    private static final Integer TIMEOUT = 30 * 24 * 60 * 60; 

    @Resource
    private OAuth2ClientService oauth2ClientService;

    @Resource
    private OAuth2ApproveMapper oauth2ApproveMapper;

    @Override
    @Transactional
    public boolean checkForPreApproval(Long userId, Integer userType, String clientId, Collection<String> requestedScopes) {
        
        OAuth2ClientDO clientDO = oauth2ClientService.validOAuthClientFromCache(clientId);
        Assert.notNull(clientDO, "Client cannot be empty"); 
        if (CollUtil.containsAll(clientDO.getAutoApproveScopes(), requestedScopes)) {
            
            LocalDateTime expireTime = LocalDateTime.now().plusSeconds(TIMEOUT);
            for (String scope : requestedScopes) {
                saveApprove(userId, userType, clientId, scope, true, expireTime);
            }
            return true;
        }

        
        List<OAuth2ApproveDO> approveDOs = getApproveList(userId, userType, clientId);
        Set<String> scopes = convertSet(approveDOs, OAuth2ApproveDO::getScope,
                OAuth2ApproveDO::getApproved); 
        return CollUtil.containsAll(scopes, requestedScopes);
    }

    @Override
    @Transactional
    public boolean updateAfterApproval(Long userId, Integer userType, String clientId, Map<String, Boolean> requestedScopes) {
        
        if (CollUtil.isEmpty(requestedScopes)) {
            return true;
        }

        
        boolean success = false; 
        LocalDateTime expireTime = LocalDateTime.now().plusSeconds(TIMEOUT);
        for (Map.Entry<String, Boolean> entry : requestedScopes.entrySet()) {
            if (entry.getValue()) {
                success = true;
            }
            saveApprove(userId, userType, clientId, entry.getKey(), entry.getValue(), expireTime);
        }
        return success;
    }

    @Override
    public List<OAuth2ApproveDO> getApproveList(Long userId, Integer userType, String clientId) {
        List<OAuth2ApproveDO> approveDOs = oauth2ApproveMapper.selectListByUserIdAndUserTypeAndClientId(
                userId, userType, clientId);
        approveDOs.removeIf(o -> DateUtils.isExpired(o.getExpiresTime()));
        return approveDOs;
    }

    @VisibleForTesting
    void saveApprove(Long userId, Integer userType, String clientId,
                     String scope, Boolean approved, LocalDateTime expireTime) {
        
        OAuth2ApproveDO approveDO = new OAuth2ApproveDO();
        
        approveDO.setUserId(userId);
        approveDO.setUserType(userType);
        approveDO.setClientId(clientId);
        approveDO.setScope(scope);
        approveDO.setApproved(approved);
        approveDO.setExpiresTime(expireTime);
        if (oauth2ApproveMapper.update(approveDO) == 1) {
            return;
        }
        
        oauth2ApproveMapper.insert(approveDO);
    }

}
