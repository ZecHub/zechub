package com.zcashjava.znl.framework.common.biz.system.oauth2.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Data
public class OAuth2AccessTokenCheckRespDTO implements Serializable {

    
    private Long userId;
    
    private Integer userType;
    
    private Map<String, String> userInfo;
    
    private Long tenantId;
    
    private List<String> scopes;
    
    private LocalDateTime expiresTime;

}
