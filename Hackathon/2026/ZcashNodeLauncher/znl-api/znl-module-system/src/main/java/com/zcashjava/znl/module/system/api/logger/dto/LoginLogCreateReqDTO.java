package com.zcashjava.znl.module.system.api.logger.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
public class LoginLogCreateReqDTO {

    
    @NotNull(message = "Log type cannot be empty")
    private Integer logType;
    
    private String traceId;

    
    private Long userId;
    
    @NotNull(message = "User type cannot be empty")
    private Integer userType;
    
    private String username;

    
    @NotNull(message = "Login results cannot be empty")
    private Integer result;

    
    @NotEmpty(message = "User IP cannot be empty")
    private String userIp;
    
    private String userAgent;

}
