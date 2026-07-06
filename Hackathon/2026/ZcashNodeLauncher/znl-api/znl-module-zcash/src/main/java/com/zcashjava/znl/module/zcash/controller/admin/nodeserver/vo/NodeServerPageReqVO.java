package com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo;

import lombok.*;
import java.util.*;
import io.swagger.v3.oas.annotations.media.Schema;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

@Schema(description = "ZNL - Installation script Page Request VO")
@Data
public class NodeServerPageReqVO extends PageParam {

    @Schema(description = "host")
    private String host;

    @Schema(description = "Name")
    private String name;

    @Schema(description = "default: 22")
    private Integer port;

    @Schema(description = "Pruning Node/ Full Node")
    private String nodeType;

    @Schema(description = "proxy type")
    private String proxyType;

    @Schema(description = "proxy host")
    private String proxyHost;

    @Schema(description = "proxy port")
    private Integer proxyPort;

    @Schema(description = "proxy username")
    private String proxyUsername;

    @Schema(description = "proxy password")
    private String proxyPassword;

    @Schema(description = "online / lost")
    private String serverStatus;

    @Schema(description = "network not reachable / incorrect password / Exception")
    private String serverError;

    @Schema(description = "server status check time")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] serverStatusCheckTime;

    @Schema(description = "not installed / installed")
    private String installationStatus;

    @Schema(description = "ssh output")
    private String installationLog;

    @Schema(description = "installation status check time")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] installationStatusCheckTime;

    @Schema(description = "started / stopped")
    private String nodeStatus;

    @Schema(description = "node start error")
    private String nodeError;

    @Schema(description = "node status check time")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] nodeStatusCheckTime;

    @Schema(description = "Show Order")
    private Integer sort;

    @Schema(description = "Remarks")
    private String remark;

    @Schema(description = "Created")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] createTime;

}