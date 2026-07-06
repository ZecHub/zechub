package com.zcashjava.znl.module.system.service.tenant;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages.TenantPackagePageReqVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages.TenantPackageSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantPackageDO;

import java.util.List;


public interface TenantPackageService {

    
    Long createTenantPackage(@Valid TenantPackageSaveReqVO createReqVO);

    
    void updateTenantPackage(@Valid TenantPackageSaveReqVO updateReqVO);

    
    void deleteTenantPackage(Long id);

    
    void deleteTenantPackageList(List<Long> ids);

    
    TenantPackageDO getTenantPackage(Long id);

    
    PageResult<TenantPackageDO> getTenantPackagePage(TenantPackagePageReqVO pageReqVO);

    
    TenantPackageDO validTenantPackage(Long id);

    
    List<TenantPackageDO> getTenantPackageListByStatus(Integer status);

}
