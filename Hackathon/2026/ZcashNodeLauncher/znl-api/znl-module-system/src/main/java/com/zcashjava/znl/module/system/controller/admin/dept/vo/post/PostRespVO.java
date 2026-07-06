package com.zcashjava.znl.module.system.controller.admin.dept.vo.post;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - Job Information")
@Data
@ExcelIgnoreUnannotated
public class PostRespVO {

    @Schema(description = "Post number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Post number")
    private Long id;

    @Schema(description = "Name of post", requiredMode = Schema.RequiredMode.REQUIRED, example = "Little potatoes.")
    @ExcelProperty("Name of post")
    private String name;

    @Schema(description = "Job Coding", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Job Coding")
    private String code;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Job Sorting")
    private Integer sort;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Status", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.COMMON_STATUS)
    private Integer status;

    @Schema(description = "Remarks", example = "Happy note.")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
