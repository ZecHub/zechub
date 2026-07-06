package com.zcashjava.znl.module.system.dal.dataobject.oauth2;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.tenant.core.db.TenantBaseDO;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@TableName(value = "system_oauth2_access_token", autoResultMap = true)
@KeySequence("system_oauth2_access_token_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class OAuth2AccessTokenDO extends TenantBaseDO {

    
    @TableId
    private Long id;
    
    private String accessToken;
    
    private String refreshToken;
    
    private Long userId;
    
    private Integer userType;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, String> userInfo;
    
    private String clientId;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> scopes;
    
    private LocalDateTime expiresTime;

}
