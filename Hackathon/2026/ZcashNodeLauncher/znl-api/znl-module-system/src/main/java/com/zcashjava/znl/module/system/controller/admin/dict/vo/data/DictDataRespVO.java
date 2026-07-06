package com.zcashjava.znl.module.system.controller.admin.dict.vo.data;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - Dictionary Data Information")
@Data
@ExcelIgnoreUnannotated
public class DictDataRespVO {

    @Schema(description = "Dictionary Data Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Dictionary Encoding")
    private Long id;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Sort Dictionary")
    private Integer sort;

    @Schema(description = "Dictionary Tags", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Dictionary Tags")
    private String label;

    @Schema(description = "Dictionary Values", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Dictionary Keys")
    private String value;

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "sys_common_sex")
    @ExcelProperty("Dictionary Type")
    private String dictType;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Status", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.COMMON_STATUS)
    private Integer status;

    @Schema(description = "Colour type, default, prismary, access, info,warning, danger", example = "default")
    private String colorType;

    @Schema(description = "css style", example = "btn-visible")
    private String cssClass;

    @Schema(description = "Remarks", example = "I'm a character.")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime createTime;

}
