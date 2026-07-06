package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.zcashjava.znl.framework.common.validation.InEnum;
import com.zcashjava.znl.module.system.enums.social.SocialTypeEnum;

@Schema(description = "Manage Backstage - Socially Binding Login Request VO, using code + account password")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthSocialLoginReqVO {

    @Schema(description = "Type of social platform, see UserSocialTypeEnum emulations", requiredMode = Schema.RequiredMode.REQUIRED, example = "10")
    @InEnum(SocialTypeEnum.class)
    @NotNull(message = "The type of social platform cannot be empty")
    private Integer type;

    @Schema(description = "Authorisation Code", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotEmpty(message = "code cannot be empty")
    private String code;

    @Schema(description = "state", requiredMode = Schema.RequiredMode.REQUIRED, example = "9b2ffbc1-7425-4155-9894-9d5c08541d62")
    @NotEmpty(message = "State cannot be empty.")
    private String state;

}
