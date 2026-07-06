package com.zcashjava.znl.module.infra.controller.admin.file.vo.file;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Manage background - file pre-signature address")
@Data
public class FilePresignedUrlRespVO {

    @Schema(description = "Configure Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "11")
    private Long configId;

    @Schema(description = "File Upload URL", requiredMode = Schema.RequiredMode.REQUIRED)
    private String uploadUrl;

    
    @Schema(description = "File Access URL", requiredMode = Schema.RequiredMode.REQUIRED)
    private String url;

    
    @Schema(description = "File Path", requiredMode = Schema.RequiredMode.REQUIRED, example = "xxx.png")
    private String path;

}
