package com.zcashjava.znl.module.system.service.tenant;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;

import com.baomidou.dynamic.datasource.annotation.DSTransactional;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.framework.common.util.date.DateUtils;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.datapermission.core.annotation.DataPermission;
import com.zcashjava.znl.framework.tenant.config.TenantProperties;
import com.zcashjava.znl.framework.tenant.core.context.TenantContextHolder;
import com.zcashjava.znl.framework.tenant.core.util.TenantUtils;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.role.RoleSaveReqVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantSaveReqVO;
import com.zcashjava.znl.module.system.convert.tenant.TenantConvert;
import com.zcashjava.znl.module.system.dal.dataobject.permission.MenuDO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleDO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantDO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantPackageDO;
import com.zcashjava.znl.module.system.dal.mysql.tenant.TenantMapper;
import com.zcashjava.znl.module.system.enums.permission.RoleCodeEnum;
import com.zcashjava.znl.module.system.enums.permission.RoleTypeEnum;
import com.zcashjava.znl.module.system.service.permission.MenuService;
import com.zcashjava.znl.module.system.service.permission.PermissionService;
import com.zcashjava.znl.module.system.service.permission.RoleService;
import com.zcashjava.znl.module.system.service.tenant.handler.TenantInfoHandler;
import com.zcashjava.znl.module.system.service.tenant.handler.TenantMenuHandler;
import com.zcashjava.znl.module.system.service.user.AdminUserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.system.enums.ErrorCodeConstants.*;
import static java.util.Collections.singleton;


@Service
@Validated
@Slf4j
public class TenantServiceImpl implements TenantService {

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired(required = false) 
    private TenantProperties tenantProperties;

    @Resource
    private TenantMapper tenantMapper;

    @Resource
    private TenantPackageService tenantPackageService;
    @Resource
    @Lazy 
    private AdminUserService userService;
    @Resource
    private RoleService roleService;
    @Resource
    private MenuService menuService;
    @Resource
    private PermissionService permissionService;

    @Override
    public List<Long> getTenantIdList() {
        List<TenantDO> tenants = tenantMapper.selectList();
        return CollectionUtils.convertList(tenants, TenantDO::getId);
    }

    @Override
    public void validTenant(Long id) {
        TenantDO tenant = getTenant(id);
        if (tenant == null) {
            throw exception(TENANT_NOT_EXISTS);
        }
        if (tenant.getStatus().equals(CommonStatusEnum.DISABLE.getStatus())) {
            throw exception(TENANT_DISABLE, tenant.getName());
        }
        if (DateUtils.isExpired(tenant.getExpireTime())) {
            throw exception(TENANT_EXPIRE, tenant.getName());
        }
    }

    @Override
    @DSTransactional 
    @DataPermission(enable = false) 
    public Long createTenant(TenantSaveReqVO createReqVO) {
        
        validTenantNameDuplicate(createReqVO.getName(), null);
        
        validTenantWebsiteDuplicate(createReqVO.getWebsites(), null);
        
        TenantPackageDO tenantPackage = tenantPackageService.validTenantPackage(createReqVO.getPackageId());

        
        TenantDO tenant = BeanUtils.toBean(createReqVO, TenantDO.class);
        tenantMapper.insert(tenant);
        
        TenantUtils.execute(tenant.getId(), () -> {
            
            Long roleId = createRole(tenantPackage);
            
            Long userId = createUser(roleId, createReqVO);
            
            TenantDO tenantDO = new TenantDO();
            tenantDO.setId(tenant.getId());
            tenantDO.setContactUserId(userId);
            tenantMapper.updateById(tenantDO);
        });
        return tenant.getId();
    }

    private Long createUser(Long roleId, TenantSaveReqVO createReqVO) {
        
        Long userId = userService.createUser(TenantConvert.INSTANCE.convert02(createReqVO));
        
        permissionService.assignUserRole(userId, singleton(roleId));
        return userId;
    }

    private Long createRole(TenantPackageDO tenantPackage) {
        
        RoleSaveReqVO reqVO = new RoleSaveReqVO();
        reqVO.setName(RoleCodeEnum.TENANT_ADMIN.getName());
        reqVO.setCode(RoleCodeEnum.TENANT_ADMIN.getCode());
        reqVO.setSort(0);
        reqVO.setRemark("System Auto Generation");
        Long roleId = roleService.createRole(reqVO, RoleTypeEnum.SYSTEM.getType());
        
        permissionService.assignRoleMenu(roleId, tenantPackage.getMenuIds());
        return roleId;
    }

    @Override
    @DSTransactional 
    public void updateTenant(TenantSaveReqVO updateReqVO) {
        
        TenantDO tenant = validateUpdateTenant(updateReqVO.getId());
        
        validTenantNameDuplicate(updateReqVO.getName(), updateReqVO.getId());
        
        validTenantWebsiteDuplicate(updateReqVO.getWebsites(), updateReqVO.getId());
        
        TenantPackageDO tenantPackage = tenantPackageService.validTenantPackage(updateReqVO.getPackageId());

        
        TenantDO updateObj = BeanUtils.toBean(updateReqVO, TenantDO.class);
        tenantMapper.updateById(updateObj);
        
        if (ObjectUtil.notEqual(tenant.getPackageId(), updateReqVO.getPackageId())) {
            updateTenantRoleMenu(tenant.getId(), tenantPackage.getMenuIds());
        }
    }

