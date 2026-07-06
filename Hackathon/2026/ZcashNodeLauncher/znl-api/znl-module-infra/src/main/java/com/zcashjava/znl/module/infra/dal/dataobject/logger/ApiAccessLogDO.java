package com.zcashjava.znl.module.infra.dal.dataobject.logger;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.*;

import java.time.LocalDateTime;


@TableName("infra_api_access_log")
@KeySequence(value = "infra_api_access_log_seq")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiAccessLogDO extends BaseDO {

    
    public static final Integer REQUEST_PARAMS_MAX_LENGTH = 8000;

    
    public static final Integer RESULT_MSG_MAX_LENGTH = 512;

    
    @TableId
    private Long id;
    
    private String traceId;
    
    private Long userId;
    
    private Integer userType;
    
    private String applicationName;

    

    
    private String requestMethod;
    
    private String requestUrl;
    
    private String requestParams;
    
    private String responseBody;
    
    private String userIp;
    
    private String userAgent;

    

    
    private String operateModule;
    
    private String operateName;
    
    private Integer operateType;

    
    private LocalDateTime beginTime;
    
    private LocalDateTime endTime;
    
    private Integer duration;

    
    private Integer resultCode;
    
    private String resultMsg;

}
