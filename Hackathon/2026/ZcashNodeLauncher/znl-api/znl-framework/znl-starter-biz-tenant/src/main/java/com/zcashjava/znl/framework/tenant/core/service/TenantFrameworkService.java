package com.zcashjava.znl.framework.tenant.core.service;

import java.util.List;


public interface TenantFrameworkService {

    
    List<Long> getTenantIds();

    
    void validTenant(Long id);

}
