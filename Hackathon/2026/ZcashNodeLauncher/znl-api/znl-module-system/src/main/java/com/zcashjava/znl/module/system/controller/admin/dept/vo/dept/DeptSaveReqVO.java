package com.zcashjava.znl.module.system.controller.admin.dept.vo.dept;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;

@Schema(description = "Manage Backstage - Department Create/Modify Request VO")
@Data
public class DeptSaveReqVO {

    @Schema(description = "Sector Number", example = "1024")
    private Long id;

    @Schema(description = "Name of department", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Department name cannot be empty")
    @Size(max = 30, message = "Department name should not exceed 30 characters")
    private String name;

    @Schema(description = "Parent id", example = "1024")
    private Long parentId;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "Show order cannot be empty")
    private Integer sort;

    @Schema(description = "leaderUserId", example = "2048")
    private Long leaderUserId;

    @Schema(description = "Contact call.", example = "15601691000")
    @Size(max = 11, message = "Contact telephones must not exceed 11 characters")
    private String phone;

    @Schema(description = "Mailbox")
    @Email(message = "Cannot initialise Evolution's mail component.")
    @Size(max = 50, message = "Mailbox No More than 50 Characters")
    private String email;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    @InEnum(value = CommonStatusEnum.class, message = "The modified state must be {value}")
    private Integer status;

}
