package com.zcashjava.znl.module.system.controller.admin.permission.vo.role;

import com.mzt.logapi.starter.annotation.DiffLogField;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Schema(description = "Manage Backstage - Role Creation/Update Request VO")
@Data
public class RoleSaveReqVO {

    @Schema(description = "Role Number", example = "1")
    private Long id;

    @Schema(description = "Role Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Administrator")
    @NotBlank(message = "name cannot be empty")
    @Size(max = 30, message = "Role name may not be longer than 30 characters")
    @DiffLogField(name = "Role Name")
    private String name;

    @NotBlank(message = "Role signs can't be empty.")
    @Size(max = 100, message = "Role signs must not be longer than 100 characters")
    @Schema(description = "Role signs", requiredMode = Schema.RequiredMode.REQUIRED, example = "ADMIN")
    @DiffLogField(name = "Role signs")
    private String code;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "Show order cannot be empty")
    @DiffLogField(name = "Show Order")
    private Integer sort;

    @Schema(description = "Status", requiredMode = Schema.RequiredMode.REQUIRED, example = "0")
    @DiffLogField(name = "Status")
    @NotNull(message = "The state cannot be empty.")
    @InEnum(value = CommonStatusEnum.class, message = "Status must be {value}")
    private Integer status;

    @Schema(description = "Remarks", example = "I'm a character.")
    @Size(max = 500, message = "The length of the note cannot exceed 500 characters")
    @DiffLogField(name = "Remarks")
    private String remark;

}
