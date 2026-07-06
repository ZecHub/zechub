package com.zcashjava.znl.framework.common.biz.system.logger.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.enums.UserTypeEnum;


@Data
public class OperateLogCreateReqDTO {

    
    private String traceId;
    
    @NotNull(message = "User ID cannot be empty")
    private Long userId;
    
    @NotNull(message = "User type cannot be empty")
    private Integer userType;
    
    @NotEmpty(message = "Operation module type cannot be empty")
    private String type;
    
    @NotEmpty(message = "subType cannot be empty")
    private String subType;
    
    @NotNull(message = "Operation module business number cannot be empty")
    private Long bizId;
    
    @NotEmpty(message = "Operation cannot be empty")
    private String action;
    
    private String extra;

    
    @NotEmpty(message = "Request method name cannot be empty")
    private String requestMethod;
    
    @NotEmpty(message = "requestUrl cannot be empty")
    private String requestUrl;
    
    @NotEmpty(message = "User IP cannot be empty")
    private String userIp;
    
    @NotEmpty(message = "Browser UA cannot be empty")
    private String userAgent;

}
