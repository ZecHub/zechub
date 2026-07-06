package com.zcashjava.znl.module.system.dal.dataobject.oauth2;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;


@TableName(value = "system_oauth2_code", autoResultMap = true)
@KeySequence("system_oauth2_code_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class OAuth2CodeDO extends BaseDO {

    
    private Long id;
    
    private String code;
    
    private Long userId;
    
    private Integer userType;
    
    private String clientId;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> scopes;
    
    private String redirectUri;
    
    private String state;
    
    private LocalDateTime expiresTime;

}
