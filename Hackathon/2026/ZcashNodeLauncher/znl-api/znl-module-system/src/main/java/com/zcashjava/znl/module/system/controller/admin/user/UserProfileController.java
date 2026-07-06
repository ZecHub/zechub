package com.zcashjava.znl.module.system.controller.admin.user;

import cn.hutool.core.collection.CollUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.datapermission.core.annotation.DataPermission;
import com.zcashjava.znl.module.system.controller.admin.user.vo.profile.UserProfileRespVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.profile.UserProfileUpdatePasswordReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.profile.UserProfileUpdateReqVO;
import com.zcashjava.znl.module.system.convert.user.UserConvert;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.PostDO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleDO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;
import com.zcashjava.znl.module.system.service.dept.DeptService;
import com.zcashjava.znl.module.system.service.dept.PostService;
import com.zcashjava.znl.module.system.service.permission.PermissionService;
import com.zcashjava.znl.module.system.service.permission.RoleService;
import com.zcashjava.znl.module.system.service.user.AdminUserService;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;
import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.getLoginUserId;

@Tag(name = "Manage backstage - User Personal Centre")
@RestController
@RequestMapping("/system/user/profile")
@Validated
@Slf4j
public class UserProfileController {

    @Resource
    private AdminUserService userService;
    @Resource
    private DeptService deptService;
    @Resource
    private PostService postService;
    @Resource
    private PermissionService permissionService;
    @Resource
    private RoleService roleService;

    @GetMapping("/get")
    @Operation(summary = "Get login user information")
    @DataPermission(enable = false) 
    public CommonResult<UserProfileRespVO> getUserProfile() {
        
        AdminUserDO user = userService.getUser(getLoginUserId());
        
        List<RoleDO> userRoles = roleService.getRoleListFromCache(permissionService.getUserRoleIdListByUserId(user.getId()));
        
        DeptDO dept = user.getDeptId() != null ? deptService.getDept(user.getDeptId()) : null;
        
        List<PostDO> posts = CollUtil.isNotEmpty(user.getPostIds()) ? postService.getPostList(user.getPostIds()) : null;
        return success(UserConvert.INSTANCE.convert(user, userRoles, dept, posts));
    }

    @PutMapping("/update")
    @Operation(summary = "Modify User Personal Information")
    public CommonResult<Boolean> updateUserProfile(@Valid @RequestBody UserProfileUpdateReqVO reqVO) {
        userService.updateUserProfile(getLoginUserId(), reqVO);
        return success(true);
    }

    @PutMapping("/update-password")
    @Operation(summary = "Modify User Personal Password")
    public CommonResult<Boolean> updateUserProfilePassword(@Valid @RequestBody UserProfileUpdatePasswordReqVO reqVO) {
        userService.updateUserPassword(getLoginUserId(), reqVO);
        return success(true);
    }

}
