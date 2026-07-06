package com.zcashjava.znl.module.infra.controller.app.file.vo;

import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;

@Schema(description = "User App - Upload File")
@Data
public class AppFileUploadReqVO {

    @Schema(description = "Annex to the document", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Can not append message to mh folder: %s: %s")
    private MultipartFile file;

    @Schema(description = "File Directory", example = "XXX/YYY")
    private String directory;

    @AssertTrue(message = "File directory is incorrect")
    @JsonIgnore
    public boolean isDirectoryValid() {
        return !StrUtil.containsAny(directory, "..", "/", "\\");
    }

}
