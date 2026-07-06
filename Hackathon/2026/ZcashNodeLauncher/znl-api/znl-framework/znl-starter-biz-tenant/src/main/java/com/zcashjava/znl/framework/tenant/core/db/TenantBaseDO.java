package com.zcashjava.znl.framework.tenant.core.db;

import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = true)
public abstract class TenantBaseDO extends BaseDO {

    
    private Long tenantId;

}
