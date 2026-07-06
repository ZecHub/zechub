package com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;
import cn.idev.excel.annotation.*;

@Schema(description = "ZNL - Installation script Response VO")
@Data
@ExcelIgnoreUnannotated
public class InstallationScriptRespVO {

    @Schema(description = "ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("ID")
    private Long id;

    @Schema(description = "Name", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Name")
    private String name;

    @Schema(description = "url", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("url")
    private String url;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Show Order")
    private Integer sort;

    @Schema(description = "Remarks")
    @ExcelProperty("Remarks")
    private String remark;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Created")
    private LocalDateTime createTime;

}