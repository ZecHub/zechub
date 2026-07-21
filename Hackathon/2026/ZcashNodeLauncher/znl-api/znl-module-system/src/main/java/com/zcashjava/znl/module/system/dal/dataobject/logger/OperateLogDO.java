package com.zcashjava.znl.module.system.dal.dataobject.logger;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.Data;


@TableName(value = "system_operate_log", autoResultMap = true)
@KeySequence("system_operate_log_seq") 
@Data
public class OperateLogDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private String traceId;
    
    private Long userId;
    
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

}
