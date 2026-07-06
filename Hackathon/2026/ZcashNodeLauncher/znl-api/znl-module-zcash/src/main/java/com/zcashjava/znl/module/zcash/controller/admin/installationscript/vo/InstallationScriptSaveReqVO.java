package com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.*;
import javax.validation.constraints.*;

@Schema(description = "ZNL - Installation script Create/Update Request VO")
@Data
public class InstallationScriptSaveReqVO {

    @Schema(description = "ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    @Schema(description = "Name", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "Name cannot be empty")
    private String name;

    @Schema(description = "url", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "url cannot be empty")
    private String url;

    @Schema(description = "Show Order")
    private Integer sort;

    @Schema(description = "Remarks")
    private String remark;

}