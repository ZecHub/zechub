package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Schema(description = "Manage Backstage - Authentication CodeRequest VO")
@Data
public class CaptchaVerificationReqVO {

    
    @Schema(description = "captchaVerification", requiredMode = Schema.RequiredMode.REQUIRED,
            example = "")
    @NotEmpty(message = "captchaVerification cannot be empty", groups = CodeEnableGroup.class)
    private String captchaVerification;

    
    public interface CodeEnableGroup {
    }
}
