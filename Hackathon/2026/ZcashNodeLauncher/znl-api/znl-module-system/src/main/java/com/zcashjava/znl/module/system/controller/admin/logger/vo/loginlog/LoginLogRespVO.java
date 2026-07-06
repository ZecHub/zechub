package com.zcashjava.znl.module.system.controller.admin.logger.vo.loginlog;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - Login")
@Data
@ExcelIgnoreUnannotated
public class LoginLogRespVO {

    @Schema(description = "Log Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Log Master Keys")
    private Long id;

    @Schema(description = "Log type, see LogLogTyEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Log Type", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.LOGIN_TYPE)
    private Integer logType;

    @Schema(description = "User ID", example = "666")
    private Long userId;

    @Schema(description = "User type, see UserTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")
    private Integer userType;

    @Schema(description = "Link tracking number.", example = "89aca178-a370-411c-ae02-3f0d672be4ab")
    private String traceId;

    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("username")
    private String username;

    @Schema(description = "Login results, see LoginResultEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Login Results", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.LOGIN_RESULT)
    private Integer result;

    @Schema(description = "User IP", requiredMode = Schema.RequiredMode.REQUIRED, example = "127.0.0.1")
    @ExcelProperty("Login IP")
    private String userIp;

    @Schema(description = "Browser UserAgent", example = "Mozilla/5.0")
    @ExcelProperty("Browser UA")
    private String userAgent;

    @Schema(description = "Login Time", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("Login Time")
    private LocalDateTime createTime;

}
