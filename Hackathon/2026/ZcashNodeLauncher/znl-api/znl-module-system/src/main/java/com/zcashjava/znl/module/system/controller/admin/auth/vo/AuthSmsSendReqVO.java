package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.validation.InEnum;
import com.zcashjava.znl.framework.common.validation.Mobile;
import com.zcashjava.znl.module.system.enums.sms.SmsSceneEnum;

@Schema(description = "Manage Backstage - Send Cell phone Authentication Code Request VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthSmsSendReqVO extends CaptchaVerificationReqVO {

    @Schema(description = "Cell phone number.", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "Phone numbers can't be empty.")
    @Mobile
    private String mobile;

    @Schema(description = "Text scene.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "Sending scene cannot be empty")
    @InEnum(SmsSceneEnum.class)
    private Integer scene;

}
