package com.zcashjava.znl.module.system.api.user;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.module.system.api.user.dto.AdminUserRespDTO;


public interface AdminUserApi {

    
    AdminUserRespDTO getUser(Long id);

    
    List<AdminUserRespDTO> getUserListBySubordinate(Long id);

    
    List<AdminUserRespDTO> getUserList(Collection<Long> ids);

    
    List<AdminUserRespDTO> getUserListByDeptIds(Collection<Long> deptIds);

    
    List<AdminUserRespDTO> getUserListByPostIds(Collection<Long> postIds);

    
    default Map<Long, AdminUserRespDTO> getUserMap(Collection<Long> ids) {
        List<AdminUserRespDTO> users = getUserList(ids);
        return CollectionUtils.convertMap(users, AdminUserRespDTO::getId);
    }

    
    default void validateUser(Long id) {
        validateUserList(Collections.singleton(id));
    }

    
    void validateUserList(Collection<Long> ids);

}
