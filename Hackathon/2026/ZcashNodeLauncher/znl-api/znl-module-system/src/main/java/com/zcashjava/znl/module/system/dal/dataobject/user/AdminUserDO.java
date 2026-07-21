package com.zcashjava.znl.module.system.dal.dataobject.user;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.tenant.core.db.TenantBaseDO;
import com.zcashjava.znl.module.system.enums.common.SexEnum;

import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Set;


@TableName(value = "system_users", autoResultMap = true) 
@KeySequence("system_users_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDO extends TenantBaseDO {

    
    @TableId
    private Long id;
    
    private String username;
    
    private String password;
    
    private String nickname;
    
    private String remark;
    
    private Long deptId;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Set<Long> postIds;
    
    private String email;
    
    private String mobile;
    
    private Integer sex;
    
    private String avatar;
    
    private Integer status;
    
    private String loginIp;
    
    private LocalDateTime loginDate;

}
