package com.zcashjava.znl.module.infra.dal.dataobject.logger;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.module.infra.enums.logger.ApiErrorLogProcessStatusEnum;

import lombok.*;

import java.time.LocalDateTime;


@TableName("infra_api_error_log")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@KeySequence(value = "infra_api_error_log_seq")
public class ApiErrorLogDO extends BaseDO {

    
    public static final Integer REQUEST_PARAMS_MAX_LENGTH = 8000;

    
    @TableId
    private Long id;
    
    private Long userId;
    
    private String traceId;
    
    private Integer userType;
    
    private String applicationName;

    

    
    private String requestMethod;
    
    private String requestUrl;
    
    private String requestParams;
    
    private String userIp;
    
    private String userAgent;

    

    
    private LocalDateTime exceptionTime;
    
    private String exceptionName;
    
    private String exceptionMessage;
    
    private String exceptionRootCauseMessage;
    
    private String exceptionStackTrace;
    
    private String exceptionClassName;
    
    private String exceptionFileName;
    
    private String exceptionMethodName;
    
    private Integer exceptionLineNumber;

    

    
    private Integer processStatus;
    
    private LocalDateTime processTime;
    
    private Long processUserId;

}
