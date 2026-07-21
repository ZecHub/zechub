package com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo;

import lombok.*;
import java.util.*;
import io.swagger.v3.oas.annotations.media.Schema;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

@Schema(description = "ZNL - Installation script Page Request VO")
@Data
public class InstallationScriptPageReqVO extends PageParam {

    @Schema(description = "Name")
    private String name;

    @Schema(description = "url")
    private String url;

    @Schema(description = "Show Order")
    private Integer sort;

    @Schema(description = "Remarks")
    private String remark;

    @Schema(description = "Created")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] createTime;

}