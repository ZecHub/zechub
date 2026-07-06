package com.zcashjava.znl.module.system.service.oauth2;

import cn.hutool.core.util.IdUtil;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.util.date.DateUtils;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2CodeDO;
import com.zcashjava.znl.module.system.dal.mysql.oauth2.OAuth2CodeMapper;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.system.enums.ErrorCodeConstants.OAUTH2_CODE_EXPIRE;
import static com.zcashjava.znl.module.system.enums.ErrorCodeConstants.OAUTH2_CODE_NOT_EXISTS;


@Service
@Validated
public class OAuth2CodeServiceImpl implements OAuth2CodeService {

    
    private static final Integer TIMEOUT = 5 * 60;

    @Resource
    private OAuth2CodeMapper oauth2CodeMapper;

    @Override
    public OAuth2CodeDO createAuthorizationCode(Long userId, Integer userType, String clientId,
                                                List<String> scopes, String redirectUri, String state) {
        OAuth2CodeDO codeDO = new OAuth2CodeDO();
        codeDO.setCode(generateCode());
        codeDO.setUserId(userId);
        codeDO.setUserType(userType);
        codeDO.setClientId(clientId);
        codeDO.setScopes(scopes);
        codeDO.setExpiresTime(LocalDateTime.now().plusSeconds(TIMEOUT));
        codeDO.setRedirectUri(redirectUri);
        codeDO.setState(state);
        oauth2CodeMapper.insert(codeDO);
        return codeDO;
    }

    @Override
    public OAuth2CodeDO consumeAuthorizationCode(String code) {
        OAuth2CodeDO codeDO = oauth2CodeMapper.selectByCode(code);
        if (codeDO == null) {
            throw exception(OAUTH2_CODE_NOT_EXISTS);
        }
        if (DateUtils.isExpired(codeDO.getExpiresTime())) {
            throw exception(OAUTH2_CODE_EXPIRE);
        }
        oauth2CodeMapper.deleteById(codeDO.getId());
        return codeDO;
    }

    private static String generateCode() {
        return IdUtil.fastSimpleUUID();
    }

}
