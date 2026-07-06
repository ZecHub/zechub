package com.zcashjava.znl.framework.common.biz.system.tenant;

import java.util.List;


public interface TenantCommonApi {

    
    List<Long> getTenantIdList();

    
    void validateTenant(Long id);

}
