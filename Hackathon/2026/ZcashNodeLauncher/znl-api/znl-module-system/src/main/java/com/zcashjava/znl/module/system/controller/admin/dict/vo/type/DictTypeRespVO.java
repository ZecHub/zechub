package com.zcashjava.znl.module.system.controller.admin.dict.vo.type;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - Dictionary Type Information")
@Data
@ExcelIgnoreUnannotated
public class DictTypeRespVO {

    @Schema(description = "Dictionary Type Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Dictionary Master Keys")
    private Long id;

    @Schema(description = "Dictionary Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Gender")
    @ExcelProperty("Dictionary Name")
    private String name;

    @Schema(description = "Dictionary Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "sys_common_sex")
    @ExcelProperty("Dictionary Type")
    private String type;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Status", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.COMMON_STATUS)
    private Integer status;

    @Schema(description = "Remarks", example = "Happy note.")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime createTime;

}
