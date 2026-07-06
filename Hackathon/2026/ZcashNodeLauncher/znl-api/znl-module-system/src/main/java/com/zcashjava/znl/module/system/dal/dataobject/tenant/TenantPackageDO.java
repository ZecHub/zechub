package com.zcashjava.znl.module.system.dal.dataobject.tenant;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;

import lombok.*;

import java.util.Set;


@TableName(value = "system_tenant_package", autoResultMap = true)
@KeySequence("system_tenant_package_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TenantIgnore
public class TenantPackageDO extends BaseDO {

    
    private Long id;
    
    private String name;
    
    private Integer status;
    
    private String remark;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Set<Long> menuIds;

}
