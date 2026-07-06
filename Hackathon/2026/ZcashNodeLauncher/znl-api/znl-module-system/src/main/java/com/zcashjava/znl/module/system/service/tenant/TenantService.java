package com.zcashjava.znl.module.system.service.tenant;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.tenant.core.context.TenantContextHolder;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantDO;
import com.zcashjava.znl.module.system.service.tenant.handler.TenantInfoHandler;
import com.zcashjava.znl.module.system.service.tenant.handler.TenantMenuHandler;

import java.util.List;
import java.util.Set;


public interface TenantService {

    
    Long createTenant(@Valid TenantSaveReqVO createReqVO);

    
    void updateTenant(@Valid TenantSaveReqVO updateReqVO);

    
    void updateTenantRoleMenu(Long tenantId, Set<Long> menuIds);

    
    void deleteTenant(Long id);

    
    void deleteTenantList(List<Long> ids);

    
    TenantDO getTenant(Long id);

    
    PageResult<TenantDO> getTenantPage(TenantPageReqVO pageReqVO);

    
    TenantDO getTenantByName(String name);

    
    TenantDO getTenantByWebsite(String website);

    
    Long getTenantCountByPackageId(Long packageId);

    
    List<TenantDO> getTenantListByPackageId(Long packageId);

    
    List<TenantDO> getTenantListByStatus(Integer status);

    
    void handleTenantInfo(TenantInfoHandler handler);

    
    void handleTenantMenu(TenantMenuHandler handler);

    
    List<Long> getTenantIdList();

    
    void validTenant(Long id);

}
