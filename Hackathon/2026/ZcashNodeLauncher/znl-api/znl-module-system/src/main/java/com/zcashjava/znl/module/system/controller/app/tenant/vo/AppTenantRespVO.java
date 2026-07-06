package com.zcashjava.znl.module.system.controller.app.tenant.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "User App - Tenant Response VO")
@Data
public class AppTenantRespVO {

    @Schema(description = "Tenant Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Tenant name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

}
