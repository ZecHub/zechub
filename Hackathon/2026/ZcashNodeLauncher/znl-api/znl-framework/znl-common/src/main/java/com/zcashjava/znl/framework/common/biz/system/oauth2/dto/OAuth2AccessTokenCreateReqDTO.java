package com.zcashjava.znl.framework.common.biz.system.oauth2.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;

import java.io.Serializable;
import java.util.List;


@Data
public class OAuth2AccessTokenCreateReqDTO implements Serializable {

    
    @NotNull(message = "User ID cannot be empty")
    private Long userId;
    
    @NotNull(message = "User type cannot be empty")
    @InEnum(value = UserTypeEnum.class, message = "User type must be {value}")
    private Integer userType;
    
    @NotNull(message = "Client ID cannot be empty")
    private String clientId;
    
    private List<String> scopes;

}
