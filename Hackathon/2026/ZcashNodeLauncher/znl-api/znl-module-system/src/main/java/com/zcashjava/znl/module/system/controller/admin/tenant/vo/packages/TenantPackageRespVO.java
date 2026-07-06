package com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Schema(description = "Manage Backstage - Tenant Suite")
@Data
public class TenantPackageRespVO {

    @Schema(description = "Package Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Package name", requiredMode = Schema.RequiredMode.REQUIRED, example = "VIP")
    private String name;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Integer status;

    @Schema(description = "Remarks", example = "Okay.")
    private String remark;

    @Schema(description = "menuIds cannot be empty", requiredMode = Schema.RequiredMode.REQUIRED)
    private Set<Long> menuIds;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
