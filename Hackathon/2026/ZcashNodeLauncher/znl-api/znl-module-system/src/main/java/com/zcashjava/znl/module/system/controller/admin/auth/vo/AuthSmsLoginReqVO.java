package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

import com.zcashjava.znl.framework.common.validation.Mobile;

@Schema(description = "Manage background - login of text message authentication codeRequest VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthSmsLoginReqVO {

    @Schema(description = "Cell phone number.", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "Phone numbers can't be empty.")
    @Mobile
    private String mobile;

    @Schema(description = "SMS Authentication Code", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotEmpty(message = "code cannot be empty")
    private String code;

}
