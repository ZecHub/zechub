package com.zcashjava.znl.module.system.service.user;

import cn.hutool.core.collection.CollUtil;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.module.system.controller.admin.auth.vo.AuthRegisterReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.profile.UserProfileUpdatePasswordReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.profile.UserProfileUpdateReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.user.UserImportExcelVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.user.UserImportRespVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.user.UserPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.user.UserSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public interface AdminUserService {

    
    Long createUser(@Valid UserSaveReqVO createReqVO);

    
    Long registerUser(@Valid AuthRegisterReqVO registerReqVO);

    
    void updateUser(@Valid UserSaveReqVO updateReqVO);

    
    void updateUserLogin(Long id, String loginIp);

    
    void updateUserProfile(Long id, @Valid UserProfileUpdateReqVO reqVO);

    
    void updateUserPassword(Long id, @Valid UserProfileUpdatePasswordReqVO reqVO);

    
    void updateUserPassword(Long id, String password);

    
    void updateUserStatus(Long id, Integer status);

    
    void deleteUser(Long id);

    
    void deleteUserList(List<Long> ids);

    
    AdminUserDO getUserByUsername(String username);

    
    AdminUserDO getUserByMobile(String mobile);

    
    PageResult<AdminUserDO> getUserPage(UserPageReqVO reqVO);

    
    AdminUserDO getUser(Long id);

    
    List<AdminUserDO> getUserListByDeptIds(Collection<Long> deptIds);

    
    List<AdminUserDO> getUserListByPostIds(Collection<Long> postIds);

    
    List<AdminUserDO> getUserList(Collection<Long> ids);

    
    void validateUserList(Collection<Long> ids);

    
    default Map<Long, AdminUserDO> getUserMap(Collection<Long> ids) {
        if (CollUtil.isEmpty(ids)) {
            return new HashMap<>();
        }
        return CollectionUtils.convertMap(getUserList(ids), AdminUserDO::getId);
    }

    
    List<AdminUserDO> getUserListByNickname(String nickname);

    
    UserImportRespVO importUserList(List<UserImportExcelVO> importUsers, boolean isUpdateSupport);

    
    List<AdminUserDO> getUserListByStatus(Integer status);

    
    boolean isPasswordMatch(String rawPassword, String encodedPassword);

}
