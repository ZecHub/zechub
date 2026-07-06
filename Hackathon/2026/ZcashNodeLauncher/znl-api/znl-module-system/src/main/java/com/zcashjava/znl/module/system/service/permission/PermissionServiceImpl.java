package com.zcashjava.znl.module.system.service.permission;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.extra.spring.SpringUtil;

import com.baomidou.dynamic.datasource.annotation.DSTransactional;
import com.google.common.annotations.VisibleForTesting;
import com.google.common.base.Suppliers;
import com.google.common.collect.Sets;
import com.zcashjava.znl.framework.common.biz.system.permission.dto.DeptDataPermissionRespDTO;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.framework.datapermission.core.annotation.DataPermission;
import com.zcashjava.znl.module.system.dal.dataobject.permission.MenuDO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleDO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleMenuDO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.UserRoleDO;
import com.zcashjava.znl.module.system.dal.mysql.permission.RoleMenuMapper;
import com.zcashjava.znl.module.system.dal.mysql.permission.UserRoleMapper;
import com.zcashjava.znl.module.system.dal.redis.RedisKeyConstants;
import com.zcashjava.znl.module.system.enums.permission.DataScopeEnum;
import com.zcashjava.znl.module.system.service.dept.DeptService;
import com.zcashjava.znl.module.system.service.user.AdminUserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertSet;
import static com.zcashjava.znl.framework.common.util.json.JsonUtils.toJsonString;

import java.util.*;
import java.util.function.Supplier;


@Service
@Slf4j
public class PermissionServiceImpl implements PermissionService {

    @Resource
    private RoleMenuMapper roleMenuMapper;
    @Resource
    private UserRoleMapper userRoleMapper;

    @Resource
    private RoleService roleService;
    @Resource
    private MenuService menuService;
    @Resource
    private DeptService deptService;
    @Resource
    private AdminUserService userService;

