package com.zcashjava.znl.module.system.controller.admin.permission.vo.permission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.validation.InEnum;
import com.zcashjava.znl.module.system.enums.permission.DataScopeEnum;

import java.util.Collections;
import java.util.Set;

@Schema(description = "Manage Backstage - Give Role Data PermissionsRequest VO")
@Data
public class PermissionAssignRoleDataScopeReqVO {

    @Schema(description = "Role Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "roleId cannot be empty")
    private Long roleId;

    @Schema(description = "Data range, see DataScopeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "Data range cannot be empty")
    @InEnum(value = DataScopeEnum.class, message = "Data range must be {value}")
    private Integer dataScope;

    @Schema(description = "sector numbering list, the field is required only if the range type is DEPT_CUSTOM", example = "1,3,5")
    private Set<Long> dataScopeDeptIds = Collections.emptySet(); 

}
