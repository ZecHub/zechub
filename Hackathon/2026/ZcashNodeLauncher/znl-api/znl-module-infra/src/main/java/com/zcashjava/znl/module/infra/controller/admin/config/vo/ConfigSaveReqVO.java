package com.zcashjava.znl.module.infra.controller.admin.config.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Schema(description = "Manage backstage - Parameter Configuration Create/Modify Request VO")
@Data
public class ConfigSaveReqVO {

    @Schema(description = "Parameter Configuration Serial Numbers", example = "1024")
    private Long id;

    @Schema(description = "Parameter Grouping", requiredMode = Schema.RequiredMode.REQUIRED, example = "biz")
    @NotEmpty(message = "Parameter grouping cannot be empty")
    @Size(max = 50, message = "Parameter name cannot exceed 50 characters")
    private String category;

    @Schema(description = "Parameter Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Database Name")
    @NotBlank(message = "Parameter name cannot be empty")
    @Size(max = 100, message = "Parameter name cannot exceed 100 characters")
    private String name;

    @Schema(description = "Parameter Key Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "yunai.db.username")
    @NotBlank(message = "Parameter Key Name Length cannot be empty")
    @Size(max = 100, message = "Parameter Keynames may not be longer than 100 characters")
    private String key;

    @Schema(description = "Parameter Keys", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotBlank(message = "Parameter key cannot be empty")
    @Size(max = 500, message = "Parameter key length cannot exceed 500 characters")
    private String value;

    @Schema(description = "Visible", requiredMode = Schema.RequiredMode.REQUIRED, example = "true")
    @NotNull(message = "visible cannot be empty")
    private Boolean visible;

    @Schema(description = "Remarks", example = "It's nice to note!")
    private String remark;

}
