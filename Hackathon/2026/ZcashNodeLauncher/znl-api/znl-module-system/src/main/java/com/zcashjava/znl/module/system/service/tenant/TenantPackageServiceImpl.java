package com.zcashjava.znl.module.system.service.tenant;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;

import com.baomidou.dynamic.datasource.annotation.DSTransactional;
import com.google.common.annotations.VisibleForTesting;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages.TenantPackagePageReqVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages.TenantPackageSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantDO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantPackageDO;
import com.zcashjava.znl.module.system.dal.mysql.tenant.TenantPackageMapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.annotation.Resource;
import java.util.List;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.system.enums.ErrorCodeConstants.*;


@Service
@Validated
public class TenantPackageServiceImpl implements TenantPackageService {

    @Resource
    private TenantPackageMapper tenantPackageMapper;

    @Resource
    @Lazy 
    private TenantService tenantService;

    @Override
    public Long createTenantPackage(TenantPackageSaveReqVO createReqVO) {
        
        validateTenantPackageNameUnique(null, createReqVO.getName());
        
        TenantPackageDO tenantPackage = BeanUtils.toBean(createReqVO, TenantPackageDO.class);
        tenantPackageMapper.insert(tenantPackage);
        
        return tenantPackage.getId();
    }

    @Override
    @DSTransactional 
    public void updateTenantPackage(TenantPackageSaveReqVO updateReqVO) {
        
        TenantPackageDO tenantPackage = validateTenantPackageExists(updateReqVO.getId());
        
        validateTenantPackageNameUnique(updateReqVO.getId(), updateReqVO.getName());
        
        TenantPackageDO updateObj = BeanUtils.toBean(updateReqVO, TenantPackageDO.class);
        tenantPackageMapper.updateById(updateObj);
        
        if (!CollUtil.isEqualList(tenantPackage.getMenuIds(), updateReqVO.getMenuIds())) {
            List<TenantDO> tenants = tenantService.getTenantListByPackageId(tenantPackage.getId());
            tenants.forEach(tenant -> tenantService.updateTenantRoleMenu(tenant.getId(), updateReqVO.getMenuIds()));
        }
    }

    @Override
    public void deleteTenantPackage(Long id) {
        
        validateTenantPackageExists(id);
        
        validateTenantUsed(id);
        
        tenantPackageMapper.deleteById(id);
    }

    @Override
    public void deleteTenantPackageList(List<Long> ids) {
        
        for (Long id : ids) {
            if (tenantService.getTenantCountByPackageId(id) > 0) {
                throw exception(TENANT_PACKAGE_USED);
            }
        }

        
        tenantPackageMapper.deleteByIds(ids);
    }

    private TenantPackageDO validateTenantPackageExists(Long id) {
        TenantPackageDO tenantPackage = tenantPackageMapper.selectById(id);
        if (tenantPackage == null) {
            throw exception(TENANT_PACKAGE_NOT_EXISTS);
        }
        return tenantPackage;
    }

    private void validateTenantUsed(Long id) {
        if (tenantService.getTenantCountByPackageId(id) > 0) {
            throw exception(TENANT_PACKAGE_USED);
        }
    }

    @Override
    public TenantPackageDO getTenantPackage(Long id) {
        return tenantPackageMapper.selectById(id);
    }

    @Override
    public PageResult<TenantPackageDO> getTenantPackagePage(TenantPackagePageReqVO pageReqVO) {
        return tenantPackageMapper.selectPage(pageReqVO);
    }

    @Override
    public TenantPackageDO validTenantPackage(Long id) {
        TenantPackageDO tenantPackage = tenantPackageMapper.selectById(id);
        if (tenantPackage == null) {
            throw exception(TENANT_PACKAGE_NOT_EXISTS);
        }
        if (tenantPackage.getStatus().equals(CommonStatusEnum.DISABLE.getStatus())) {
            throw exception(TENANT_PACKAGE_DISABLE, tenantPackage.getName());
        }
        return tenantPackage;
    }

    @Override
    public List<TenantPackageDO> getTenantPackageListByStatus(Integer status) {
        return tenantPackageMapper.selectListByStatus(status);
    }


    @VisibleForTesting
    void validateTenantPackageNameUnique(Long id, String name) {
        if (StrUtil.isBlank(name)) {
            return;
        }
        TenantPackageDO tenantPackage = tenantPackageMapper.selectByName(name);
        if (tenantPackage == null) {
            return;
        }
        
        if (id == null) {
            throw exception(TENANT_PACKAGE_NAME_DUPLICATE);
        }
        if (!tenantPackage.getId().equals(id)) {
            throw exception(TENANT_PACKAGE_NAME_DUPLICATE);
        }
    }

}
