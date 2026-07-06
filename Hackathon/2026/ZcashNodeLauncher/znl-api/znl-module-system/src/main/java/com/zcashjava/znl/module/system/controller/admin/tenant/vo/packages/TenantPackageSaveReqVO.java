package com.zcashjava.znl.module.system.controller.admin.tenant.vo.packages;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;

import java.util.Set;

@Schema(description = "Manage Backstage - Tenant Suite Create/Modify Request VO")
@Data
public class TenantPackageSaveReqVO {

    @Schema(description = "Package Number", example = "1024")
    private Long id;

    @Schema(description = "Package name", requiredMode = Schema.RequiredMode.REQUIRED, example = "VIP")
    @NotEmpty(message = "The package can't be empty.")
    private String name;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    @InEnum(value = CommonStatusEnum.class, message = "Status must be {value}")
    private Integer status;

    @Schema(description = "Remarks", example = "Okay.")
    private String remark;

    @Schema(description = "menuIds", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "menuIds cannot be empty")
    private Set<Long> menuIds;

}
