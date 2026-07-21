package com.zcashjava.znl.module.system.controller.admin.user.vo.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;
import com.zcashjava.znl.framework.dict.validation.InDict;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

@Schema(description = "Manage Backstage - User Update StatusRequest VO")
@Data
public class UserUpdateStatusReqVO {

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "id cannot be empty")
    private Long id;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    @InEnum(value = CommonStatusEnum.class, message = "The modified state must be {value}")
    @InDict(type = DictTypeConstants.COMMON_STATUS)
    private Integer status;

}
