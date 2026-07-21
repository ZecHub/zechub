package com.zcashjava.znl.module.infra.controller.admin.file.vo.config;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Map;

@Schema(description = "Manage Backstage - File Configuration Create/Modify Request VO")
@Data
public class FileConfigSaveReqVO {

    @Schema(description = "Numbering", example = "1")
    private Long id;

    @Schema(description = "Configure Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "S3 - Aliun")
    @NotNull(message = "Cannot initialise Evolution's mail component.")
    private String name;

    @Schema(description = "Memory, see FileStorageEnum enumerates", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "Memory cannot be empty")
    private Integer storage;

    @Schema(description = "Storage configuration, configuration is a dynamic parameter, so use Map to receive", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Storage configuration cannot be empty")
    private Map<String, Object> config;

    @Schema(description = "Remarks", example = "It's a note.")
    private String remark;

}
