package com.zcashjava.znl.module.system.controller.admin.permission;

import cn.hutool.core.collection.CollUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.permission.PermissionAssignRoleDataScopeReqVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.permission.PermissionAssignRoleMenuReqVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.permission.PermissionAssignUserRoleReqVO;
import com.zcashjava.znl.module.system.service.permission.PermissionService;
import com.zcashjava.znl.module.system.service.tenant.TenantService;

import javax.annotation.Resource;
import javax.validation.Valid;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.util.Set;


@Tag(name = "Manage Backstage - Permissions")
@RestController
@RequestMapping("/system/permission")
public class PermissionController {

    @Resource
    private PermissionService permissionService;
    @Resource
    private TenantService tenantService;

    @Operation(summary = "Get menu number for role ownership")
    @Parameter(name = "roleId", description = "Role Number", required = true)
    @GetMapping("/list-role-menus")
    @PreAuthorize("@ss.hasPermission('system:permission:assign-role-menu')")
    public CommonResult<Set<Long>> getRoleMenuList(Long roleId) {
        return success(permissionService.getRoleMenuListByRoleId(roleId));
    }

    @PostMapping("/assign-role-menu")
    @Operation(summary = "Role Empowerment Menu")
    @PreAuthorize("@ss.hasPermission('system:permission:assign-role-menu')")
    public CommonResult<Boolean> assignRoleMenu(@Validated @RequestBody PermissionAssignRoleMenuReqVO reqVO) {
        
        tenantService.handleTenantMenu(menuIds -> reqVO.getMenuIds().removeIf(menuId -> !CollUtil.contains(menuIds, menuId)));

        
        permissionService.assignRoleMenu(reqVO.getRoleId(), reqVO.getMenuIds());
        return success(true);
    }

    @PostMapping("/assign-role-data-scope")
    @Operation(summary = "Give role data privileges")
    @PreAuthorize("@ss.hasPermission('system:permission:assign-role-data-scope')")
    public CommonResult<Boolean> assignRoleDataScope(@Valid @RequestBody PermissionAssignRoleDataScopeReqVO reqVO) {
        permissionService.assignRoleDataScope(reqVO.getRoleId(), reqVO.getDataScope(), reqVO.getDataScopeDeptIds());
        return success(true);
    }

    @Operation(summary = "Activate Role Numbering List Owned by Administrator")
    @Parameter(name = "userId", description = "User ID", required = true)
    @GetMapping("/list-user-roles")
    @PreAuthorize("@ss.hasPermission('system:permission:assign-user-role')")
    public CommonResult<Set<Long>> listAdminRoles(@RequestParam("userId") Long userId) {
        return success(permissionService.getUserRoleIdListByUserId(userId));
    }

    @Operation(summary = "Empowering users")
    @PostMapping("/assign-user-role")
    @PreAuthorize("@ss.hasPermission('system:permission:assign-user-role')")
    public CommonResult<Boolean> assignUserRole(@Validated @RequestBody PermissionAssignUserRoleReqVO reqVO) {
        permissionService.assignUserRole(reqVO.getUserId(), reqVO.getRoleIds());
        return success(true);
    }

}
