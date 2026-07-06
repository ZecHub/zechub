package com.zcashjava.znl.module.system.controller.admin.user.vo.user;

import cn.idev.excel.annotation.ExcelIgnoreUnannotated;
import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

import com.zcashjava.znl.framework.excel.core.annotations.DictFormat;
import com.zcashjava.znl.framework.excel.core.convert.DictConvert;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - User Information")
@Data
@ExcelIgnoreUnannotated
public class UserRespVO{

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty("User ID")
    private Long id;

    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("User Name")
    private String username;

    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("nick of the user")
    private String nickname;

    @Schema(description = "Remarks", example = "I'm a user.")
    private String remark;

    @Schema(description = "Sector ID", example = "I'm a user.")
    private Long deptId;
    @Schema(description = "Name of department", example = "Department of IT")
    @ExcelProperty("Name of department")
    private String deptName;

    @Schema(description = "Job ID array", example = "1")
    private Set<Long> postIds;

    @Schema(description = "Cannot initialise Evolution's mail component.")
    @ExcelProperty("Cannot initialise Evolution's mail component.")
    private String email;

    @Schema(description = "Cell phone number.", example = "15601691300")
    @ExcelProperty("Cell phone number.")
    private String mobile;

    @Schema(description = "Sex of user, see SexEnum enumerates", example = "1")
    @ExcelProperty(value = "Sex of user", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.USER_SEX)
    private Integer sex;

    @Schema(description = "User Header")
    private String avatar;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty(value = "Organisation", converter = DictConvert.class)
    @DictFormat(DictTypeConstants.COMMON_STATUS)
    private Integer status;

    @Schema(description = "Last Login IP", requiredMode = Schema.RequiredMode.REQUIRED, example = "192.168.1.1")
    @ExcelProperty("Last login IP")
    private String loginIp;

    @Schema(description = "Last Login Time", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    @ExcelProperty("Last Login Time")
    private LocalDateTime loginDate;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime createTime;

}
