package com.zcashjava.znl.framework.common.biz.infra.logger.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Data
public class ApiAccessLogCreateReqDTO {

    
    private String traceId;
    
    private Long userId;
    
    private Integer userType;
    
    @NotNull(message = "Application name cannot be empty")
    private String applicationName;

    
    @NotNull(message = "http Request method cannot be empty")
    private String requestMethod;
    
    @NotNull(message = "Access address cannot be empty")
    private String requestUrl;
    
    private String requestParams;
    
    private String responseBody;
    
    @NotNull(message = "ip can't be empty.")
    private String userIp;
    
    @NotNull(message = "User-Agent cannot be empty")
    private String userAgent;

    
    private String operateModule;
    
    private String operateName;
    
    private Integer operateType;

    
    @NotNull(message = "The start of the request cannot be empty.")
    private LocalDateTime beginTime;
    
    @NotNull(message = "End of request cannot be empty.")
    private LocalDateTime endTime;
    
    @NotNull(message = "The duration of the execution cannot be empty.")
    private Integer duration;
    
    @NotNull(message = "Error code cannot be empty")
    private Integer resultCode;
    
    private String resultMsg;

}
