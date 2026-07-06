package com.zcashjava.znl.module.system.controller.admin.dict.vo.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "Manage Backstage - Data Dictionary Streamline")
@Data
public class DictDataSimpleRespVO {

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "gender")
    private String dictType;

    @Schema(description = "Dictionary Keys", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private String value;

    @Schema(description = "Dictionary Tags", requiredMode = Schema.RequiredMode.REQUIRED, example = "Men")
    private String label;

    @Schema(description = "Colour type, default, prismary, access, info,warning, danger", example = "default")
    private String colorType;

    @Schema(description = "css style", example = "btn-visible")
    private String cssClass;

}
