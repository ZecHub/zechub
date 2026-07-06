package com.zcashjava.znl.module.system.dal.dataobject.oauth2;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.system.enums.oauth2.OAuth2GrantTypeEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;


@TableName(value = "system_oauth2_client", autoResultMap = true)
@KeySequence("system_oauth2_client_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@TenantIgnore
public class OAuth2ClientDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private String clientId;
    
    private String secret;
    
    private String name;
    
    private String logo;
    
    private String description;
    
    private Integer status;
    
    private Integer accessTokenValiditySeconds;
    
    private Integer refreshTokenValiditySeconds;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> redirectUris;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> authorizedGrantTypes;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> scopes;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> autoApproveScopes;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> authorities;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> resourceIds;
    
    private String additionalInformation;

}
