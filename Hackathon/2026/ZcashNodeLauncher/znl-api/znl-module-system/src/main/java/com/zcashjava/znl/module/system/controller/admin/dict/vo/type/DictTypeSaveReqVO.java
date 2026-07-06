package com.zcashjava.znl.module.system.controller.admin.dict.vo.type;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Schema(description = "Manage Backstage - Dictionary Type Create/Modify Request VO")
@Data
public class DictTypeSaveReqVO {

    @Schema(description = "Dictionary Type Numbering", example = "1024")
    private Long id;

    @Schema(description = "Dictionary Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Gender")
    @NotBlank(message = "Dictionary name cannot be empty")
    @Size(max = 100, message = "Dictionary type name may not exceed 100 characters")
    private String name;

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "sys_common_sex")
    @NotNull(message = "Dictionary type cannot be empty")
    @Size(max = 100, message = "Dictionary type type not to exceed 100 characters")
    private String type;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    private Integer status;

    @Schema(description = "Remarks", example = "Happy note.")
    private String remark;

}
