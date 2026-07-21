package com.zcashjava.znl.module.system.dal.dataobject.logger;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.module.system.enums.logger.LoginLogTypeEnum;
import com.zcashjava.znl.module.system.enums.logger.LoginResultEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


@TableName("system_login_log")
@KeySequence("system_login_log_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class LoginLogDO extends BaseDO {

    
    private Long id;
    
    private Integer logType;
    
    private String traceId;
    
    private Long userId;
    
    private Integer userType;
    
    private String username;
    
    private Integer result;
    
    private String userIp;
    
    private String userAgent;

}
