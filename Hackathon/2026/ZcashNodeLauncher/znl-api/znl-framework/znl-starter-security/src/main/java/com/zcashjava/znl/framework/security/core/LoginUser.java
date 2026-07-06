package com.zcashjava.znl.framework.security.core;

import cn.hutool.core.map.MapUtil;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zcashjava.znl.framework.common.enums.UserTypeEnum;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Data
public class LoginUser {

    public static final String INFO_KEY_NICKNAME = "nickname";
    public static final String INFO_KEY_DEPT_ID = "deptId";

    
    private Long id;
    
    private Integer userType;
    
    private Map<String, String> info;
    
    private Long tenantId;
    
    private List<String> scopes;
    
    private LocalDateTime expiresTime;

    
    
    @JsonIgnore
    private Map<String, Object> context;
    
    private Long visitTenantId;

    public void setContext(String key, Object value) {
        if (context == null) {
            context = new HashMap<>();
        }
        context.put(key, value);
    }

    public <T> T getContext(String key, Class<T> type) {
        return MapUtil.get(context, key, type);
    }

}
