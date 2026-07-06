package com.zcashjava.znl.module.infra.controller.admin.file.vo.file;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Schema(description = "Manage Backstage - File Creation Request VO")
@Data
public class FileCreateReqVO {

    @NotNull(message = "File profile number cannot be empty")
    @Schema(description = "File Profile Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "11")
    private Long configId;

    @NotNull(message = "File path cannot be empty")
    @Schema(description = "File Path", requiredMode = Schema.RequiredMode.REQUIRED)
    private String path;

    @NotNull(message = "Original filename cannot be empty")
    @Schema(description = "Original File Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @NotNull(message = "File URL cannot be empty")
    @Schema(description = "File URL", requiredMode = Schema.RequiredMode.REQUIRED)
    private String url;

    @Schema(description = "File mimetype", example = "application/octet-stream")
    private String type;

    @Schema(description = "File Size", example = "2048", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer size;

}
