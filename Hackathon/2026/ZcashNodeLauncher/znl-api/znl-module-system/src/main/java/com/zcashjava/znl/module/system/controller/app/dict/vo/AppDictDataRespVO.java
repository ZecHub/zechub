package com.zcashjava.znl.module.system.controller.app.dict.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Schema(description = "User App - Dictionary Data Information")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppDictDataRespVO {

    @Schema(description = "Dictionary Data Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Dictionary Tags", requiredMode = Schema.RequiredMode.REQUIRED)
    private String label;

    @Schema(description = "Dictionary Values", requiredMode = Schema.RequiredMode.REQUIRED)
    private String value;

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "sys_common_sex")
    private String dictType;

}
