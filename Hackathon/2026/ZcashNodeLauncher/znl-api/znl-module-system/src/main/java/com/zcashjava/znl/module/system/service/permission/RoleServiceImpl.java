package com.zcashjava.znl.module.system.service.permission;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.spring.SpringUtil;

import com.google.common.annotations.VisibleForTesting;
import com.mzt.logapi.context.LogRecordContext;
import com.mzt.logapi.service.impl.DiffParseFunction;
import com.mzt.logapi.starter.annotation.LogRecord;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.role.RolePageReqVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.role.RoleSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleDO;
import com.zcashjava.znl.module.system.dal.mysql.permission.RoleMapper;
import com.zcashjava.znl.module.system.dal.redis.RedisKeyConstants;
import com.zcashjava.znl.module.system.enums.permission.DataScopeEnum;
import com.zcashjava.znl.module.system.enums.permission.RoleCodeEnum;
import com.zcashjava.znl.module.system.enums.permission.RoleTypeEnum;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.*;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertMap;
import static com.zcashjava.znl.module.system.enums.ErrorCodeConstants.*;
import static com.zcashjava.znl.module.system.enums.LogRecordConstants.*;


@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    @Resource
    private PermissionService permissionService;

    @Resource
    private RoleMapper roleMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    @LogRecord(type = SYSTEM_ROLE_TYPE, subType = SYSTEM_ROLE_CREATE_SUB_TYPE, bizNo = "{{#role.id}}",
            success = SYSTEM_ROLE_CREATE_SUCCESS)
    public Long createRole(RoleSaveReqVO createReqVO, Integer type) {
        
        validateRoleDuplicate(createReqVO.getName(), createReqVO.getCode(), null);

        
        RoleDO role = BeanUtils.toBean(createReqVO, RoleDO.class);
        role.setType(ObjectUtil.defaultIfNull(type, RoleTypeEnum.CUSTOM.getType()));
        role.setStatus(ObjUtil.defaultIfNull(createReqVO.getStatus(), CommonStatusEnum.ENABLE.getStatus()));
        role.setDataScope(DataScopeEnum.ALL.getScope()); 
        roleMapper.insert(role);

        
        LogRecordContext.putVariable("role", role);
        return role.getId();
    }

    @Override
    @CacheEvict(value = RedisKeyConstants.ROLE, key = "#updateReqVO.id")
    @LogRecord(type = SYSTEM_ROLE_TYPE, subType = SYSTEM_ROLE_UPDATE_SUB_TYPE, bizNo = "{{#updateReqVO.id}}",
            success = SYSTEM_ROLE_UPDATE_SUCCESS)
    public void updateRole(RoleSaveReqVO updateReqVO) {
        
        RoleDO role = validateRoleForUpdate(updateReqVO.getId());
        
        validateRoleDuplicate(updateReqVO.getName(), updateReqVO.getCode(), updateReqVO.getId());

        
        RoleDO updateObj = BeanUtils.toBean(updateReqVO, RoleDO.class);
        roleMapper.updateById(updateObj);

        
        LogRecordContext.putVariable(DiffParseFunction.OLD_OBJECT, BeanUtils.toBean(role, RoleSaveReqVO.class));
        LogRecordContext.putVariable("role", role);
    }

    @Override
    @CacheEvict(value = RedisKeyConstants.ROLE, key = "#id")
    public void updateRoleDataScope(Long id, Integer dataScope, Set<Long> dataScopeDeptIds) {
        
        validateRoleForUpdate(id);

        
        RoleDO updateObject = new RoleDO();
        updateObject.setId(id);
        updateObject.setDataScope(dataScope);
        updateObject.setDataScopeDeptIds(dataScopeDeptIds);
        roleMapper.updateById(updateObject);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    @CacheEvict(value = RedisKeyConstants.ROLE, key = "#id")
    @LogRecord(type = SYSTEM_ROLE_TYPE, subType = SYSTEM_ROLE_DELETE_SUB_TYPE, bizNo = "{{#id}}",
            success = SYSTEM_ROLE_DELETE_SUCCESS)
    public void deleteRole(Long id) {
        
        RoleDO role = validateRoleForUpdate(id);

        
        roleMapper.deleteById(id);
        
        permissionService.processRoleDeleted(id);

        
        LogRecordContext.putVariable("role", role);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteRoleList(List<Long> ids) {
        
        ids.forEach(this::validateRoleForUpdate);

        
        roleMapper.deleteByIds(ids);
        
        ids.forEach(id -> permissionService.processRoleDeleted(id));
    }

    
    @VisibleForTesting
    void validateRoleDuplicate(String name, String code, Long id) {
        
        if (RoleCodeEnum.isSuperAdmin(code)) {
            throw exception(ROLE_ADMIN_CODE_ERROR, code);
        }
        
        RoleDO role = roleMapper.selectByName(name);
        if (role != null && !role.getId().equals(id)) {
            throw exception(ROLE_NAME_DUPLICATE, name);
        }
        
        if (!StringUtils.hasText(code)) {
            return;
        }
        
        role = roleMapper.selectByCode(code);
        if (role != null && !role.getId().equals(id)) {
            throw exception(ROLE_CODE_DUPLICATE, code);
        }
    }

    
    @VisibleForTesting
    RoleDO validateRoleForUpdate(Long id) {
        RoleDO role = roleMapper.selectById(id);
        if (role == null) {
            throw exception(ROLE_NOT_EXISTS);
        }
        
        if (RoleTypeEnum.SYSTEM.getType().equals(role.getType())) {
            throw exception(ROLE_CAN_NOT_UPDATE_SYSTEM_TYPE_ROLE);
        }
        return role;
    }

    @Override
    public RoleDO getRole(Long id) {
        return roleMapper.selectById(id);
    }

    @Override
    @Cacheable(value = RedisKeyConstants.ROLE, key = "#id",
            unless = "#result == null")
    public RoleDO getRoleFromCache(Long id) {
        return roleMapper.selectById(id);
    }


    @Override
    public List<RoleDO> getRoleListByStatus(Collection<Integer> statuses) {
        return roleMapper.selectListByStatus(statuses);
    }

    @Override
    public List<RoleDO> getRoleList() {
        return roleMapper.selectList();
    }

    @Override
    public List<RoleDO> getRoleList(Collection<Long> ids) {
        if (CollectionUtil.isEmpty(ids)) {
            return Collections.emptyList();
        }
        return roleMapper.selectByIds(ids);
    }

    @Override
    public List<RoleDO> getRoleListFromCache(Collection<Long> ids) {
        if (CollectionUtil.isEmpty(ids)) {
            return Collections.emptyList();
        }
        
        RoleServiceImpl self = getSelf();
        return CollectionUtils.convertList(ids, self::getRoleFromCache);
    }

    @Override
    public PageResult<RoleDO> getRolePage(RolePageReqVO reqVO) {
        return roleMapper.selectPage(reqVO);
    }

    @Override
    public boolean hasAnySuperAdmin(Collection<Long> ids) {
        if (CollectionUtil.isEmpty(ids)) {
            return false;
        }
        RoleServiceImpl self = getSelf();
        return ids.stream().anyMatch(id -> {
            RoleDO role = self.getRoleFromCache(id);
            return role != null && RoleCodeEnum.isSuperAdmin(role.getCode());
        });
    }

    @Override
    public void validateRoleList(Collection<Long> ids) {
        if (CollUtil.isEmpty(ids)) {
            return;
        }
        
        List<RoleDO> roles = roleMapper.selectByIds(ids);
        Map<Long, RoleDO> roleMap = convertMap(roles, RoleDO::getId);
        
        ids.forEach(id -> {
            RoleDO role = roleMap.get(id);
            if (role == null) {
                throw exception(ROLE_NOT_EXISTS);
            }
            if (!CommonStatusEnum.ENABLE.getStatus().equals(role.getStatus())) {
                throw exception(ROLE_IS_DISABLE, role.getName());
            }
        });
    }

    
    private RoleServiceImpl getSelf() {
        return SpringUtil.getBean(getClass());
    }

}