    @Override
    public boolean hasAnyPermissions(Long userId, String... permissions) {
        
        if (ArrayUtil.isEmpty(permissions)) {
            return true;
        }

        
        List<RoleDO> roles = getEnableUserRoleListByUserIdFromCache(userId);
        if (CollUtil.isEmpty(roles)) {
            return false;
        }

        
        for (String permission : permissions) {
            if (hasAnyPermission(roles, permission)) {
                return true;
            }
        }

        
        return roleService.hasAnySuperAdmin(convertSet(roles, RoleDO::getId));
    }

    
    private boolean hasAnyPermission(List<RoleDO> roles, String permission) {
        List<Long> menuIds = menuService.getMenuIdListByPermissionFromCache(permission);
        
        if (CollUtil.isEmpty(menuIds)) {
            return false;
        }

        
        Set<Long> roleIds = convertSet(roles, RoleDO::getId);
        for (Long menuId : menuIds) {
            
            Set<Long> menuRoleIds = getSelf().getMenuRoleIdListByMenuIdFromCache(menuId);
            
            if (CollUtil.containsAny(menuRoleIds, roleIds)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean hasAnyRoles(Long userId, String... roles) {
        
        if (ArrayUtil.isEmpty(roles)) {
            return true;
        }

        
        List<RoleDO> roleList = getEnableUserRoleListByUserIdFromCache(userId);
        if (CollUtil.isEmpty(roleList)) {
            return false;
        }

        
        Set<String> userRoles = convertSet(roleList, RoleDO::getCode);
        return CollUtil.containsAny(userRoles, Sets.newHashSet(roles));
    }

    

    @Override
    @DSTransactional 
    @Caching(evict = {
            @CacheEvict(value = RedisKeyConstants.MENU_ROLE_ID_LIST,
            allEntries = true),
            @CacheEvict(value = RedisKeyConstants.PERMISSION_MENU_ID_LIST,
            allEntries = true) 
    })
    public void assignRoleMenu(Long roleId, Set<Long> menuIds) {
        
        Set<Long> dbMenuIds = convertSet(roleMenuMapper.selectListByRoleId(roleId), RoleMenuDO::getMenuId);
        
        Set<Long> menuIdList = CollUtil.emptyIfNull(menuIds);
        Collection<Long> createMenuIds = CollUtil.subtract(menuIdList, dbMenuIds);
        Collection<Long> deleteMenuIds = CollUtil.subtract(dbMenuIds, menuIdList);
        
        if (CollUtil.isNotEmpty(createMenuIds)) {
            roleMenuMapper.insertBatch(CollectionUtils.convertList(createMenuIds, menuId -> {
                RoleMenuDO entity = new RoleMenuDO();
                entity.setRoleId(roleId);
                entity.setMenuId(menuId);
                return entity;
            }));
        }
        if (CollUtil.isNotEmpty(deleteMenuIds)) {
            roleMenuMapper.deleteListByRoleIdAndMenuIds(roleId, deleteMenuIds);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    @Caching(evict = {
            @CacheEvict(value = RedisKeyConstants.MENU_ROLE_ID_LIST,
                    allEntries = true), 
            @CacheEvict(value = RedisKeyConstants.USER_ROLE_ID_LIST,
                    allEntries = true) 
    })
    public void processRoleDeleted(Long roleId) {
        
        userRoleMapper.deleteListByRoleId(roleId);
        
        roleMenuMapper.deleteListByRoleId(roleId);
    }

    @Override
    @CacheEvict(value = RedisKeyConstants.MENU_ROLE_ID_LIST, key = "#menuId")
    public void processMenuDeleted(Long menuId) {
        roleMenuMapper.deleteListByMenuId(menuId);
    }

    @Override
    public Set<Long> getRoleMenuListByRoleId(Collection<Long> roleIds) {
        if (CollUtil.isEmpty(roleIds)) {
            return Collections.emptySet();
        }

        
        if (roleService.hasAnySuperAdmin(roleIds)) {
            return convertSet(menuService.getMenuList(), MenuDO::getId);
        }
        
        return convertSet(roleMenuMapper.selectListByRoleId(roleIds), RoleMenuDO::getMenuId);
    }

    @Override
    @Cacheable(value = RedisKeyConstants.MENU_ROLE_ID_LIST, key = "#menuId")
    public Set<Long> getMenuRoleIdListByMenuIdFromCache(Long menuId) {
        return convertSet(roleMenuMapper.selectListByMenuId(menuId), RoleMenuDO::getRoleId);
    }

    

    @Override
    @DSTransactional 
    @CacheEvict(value = RedisKeyConstants.USER_ROLE_ID_LIST, key = "#userId")
    public void assignUserRole(Long userId, Set<Long> roleIds) {
        
        Set<Long> dbRoleIds = convertSet(userRoleMapper.selectListByUserId(userId),
                UserRoleDO::getRoleId);
        
        Set<Long> roleIdList = CollUtil.emptyIfNull(roleIds);
        Collection<Long> createRoleIds = CollUtil.subtract(roleIdList, dbRoleIds);
        Collection<Long> deleteMenuIds = CollUtil.subtract(dbRoleIds, roleIdList);
        
        if (!CollectionUtil.isEmpty(createRoleIds)) {
            userRoleMapper.insertBatch(CollectionUtils.convertList(createRoleIds, roleId -> {
                UserRoleDO entity = new UserRoleDO();
                entity.setUserId(userId);
                entity.setRoleId(roleId);
                return entity;
            }));
        }
        if (!CollectionUtil.isEmpty(deleteMenuIds)) {
            userRoleMapper.deleteListByUserIdAndRoleIdIds(userId, deleteMenuIds);
        }
    }

    @Override
    @CacheEvict(value = RedisKeyConstants.USER_ROLE_ID_LIST, key = "#userId")
    public void processUserDeleted(Long userId) {
        userRoleMapper.deleteListByUserId(userId);
    }

    @Override
    public Set<Long> getUserRoleIdListByUserId(Long userId) {
        return convertSet(userRoleMapper.selectListByUserId(userId), UserRoleDO::getRoleId);
    }

    @Override
    @Cacheable(value = RedisKeyConstants.USER_ROLE_ID_LIST, key = "#userId")
    public Set<Long> getUserRoleIdListByUserIdFromCache(Long userId) {
        return getUserRoleIdListByUserId(userId);
    }

    @Override
    public Set<Long> getUserRoleIdListByRoleId(Collection<Long> roleIds) {
        return convertSet(userRoleMapper.selectListByRoleIds(roleIds), UserRoleDO::getUserId);
    }

    
    @VisibleForTesting
    List<RoleDO> getEnableUserRoleListByUserIdFromCache(Long userId) {
        
        Set<Long> roleIds = getSelf().getUserRoleIdListByUserIdFromCache(userId);
        
        List<RoleDO> roles = roleService.getRoleListFromCache(roleIds);
        roles.removeIf(role -> !CommonStatusEnum.ENABLE.getStatus().equals(role.getStatus()));
        return roles;
    }

    

    @Override
    public void assignRoleDataScope(Long roleId, Integer dataScope, Set<Long> dataScopeDeptIds) {
        roleService.updateRoleDataScope(roleId, dataScope, dataScopeDeptIds);
    }

    @Override
    @DataPermission(enable = false) 
    public DeptDataPermissionRespDTO getDeptDataPermission(Long userId) {
        
        List<RoleDO> roles = getEnableUserRoleListByUserIdFromCache(userId);

        
        DeptDataPermissionRespDTO result = new DeptDataPermissionRespDTO();
        if (CollUtil.isEmpty(roles)) {
            result.setSelf(true);
            return result;
        }

        
        Supplier<Long> userDeptId = Suppliers.memoize(() -> userService.getUser(userId).getDeptId());
        
        for (RoleDO role : roles) {
            
            if (role.getDataScope() == null) {
                continue;
            }
            
            if (Objects.equals(role.getDataScope(), DataScopeEnum.ALL.getScope())) {
                result.setAll(true);
                continue;
            }
            
            if (Objects.equals(role.getDataScope(), DataScopeEnum.DEPT_CUSTOM.getScope())) {
                CollUtil.addAll(result.getDeptIds(), role.getDataScopeDeptIds());
                
                
                CollUtil.addAll(result.getDeptIds(), userDeptId.get());
                continue;
            }
            
            if (Objects.equals(role.getDataScope(), DataScopeEnum.DEPT_ONLY.getScope())) {
                CollectionUtils.addIfNotNull(result.getDeptIds(), userDeptId.get());
                continue;
            }
            
            if (Objects.equals(role.getDataScope(), DataScopeEnum.DEPT_AND_CHILD.getScope())) {
                CollUtil.addAll(result.getDeptIds(), deptService.getChildDeptIdListFromCache(userDeptId.get()));
                
                CollUtil.addAll(result.getDeptIds(), userDeptId.get());
                continue;
            }
            
            if (Objects.equals(role.getDataScope(), DataScopeEnum.SELF.getScope())) {
                result.setSelf(true);
                continue;
            }
            
            log.error("[GetDeptDataPermission] [LoginUser({}) roll ({}) cannot handle]", userId, toJsonString(result));
        }
        return result;
    }

    
    private PermissionServiceImpl getSelf() {
        return SpringUtil.getBean(getClass());
    }

}
