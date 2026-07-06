package com.zcashjava.znl.module.infra.controller.admin.file.vo.config;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;

@Schema(description = "Manage Backstage - File Configuration Response VO")
@Data
public class FileConfigRespVO {

    @Schema(description = "Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Long id;

    @Schema(description = "Configure Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "S3 - Aliun")
    private String name;

    @Schema(description = "Memory, see FileStorageEnum enumerates", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Integer storage;

    @Schema(description = "Whether or not to configure", requiredMode = Schema.RequiredMode.REQUIRED, example = "true")
    private Boolean master;

    @Schema(description = "Storage Configuration", requiredMode = Schema.RequiredMode.REQUIRED)
    private FileClientConfig config;

    @Schema(description = "Remarks", example = "It's a note.")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
