package com.zcashjava.znl.module.system.controller.admin.auth.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;

@Schema(description = "Manage Backstage - Register Request VO")
@Data
public class AuthRegisterReqVO extends CaptchaVerificationReqVO {

    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "username cannot be empty")
    @Pattern(regexp = "^[a-zA-Z0-9]{4,30}$", message = "User account is composed of numbers, letters")
    @Size(min = 4, max = 30, message = "User account length of 4-30 characters")
    private String username;

    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "User nickname cannot be empty")
    @Size(max = 30, message = "The nick length of the user cannot exceed 30 characters")
    private String nickname;

    @Schema(description = "Password", requiredMode = Schema.RequiredMode.REQUIRED, example = "123456")
    @NotEmpty(message = "Password cannot be empty.")
    @Length(min = 4, max = 16, message = "Password length 4-16 bits")
    private String password;
}