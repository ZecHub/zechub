package com.zcashjava.znl.module.system.service.permission;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.role.RolePageReqVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.role.RoleSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleDO;

import java.util.Collection;
import java.util.List;
import java.util.Set;


public interface RoleService {

    
    Long createRole(@Valid RoleSaveReqVO createReqVO, Integer type);

    
    void updateRole(@Valid RoleSaveReqVO updateReqVO);

    
    void deleteRole(Long id);

    
    void deleteRoleList(List<Long> ids);

    
    void updateRoleDataScope(Long id, Integer dataScope, Set<Long> dataScopeDeptIds);

    
    RoleDO getRole(Long id);

    
    RoleDO getRoleFromCache(Long id);

    
    List<RoleDO> getRoleList(Collection<Long> ids);

    
    List<RoleDO> getRoleListFromCache(Collection<Long> ids);

    
    List<RoleDO> getRoleListByStatus(Collection<Integer> statuses);

    
    List<RoleDO> getRoleList();

    
    PageResult<RoleDO> getRolePage(RolePageReqVO reqVO);

    
    boolean hasAnySuperAdmin(Collection<Long> ids);

    
    void validateRoleList(Collection<Long> ids);

}
