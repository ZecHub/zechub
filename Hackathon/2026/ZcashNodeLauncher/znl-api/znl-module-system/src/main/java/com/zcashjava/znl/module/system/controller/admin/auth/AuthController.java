package com.zcashjava.znl.module.system.controller.admin.auth;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertSet;
import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.getLoginUserId;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.security.config.SecurityProperties;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;
import com.zcashjava.znl.module.system.controller.admin.auth.vo.AuthLoginReqVO;
import com.zcashjava.znl.module.system.controller.admin.auth.vo.AuthLoginRespVO;
import com.zcashjava.znl.module.system.controller.admin.auth.vo.AuthPermissionInfoRespVO;
import com.zcashjava.znl.module.system.controller.admin.auth.vo.AuthRegisterReqVO;
import com.zcashjava.znl.module.system.convert.auth.AuthConvert;
import com.zcashjava.znl.module.system.dal.dataobject.permission.MenuDO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.RoleDO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;
import com.zcashjava.znl.module.system.enums.logger.LoginLogTypeEnum;
import com.zcashjava.znl.module.system.service.auth.AdminAuthService;
import com.zcashjava.znl.module.system.service.permission.MenuService;
import com.zcashjava.znl.module.system.service.permission.PermissionService;
import com.zcashjava.znl.module.system.service.permission.RoleService;
import com.zcashjava.znl.module.system.service.user.AdminUserService;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Manage Backstage - Authenticate")
@RestController
@RequestMapping("/system/auth")
@Validated
@Slf4j
public class AuthController {

    @Resource
    private AdminAuthService authService;
    @Resource
    private AdminUserService userService;
    @Resource
    private RoleService roleService;
    @Resource
    private MenuService menuService;
    @Resource
    private PermissionService permissionService;

    @Resource
    private SecurityProperties securityProperties;

    @PostMapping("/login")
    @PermitAll
    @Operation(summary = "Login using account password")
    public CommonResult<AuthLoginRespVO> login(@RequestBody @Valid AuthLoginReqVO reqVO) {
        return success(authService.login(reqVO));
    }

    @PostMapping("/logout")
    @PermitAll
    @Operation(summary = "Logout System")
    public CommonResult<Boolean> logout(HttpServletRequest request) {
        String token = SecurityFrameworkUtils.obtainAuthorization(request,
                securityProperties.getTokenHeader(), securityProperties.getTokenParameter());
        if (StrUtil.isNotBlank(token)) {
            authService.logout(token, LoginLogTypeEnum.LOGOUT_SELF.getType());
        }
        return success(true);
    }

    @PostMapping("/refresh-token")
    @PermitAll
    @Operation(summary = "Refresh Decoration")
    @Parameter(name = "refreshToken", description = "Refresh Decoration", required = true)
    public CommonResult<AuthLoginRespVO> refreshToken(@RequestParam("refreshToken") String refreshToken) {
        return success(authService.refreshToken(refreshToken));
    }

    @GetMapping("/get-permission-info")
    @Operation(summary = "Get permission information for login users")
    public CommonResult<AuthPermissionInfoRespVO> getPermissionInfo() {
        
        AdminUserDO user = userService.getUser(getLoginUserId());
        if (user == null) {
            return success(null);
        }

        
        Set<Long> roleIds = permissionService.getUserRoleIdListByUserId(getLoginUserId());
        if (CollUtil.isEmpty(roleIds)) {
            return success(AuthConvert.INSTANCE.convert(user, Collections.emptyList(), Collections.emptyList()));
        }
        List<RoleDO> roles = roleService.getRoleList(roleIds);
        roles.removeIf(role -> !CommonStatusEnum.ENABLE.getStatus().equals(role.getStatus())); 

        
        Set<Long> menuIds = permissionService.getRoleMenuListByRoleId(convertSet(roles, RoleDO::getId));
        List<MenuDO> menuList = menuService.getMenuList(menuIds);
        menuList = menuService.filterDisableMenus(menuList);

        
        return success(AuthConvert.INSTANCE.convert(user, roles, menuList));
    }

    @PostMapping("/register")
    @PermitAll
    @Operation(summary = "Registered Users")
    public CommonResult<AuthLoginRespVO> register(@RequestBody @Valid AuthRegisterReqVO registerReqVO) {
        return success(authService.register(registerReqVO));
    }




}
