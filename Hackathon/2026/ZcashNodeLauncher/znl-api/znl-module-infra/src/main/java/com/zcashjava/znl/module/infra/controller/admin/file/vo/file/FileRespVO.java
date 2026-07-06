package com.zcashjava.znl.module.infra.controller.admin.file.vo.file;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Schema(description = "Manage background - File Response VO, do not return content field, too big")
@Data
public class FileRespVO {

    @Schema(description = "Document number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Configure Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "11")
    private Long configId;

    @Schema(description = "File Path", requiredMode = Schema.RequiredMode.REQUIRED)
    private String path;

    @Schema(description = "Original File Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "File URL", requiredMode = Schema.RequiredMode.REQUIRED)
    private String url;

    @Schema(description = "File MIME Type", example = "application/octet-stream")
    private String type;

    @Schema(description = "File Size", example = "2048", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer size;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
