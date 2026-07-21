package com.zcashjava.znl.module.infra.controller.admin.logger.vo.apierrorlog;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - API Error Log Page Request VO")
@Data
public class ApiErrorLogPageReqVO extends PageParam {

    @Schema(description = "User ID", example = "666")
    private Long userId;

    @Schema(description = "User Type", example = "1")
    private Integer userType;

    @Schema(description = "Apply Name", example = "dashboard")
    private String applicationName;

    @Schema(description = "Address of the request", example = "/xx/yy")
    private String requestUrl;

    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    @Schema(description = "Anomalous time of occurrence")
    private LocalDateTime[] exceptionTime;

    @Schema(description = "Process Status", example = "0")
    private Integer processStatus;

}
