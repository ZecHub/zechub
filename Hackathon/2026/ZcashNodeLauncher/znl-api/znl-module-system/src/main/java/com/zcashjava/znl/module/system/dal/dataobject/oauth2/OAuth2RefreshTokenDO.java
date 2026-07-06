package com.zcashjava.znl.module.system.dal.dataobject.oauth2;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.tenant.core.db.TenantBaseDO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@TableName(value = "system_oauth2_refresh_token", autoResultMap = true)

@KeySequence("system_oauth2_access_token_seq") 
@Data
public class OAuth2RefreshTokenDO extends TenantBaseDO {

    
    private Long id;
    
    private String refreshToken;
    
    private Long userId;
    
    private Integer userType;
    
    private String clientId;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> scopes;
    
    private LocalDateTime expiresTime;

}
