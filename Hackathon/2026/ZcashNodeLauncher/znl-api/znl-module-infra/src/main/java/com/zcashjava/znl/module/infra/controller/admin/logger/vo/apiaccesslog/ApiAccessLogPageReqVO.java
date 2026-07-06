package com.zcashjava.znl.module.infra.controller.admin.logger.vo.apiaccesslog;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - API Access Log Page Request VO")
@Data
public class ApiAccessLogPageReqVO extends PageParam {

    @Schema(description = "User ID", example = "666")
    private Long userId;

    @Schema(description = "User Type", example = "2")
    private Integer userType;

    @Schema(description = "Apply Name", example = "dashboard")
    private String applicationName;

    @Schema(description = "Request Address, Fuzzy Match", example = "/xxx/yyy")
    private String requestUrl;

    @Schema(description = "beginTime", example = "[2022-07-01 00:00:00, 2022-07-01 23:59:59]")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] beginTime;

    @Schema(description = "The duration of the execution is greater than or equal to: milliseconds", example = "100")
    private Integer duration;

    @Schema(description = "The result code.", example = "0")
    private Integer resultCode;

}
