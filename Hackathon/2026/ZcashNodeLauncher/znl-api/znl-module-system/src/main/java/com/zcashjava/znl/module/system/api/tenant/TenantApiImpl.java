package com.zcashjava.znl.module.system.api.tenant;

import org.springframework.stereotype.Service;

import com.zcashjava.znl.framework.common.biz.system.tenant.TenantCommonApi;
import com.zcashjava.znl.module.system.service.tenant.TenantService;

import javax.annotation.Resource;
import java.util.List;


@Service
public class TenantApiImpl implements TenantCommonApi {

    @Resource
    private TenantService tenantService;

    @Override
    public List<Long> getTenantIdList() {
        return tenantService.getTenantIdList();
    }

    @Override
    public void validateTenant(Long id) {
        tenantService.validTenant(id);
    }

}
