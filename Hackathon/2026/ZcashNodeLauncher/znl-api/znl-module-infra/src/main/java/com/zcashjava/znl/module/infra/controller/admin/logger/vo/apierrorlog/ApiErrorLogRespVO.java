package com.zcashjava.znl.module.infra.controller.admin.logger.vo.apierrorlog;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.infra.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - API Error LogResponse VO")
@Data
@ExcelIgnoreUnannotated
public class ApiErrorLogRespVO {

    @Schema(description = "Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Numbering")
    private Long id;

    @Schema(description = "Link tracking number.", requiredMode = Schema.RequiredMode.REQUIRED, example = "66600cb6-7852-11eb-9439-0242ac130002")
    @ExcelProperty("Link tracking number.")
    private String traceId;

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "666")
    @ExcelProperty("User ID")
    private Long userId;

    @Schema(description = "User Type", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "User Type", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.USER_TYPE)
    private Integer userType;

    @Schema(description = "Apply Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "dashboard")
    @ExcelProperty("Apply Name")
    private String applicationName;

    @Schema(description = "Method name requested", requiredMode = Schema.RequiredMode.REQUIRED, example = "GET")
    @ExcelProperty("Method name requested")
    private String requestMethod;

    @Schema(description = "Address of the request", requiredMode = Schema.RequiredMode.REQUIRED, example = "/xx/yy")
    @ExcelProperty("Address of the request")
    private String requestUrl;

    @Schema(description = "Request Parameters", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Request Parameters")
    private String requestParams;

    @Schema(description = "User IP", requiredMode = Schema.RequiredMode.REQUIRED, example = "127.0.0.1")
    @ExcelProperty("User IP")
    private String userIp;

    @Schema(description = "Browser UA", requiredMode = Schema.RequiredMode.REQUIRED, example = "Mozilla/5.0")
    @ExcelProperty("Browser UA")
    private String userAgent;

    @Schema(description = "Anomalous time of occurrence", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Anomalous time of occurrence")
    private LocalDateTime exceptionTime;

    @Schema(description = "Anomalous name", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Anomalous name")
    private String exceptionName;

    @Schema(description = "Unusual news.", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Unusual news.")
    private String exceptionMessage;

    @Schema(description = "It's an unusual source of information.", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("It's an unusual source of information.")
    private String exceptionRootCauseMessage;

    @Schema(description = "Anomalous Trail", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Anomalous Trail")
    private String exceptionStackTrace;

    @Schema(description = "Unusual Full Name", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Unusual Full Name")
    private String exceptionClassName;

    @Schema(description = "Unusual Class Files", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Unusual Class Files")
    private String exceptionFileName;

    @Schema(description = "The name of the method of abnormality.", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("The name of the method of abnormality.")
    private String exceptionMethodName;

    @Schema(description = "The way that an anomaly happens.", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("The way that an anomaly happens.")
    private Integer exceptionLineNumber;

    @Schema(description = "Process Status", requiredMode = Schema.RequiredMode.REQUIRED, example = "0")
    @ExcelProperty(value = "Process Status", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.API_ERROR_LOG_PROCESS_STATUS)
    private Integer processStatus;

    @Schema(description = "Processing Time", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Processing Time")
    private LocalDateTime processTime;

    @Schema(description = "Process user IDs", example = "233")
    @ExcelProperty("Process user IDs")
    private Integer processUserId;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Created")
    private LocalDateTime createTime;

}
