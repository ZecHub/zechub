package com.zcashjava.znl.module.system.api.logger.dto;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class OperateLogRespDTO {

    
    private Long id;
    
    private String traceId;
    
    private Long userId;
    
    private String userName;
    
    private Integer userType;
    
    private String type;
    
    private String subType;
    
    private Long bizId;
    
    private String action;
    
    private String extra;

    
    private String requestMethod;
    
    private String requestUrl;
    
    private String userIp;
    
    private String userAgent;

    
    private LocalDateTime createTime;

}
