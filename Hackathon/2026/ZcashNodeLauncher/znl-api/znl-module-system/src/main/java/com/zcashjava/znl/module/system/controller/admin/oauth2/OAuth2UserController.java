package com.zcashjava.znl.module.system.controller.admin.oauth2;

import cn.hutool.core.collection.CollUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.user.OAuth2UserInfoRespVO;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.user.OAuth2UserUpdateReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.profile.UserProfileUpdateReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.PostDO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;
import com.zcashjava.znl.module.system.service.dept.DeptService;
import com.zcashjava.znl.module.system.service.dept.PostService;
import com.zcashjava.znl.module.system.service.user.AdminUserService;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;
import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.getLoginUserId;


@Tag(name = "Manage Backstage - OAuth 2.0 User")
@RestController
@RequestMapping("/system/oauth2/user")
@Validated
@Slf4j
public class OAuth2UserController {

    @Resource
    private AdminUserService userService;
    @Resource
    private DeptService deptService;
    @Resource
    private PostService postService;

    @GetMapping("/get")
    @Operation(summary = "Access to basic user information")
    @PreAuthorize("@ss.hasScope('user.read')") 
    public CommonResult<OAuth2UserInfoRespVO> getUserInfo() {
        
        AdminUserDO user = userService.getUser(getLoginUserId());
        OAuth2UserInfoRespVO resp = BeanUtils.toBean(user, OAuth2UserInfoRespVO.class);
        
        if (user.getDeptId() != null) {
            DeptDO dept = deptService.getDept(user.getDeptId());
            resp.setDept(BeanUtils.toBean(dept, OAuth2UserInfoRespVO.Dept.class));
        }
        
        if (CollUtil.isNotEmpty(user.getPostIds())) {
            List<PostDO> posts = postService.getPostList(user.getPostIds());
            resp.setPosts(BeanUtils.toBean(posts, OAuth2UserInfoRespVO.Post.class));
        }
        return success(resp);
    }

    @PutMapping("/update")
    @Operation(summary = "Update user basic information")
    @PreAuthorize("@ss.hasScope('user.write')")
    public CommonResult<Boolean> updateUserInfo(@Valid @RequestBody OAuth2UserUpdateReqVO reqVO) {
        
        
        userService.updateUserProfile(getLoginUserId(), BeanUtils.toBean(reqVO, UserProfileUpdateReqVO.class));
        return success(true);
    }

}