    private void validTenantNameDuplicate(String name, Long id) {
        TenantDO tenant = tenantMapper.selectByName(name);
        if (tenant == null) {
            return;
        }
        
        if (id == null) {
            throw exception(TENANT_NAME_DUPLICATE, name);
        }
        if (!tenant.getId().equals(id)) {
            throw exception(TENANT_NAME_DUPLICATE, name);
        }
    }

    private void validTenantWebsiteDuplicate(List<String> websites, Long excludeId) {
        if (CollUtil.isEmpty(websites)) {
            return;
        }
        websites.forEach(website -> {
            List<TenantDO> tenants = tenantMapper.selectListByWebsite(website);
            if (excludeId != null) {
                tenants.removeIf(tenant -> tenant.getId().equals(excludeId));
            }
            if (CollUtil.isNotEmpty(tenants)) {
                throw exception(TENANT_WEBSITE_DUPLICATE, website);
            }
        });
    }

    @Override
    @DSTransactional
    public void updateTenantRoleMenu(Long tenantId, Set<Long> menuIds) {
        TenantUtils.execute(tenantId, () -> {
            
            List<RoleDO> roles = roleService.getRoleList();
            roles.forEach(role -> Assert.isTrue(tenantId.equals(role.getTenantId()), "Role ({}/{}) Tenant does not match",
                    role.getId(), role.getTenantId(), tenantId)); 
            
            roles.forEach(role -> {
                
                if (Objects.equals(role.getCode(), RoleCodeEnum.TENANT_ADMIN.getCode())) {
                    permissionService.assignRoleMenu(role.getId(), menuIds);
                    log.info("[updateTenantRole Menu] [The Tenant Administrator ({/}) has been modified to read ({})]", role.getId(), role.getTenantId(), menuIds);
                    return;
                }
                
                Set<Long> roleMenuIds = permissionService.getRoleMenuListByRoleId(role.getId());
                roleMenuIds = CollUtil.intersectionDistinct(roleMenuIds, menuIds);
                permissionService.assignRoleMenu(role.getId(), roleMenuIds);
                log.info("[updateTenant Role Menu] [Role Role ({}) modified to ({})]", role.getId(), role.getTenantId(), roleMenuIds);
            });
        });
    }

    @Override
    public void deleteTenant(Long id) {
        
        validateUpdateTenant(id);
        
        tenantMapper.deleteById(id);
    }

    @Override
    public void deleteTenantList(List<Long> ids) {
        
        ids.forEach(this::validateUpdateTenant);

        
        tenantMapper.deleteByIds(ids);
    }

    private TenantDO validateUpdateTenant(Long id) {
        TenantDO tenant = tenantMapper.selectById(id);
        if (tenant == null) {
            throw exception(TENANT_NOT_EXISTS);
        }
        
        if (isSystemTenant(tenant)) {
            throw exception(TENANT_CAN_NOT_UPDATE_SYSTEM);
        }
        return tenant;
    }

    @Override
    public TenantDO getTenant(Long id) {
        return tenantMapper.selectById(id);
    }

    @Override
    public PageResult<TenantDO> getTenantPage(TenantPageReqVO pageReqVO) {
        return tenantMapper.selectPage(pageReqVO);
    }

    @Override
    public TenantDO getTenantByName(String name) {
        return tenantMapper.selectByName(name);
    }

    @Override
    public TenantDO getTenantByWebsite(String website) {
        List<TenantDO> tenants = tenantMapper.selectListByWebsite(website);
        return CollUtil.getFirst(tenants);
    }

    @Override
    public Long getTenantCountByPackageId(Long packageId) {
        return tenantMapper.selectCountByPackageId(packageId);
    }

    @Override
    public List<TenantDO> getTenantListByPackageId(Long packageId) {
        return tenantMapper.selectListByPackageId(packageId);
    }

    @Override
    public List<TenantDO> getTenantListByStatus(Integer status) {
        return tenantMapper.selectListByStatus(status);
    }

    @Override
    public void handleTenantInfo(TenantInfoHandler handler) {
        
        if (isTenantDisable()) {
            return;
        }
        
        TenantDO tenant = getTenant(TenantContextHolder.getRequiredTenantId());
        
        handler.handle(tenant);
    }

    @Override
    public void handleTenantMenu(TenantMenuHandler handler) {
        
        if (isTenantDisable()) {
            return;
        }
        
        TenantDO tenant = getTenant(TenantContextHolder.getRequiredTenantId());
        Set<Long> menuIds;
        if (isSystemTenant(tenant)) { 
            menuIds = CollectionUtils.convertSet(menuService.getMenuList(), MenuDO::getId);
        } else {
            menuIds = tenantPackageService.getTenantPackage(tenant.getPackageId()).getMenuIds();
        }
        
        handler.handle(menuIds);
    }

    private static boolean isSystemTenant(TenantDO tenant) {
        return Objects.equals(tenant.getPackageId(), TenantDO.PACKAGE_ID_SYSTEM);
    }

    private boolean isTenantDisable() {
        return tenantProperties == null || Boolean.FALSE.equals(tenantProperties.getEnable());
    }

}
