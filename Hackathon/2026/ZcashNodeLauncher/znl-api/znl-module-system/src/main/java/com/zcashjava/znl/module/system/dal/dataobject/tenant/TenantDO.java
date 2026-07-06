package com.zcashjava.znl.module.system.dal.dataobject.tenant;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.mybatis.core.type.StringListTypeHandler;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@TableName(value = "system_tenant", autoResultMap = true)
@KeySequence("system_tenant_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TenantIgnore
public class TenantDO extends BaseDO {

    
    public static final Long PACKAGE_ID_SYSTEM = 0L;

    
    private Long id;
    
    private String name;
    
    private Long contactUserId;
    
    private String contactName;
    
    private String contactMobile;
    
    private Integer status;
    
    @TableField(typeHandler = StringListTypeHandler.class)
    private List<String> websites;
    
    private Long packageId;
    
    private LocalDateTime expireTime;
    
    private Integer accountCount;

}
