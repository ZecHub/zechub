package com.zcashjava.znl.module.system.controller.admin.logger.vo.operatelog;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - Operating Log")
@Data
@ExcelIgnoreUnannotated
public class OperateLogRespVO {

    @Schema(description = "Log Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Log Number")
    private Long id;

    @Schema(description = "Link tracking number.", requiredMode = Schema.RequiredMode.REQUIRED, example = "89aca178-a370-411c-ae02-3f0d672be4ab")
    private String traceId;

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long userId;
    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Operator")
    private String userName;

    @Schema(description = "Operation module type", requiredMode = Schema.RequiredMode.REQUIRED, example = "Order")
    @ExcelProperty("Operation module type")
    private String type;

    @Schema(description = "Operation Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Create Order")
    @ExcelProperty("Operation Name")
    private String subType;

    @Schema(description = "Operation module operations number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty("Operation module operations number")
    private Long bizId;

    @Schema(description = "Operation Details", example = "Change the user information number 1 to change the gender from male to female.")
    private String action;

    @Schema(description = "Expand Fields", example = "{'orderId': 1}")
    private String extra;

    @Schema(description = "Method name requested", requiredMode = Schema.RequiredMode.REQUIRED, example = "GET")
    @NotEmpty(message = "Request method name cannot be empty")
    private String requestMethod;

    @Schema(description = "Address of the request", requiredMode = Schema.RequiredMode.REQUIRED, example = "/xxx/yyy")
    private String requestUrl;

    @Schema(description = "User IP", requiredMode = Schema.RequiredMode.REQUIRED, example = "127.0.0.1")
    private String userIp;

    @Schema(description = "Browser UserAgent", requiredMode = Schema.RequiredMode.REQUIRED, example = "Mozilla/5.0")
    private String userAgent;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
