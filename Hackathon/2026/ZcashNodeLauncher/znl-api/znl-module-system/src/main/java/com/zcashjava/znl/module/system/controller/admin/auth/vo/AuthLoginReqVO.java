package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import com.zcashjava.znl.framework.common.validation.InEnum;
import com.zcashjava.znl.module.system.enums.social.SocialTypeEnum;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Schema(description = "Manage background - account password login Request VO, if login and bind social users, need to pass parameters from the beginning of social")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthLoginReqVO extends CaptchaVerificationReqVO {

    @Schema(description = "Account", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "Login account cannot be empty")
    @Length(min = 4, max = 16, message = "Account length 4-16 bits")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Account is in numeric and alphanumeric form")
    private String username;

    @Schema(description = "Password", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "Password cannot be empty.")
    @Length(min = 4, max = 16, message = "Password length 4-16 bits")
    private String password;

    

    @Schema(description = "Type of social platform, see SocialTypeEnum emulations", requiredMode = Schema.RequiredMode.REQUIRED, example = "10")
    @InEnum(SocialTypeEnum.class)
    private Integer socialType;

    @Schema(description = "Authorisation Code", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private String socialCode;

    @Schema(description = "state", requiredMode = Schema.RequiredMode.REQUIRED, example = "9b2ffbc1-7425-4155-9894-9d5c08541d62")
    private String socialState;

    @AssertTrue(message = "isSocialCodeValid")
    public boolean isSocialCodeValid() {
        return socialType == null || StrUtil.isNotEmpty(socialCode);
    }

    @AssertTrue(message = "Authorization state cannot be empty")
    public boolean isSocialState() {
        return socialType == null || StrUtil.isNotEmpty(socialState);
    }

}