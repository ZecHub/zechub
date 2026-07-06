package com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Schema(description = "Manage Backstage - Tenant Suite Streamline Response VO")
@Data
public class TenantPackageSimpleRespVO {

    @Schema(description = "Package Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "The package number can't be empty.")
    private Long id;

    @Schema(description = "Package name", requiredMode = Schema.RequiredMode.REQUIRED, example = "VIP")
    @NotNull(message = "The package can't be empty.")
    private String name;

}
