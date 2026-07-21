package com.zcashjava.znl.framework.common.biz.infra.logger.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Data
public class ApiErrorLogCreateReqDTO {

    
    private String traceId;
    
    private Long userId;
    
    private Integer userType;
    
    @NotNull(message = "Application name cannot be empty")
    private String applicationName;

    
    @NotNull(message = "http Request method cannot be empty")
    private String requestMethod;
    
    @NotNull(message = "Access address cannot be empty")
    private String requestUrl;
    
    @NotNull(message = "requestParams cannot be empty")
    private String requestParams;
    
    @NotNull(message = "ip can't be empty.")
    private String userIp;
    
    @NotNull(message = "User-Agent cannot be empty")
    private String userAgent;

    
    @NotNull(message = "Anomalous times can't be empty.")
    private LocalDateTime exceptionTime;
    
    @NotNull(message = "Anomalous names can't be empty.")
    private String exceptionName;
    
    @NotNull(message = "The full name of an unusual occurrence cannot be empty.")
    private String exceptionClassName;
    
    @NotNull(message = "Anomalous class file cannot be empty.")
    private String exceptionFileName;
    
    @NotNull(message = "The way an anomaly happens, it can't be empty.")
    private String exceptionMethodName;
    
    @NotNull(message = "The way an anomaly happens cannot be empty.")
    private Integer exceptionLineNumber;
    
    @NotNull(message = "An abnormal staircase cannot be empty.")
    private String exceptionStackTrace;
    
    @NotNull(message = "Unusual information can't be empty.")
    private String exceptionRootCauseMessage;
    
    @NotNull(message = "Unusual news can't be empty.")
    private String exceptionMessage;


}
