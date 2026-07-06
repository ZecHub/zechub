package com.zcashjava.znl.module.infra.controller.admin.config.vo;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.infra.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - Parameter Configuration InformationResponse VO")
@Data
@ExcelIgnoreUnannotated
public class ConfigRespVO {

    @Schema(description = "Parameter Configuration Serial Numbers", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Parameter Configuration Serial Numbers")
    private Long id;

    @Schema(description = "Parameter Classification", requiredMode = Schema.RequiredMode.REQUIRED, example = "biz")
    @ExcelProperty("Parameter Classification")
    private String category;

    @Schema(description = "Parameter Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Database Name")
    @ExcelProperty("Parameter Name")
    private String name;

    @Schema(description = "Parameter Key Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "yunai.db.username")
    @ExcelProperty("Parameter Key Name")
    private String key;

    @Schema(description = "Parameter Keys", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Parameter Keys")
    private String value;

    @Schema(description = "Parameter type, see SysConfigTypeEnum", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Parameter Type", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.CONFIG_TYPE)
    private Integer type;

    @Schema(description = "Visible", requiredMode = Schema.RequiredMode.REQUIRED, example = "true")
    @ExcelProperty(value = "Visible", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.BOOLEAN_STRING)
    private Boolean visible;

    @Schema(description = "Remarks", example = "It's nice to note!")
    @ExcelProperty("Remarks")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    @ExcelProperty("Created")
    private LocalDateTime createTime;

}
