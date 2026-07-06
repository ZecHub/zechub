package com.zcashjava.znl.module.system.controller.admin.logger.vo.operatelog;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - Operation Log Page Breaking ListRequest VO")
@Data
public class OperateLogPageReqVO extends PageParam {

    @Schema(description = "User ID")
    private Long userId;

    @Schema(description = "Operation module operations number", example = "1")
    private Long bizId;

    @Schema(description = "Operation module, simulation matching", example = "Order")
    private String type;

    @Schema(description = "Operation name, simulation match", example = "Create Order")
    private String subType;

    @Schema(description = "Operation Details, Simulation Matches", example = "Modify User Information Number 1")
    private String action;

    @Schema(description = "createTime", example = "[2022-07-01 00:00:00,2022-07-01 23:59:59]")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] createTime;

}
