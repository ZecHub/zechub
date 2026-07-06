package com.zcashjava.znl.module.infra.controller.admin.logger.vo.apiaccesslog;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.infra.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - API Access Log")
@Data
@ExcelIgnoreUnannotated
public class ApiAccessLogRespVO {

    @Schema(description = "Log Master Keys", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Log Master Keys")
    private Long id;

    @Schema(description = "Link tracking number.", requiredMode = Schema.RequiredMode.REQUIRED, example = "66600cb6-7852-11eb-9439-0242ac130002")
    @ExcelProperty("Link tracking number.")
    private String traceId;

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "666")
    @ExcelProperty("User ID")
    private Long userId;

    @Schema(description = "User type, see UserTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")
    @ExcelProperty(value = "User Type", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.USER_TYPE)
    private Integer userType;

    @Schema(description = "Apply Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "dashboard")
    @ExcelProperty("Apply Name")
    private String applicationName;

    @Schema(description = "Method name requested", requiredMode = Schema.RequiredMode.REQUIRED, example = "GET")
    @ExcelProperty("Method name requested")
    private String requestMethod;

    @Schema(description = "Address of the request", requiredMode = Schema.RequiredMode.REQUIRED, example = "/xxx/yyy")
    @ExcelProperty("Address of the request")
    private String requestUrl;

    @Schema(description = "Request Parameters")
    @ExcelProperty("Request Parameters")
    private String requestParams;

    @Schema(description = "Response")
    @ExcelProperty("Response")
    private String responseBody;

    @Schema(description = "User IP", requiredMode = Schema.RequiredMode.REQUIRED, example = "127.0.0.1")
    @ExcelProperty("User IP")
    private String userIp;

    @Schema(description = "Browser UA", requiredMode = Schema.RequiredMode.REQUIRED, example = "Mozilla/5.0")
    @ExcelProperty("Browser UA")
    private String userAgent;

    @Schema(description = "Operation Module", requiredMode = Schema.RequiredMode.REQUIRED, example = "Commodities module")
    @ExcelProperty("Operation Module")
    private String operateModule;

    @Schema(description = "Operation Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Creation of commodities")
    @ExcelProperty("Operation Name")
    private String operateName;

    @Schema(description = "Operations Classification", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Operations Classification", converter = DictConvert.class)
    @DictFormat(com.zcashjava.znl.module.infra.enums.DictTypeConstants.OPERATE_TYPE)
    private Integer operateType;

    @Schema(description = "Start Request Time", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Start Request Time")
    private LocalDateTime beginTime;

    @Schema(description = "End of request time", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("End of request time")
    private LocalDateTime endTime;

    @Schema(description = "Duration of implementation", requiredMode = Schema.RequiredMode.REQUIRED, example = "100")
    @ExcelProperty("Duration of implementation")
    private Integer duration;

    @Schema(description = "The result code.", requiredMode = Schema.RequiredMode.REQUIRED, example = "0")
    @ExcelProperty("The result code.")
    private Integer resultCode;

    @Schema(description = "Results Hint", example = "")
    @ExcelProperty("Results Hint")
    private String resultMsg;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
