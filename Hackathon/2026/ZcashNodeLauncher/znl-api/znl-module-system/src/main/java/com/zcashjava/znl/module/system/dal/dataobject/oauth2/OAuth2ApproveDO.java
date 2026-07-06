package com.zcashjava.znl.module.system.dal.dataobject.oauth2;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;


@TableName(value = "system_oauth2_approve", autoResultMap = true)
@KeySequence("system_oauth2_approve_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class OAuth2ApproveDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private Long userId;
    
    private Integer userType;
    
    private String clientId;
    
    private String scope;
    
    private Boolean approved;
    
    private LocalDateTime expiresTime;

}
