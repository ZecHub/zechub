package com.zcashjava.znl.module.infra.controller.admin.config.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - Parameter Configuration PagesRequest VO")
@Data
public class ConfigPageReqVO extends PageParam {

    @Schema(description = "Data Source Name, Fuzzy Match", example = "Name")
    private String name;

    @Schema(description = "Parameter Key Name, Fuzzy Match", example = "yunai.db.username")
    private String key;

    @Schema(description = "Parameter type, see SysConfigTypeEnum", example = "1")
    private Integer type;

    @Schema(description = "Created", example = "[2022-07-01 00:00:00,2022-07-01 23:59:59]")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] createTime;

}
