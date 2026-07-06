package com.zcashjava.znl.module.system.controller.admin.permission.vo.permission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.Set;

@Schema(description = "Manage Backstage - Give User RolesRequest VO")
@Data
public class PermissionAssignUserRoleReqVO {

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "User ID cannot be empty")
    private Long userId;

    @Schema(description = "Role Numbering List", example = "1,3,5")
    private Set<Long> roleIds = Collections.emptySet(); 

}
