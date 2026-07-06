package com.zcashjava.znl.module.system.controller.admin.dict.vo.type;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "Manage Backstage - Dictionary Type Simplified Information")
@Data
public class DictTypeSimpleRespVO {

    @Schema(description = "Dictionary Type Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Dictionary Type Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "sys_common_sex")
    private String type;

}
