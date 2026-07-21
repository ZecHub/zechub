package com.zcashjava.znl.module.system.controller.admin.permission.vo.role;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

import java.time.LocalDateTime;
import java.util.Set;

@Schema(description = "Manage Backstage - Role Information")
@Data
@ExcelIgnoreUnannotated
public class RoleRespVO {

    @Schema(description = "Role Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty("Role Serial Number")
    private Long id;

    @Schema(description = "Role Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Administrator")
    @ExcelProperty("Role Name")
    private String name;

    @Schema(description = "Role signs", requiredMode = Schema.RequiredMode.REQUIRED, example = "admin")
    @NotBlank(message = "Role signs can't be empty.")
    @ExcelProperty("Role signs")
    private String code;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Role Sorting")
    private Integer sort;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Role Status", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.COMMON_STATUS)
    private Integer status;

    @Schema(description = "Role type, see RaleTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Integer type;

    @Schema(description = "Remarks", example = "I'm a character.")
    private String remark;

    @Schema(description = "Data range, see DataScopeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Data Range", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.DATA_SCOPE)
    private Integer dataScope;

    @Schema(description = "Data range (specify sector arrays)", example = "1")
    private Set<Long> dataScopeDeptIds;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime createTime;

}
