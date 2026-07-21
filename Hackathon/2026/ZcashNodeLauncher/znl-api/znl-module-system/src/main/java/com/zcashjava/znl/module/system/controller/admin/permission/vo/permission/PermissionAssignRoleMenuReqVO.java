package com.zcashjava.znl.module.system.controller.admin.permission.vo.permission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.Set;

@Schema(description = "Manage Backstage - Give Role MenuRequest VO")
@Data
public class PermissionAssignRoleMenuReqVO {

    @Schema(description = "Role Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "roleId cannot be empty")
    private Long roleId;

    @Schema(description = "Menu Numbering List", example = "1,3,5")
    private Set<Long> menuIds = Collections.emptySet(); 

}
