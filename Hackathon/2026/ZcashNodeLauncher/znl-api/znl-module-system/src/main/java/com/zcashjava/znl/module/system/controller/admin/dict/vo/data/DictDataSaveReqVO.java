package com.zcashjava.znl.module.system.controller.admin.dict.vo.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;

@Schema(description = "Manage Backstage - Write/Modify Dictionary Data")
@Data
public class DictDataSaveReqVO {

    @Schema(description = "Dictionary Data Numbering", example = "1024")
    private Long id;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "Show order cannot be empty")
    private Integer sort;

    @Schema(description = "Dictionary Tags", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Dictionary labels cannot be empty")
    @Size(max = 100, message = "Dictionary labels cannot be longer than 100 characters")
    private String label;

    @Schema(description = "Dictionary Values", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Dictionary keys cannot be empty")
    @Size(max = 100, message = "Dictionary key length cannot exceed 100 characters")
    private String value;

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "sys_common_sex")
    @NotBlank(message = "Dictionary type cannot be empty")
    @Size(max = 100, message = "Dictionary type not to exceed 100 characters")
    private String dictType;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    @InEnum(value = CommonStatusEnum.class, message = "The modified state must be {value}")
    private Integer status;

    @Schema(description = "Colour type, default, prismary, access, info,warning, danger", example = "default")
    private String colorType;

    @Schema(description = "css style", example = "btn-visible")
    private String cssClass;

    @Schema(description = "Remarks", example = "I'm a character.")
    private String remark;

}
