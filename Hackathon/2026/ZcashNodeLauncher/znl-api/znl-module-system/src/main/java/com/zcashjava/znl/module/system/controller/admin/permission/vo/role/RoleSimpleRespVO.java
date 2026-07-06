package com.zcashjava.znl.module.system.controller.admin.permission.vo.role;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "Manage Backstage - Role Streamlining InformationResponse VO")
@Data
public class RoleSimpleRespVO {

    @Schema(description = "Role Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Role Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

}
