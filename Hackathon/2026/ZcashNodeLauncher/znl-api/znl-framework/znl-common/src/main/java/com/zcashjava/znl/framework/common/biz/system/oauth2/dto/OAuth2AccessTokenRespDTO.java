package com.zcashjava.znl.framework.common.biz.system.oauth2.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;


@Data
public class OAuth2AccessTokenRespDTO implements Serializable {

    
    private String accessToken;
    
    private String refreshToken;
    
    private Long userId;
    
    private Integer userType;
    
    private LocalDateTime expiresTime;

}
