package com.zcashjava.znl.module.system.dal.dataobject.permission;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.tenant.core.db.TenantBaseDO;
import com.zcashjava.znl.module.system.enums.permission.DataScopeEnum;
import com.zcashjava.znl.module.system.enums.permission.RoleTypeEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;


@TableName(value = "system_role", autoResultMap = true)
@KeySequence("system_role_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class RoleDO extends TenantBaseDO {

    
    @TableId
    private Long id;
    
    private String name;
    
    private String code;
    
    private Integer sort;
    
    private Integer status;
    
    private Integer type;
    
    private String remark;

    
    private Integer dataScope;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Set<Long> dataScopeDeptIds;

}
