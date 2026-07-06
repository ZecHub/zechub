package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import com.zcashjava.znl.framework.common.validation.Mobile;

import javax.validation.constraints.NotEmpty;

@Schema(description = "Manage Backstage - Text Reset Account Password Request VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResetPasswordReqVO {

    @Schema(description = "Password", requiredMode = Schema.RequiredMode.REQUIRED, example = "1234")
    @NotEmpty(message = "Password cannot be empty.")
    @Length(min = 4, max = 16, message = "Password length 4-16 bits")
    private String password;

    @Schema(description = "Cell phone number.", requiredMode = Schema.RequiredMode.REQUIRED, example = "13312341234")
    @NotEmpty(message = "Phone numbers can't be empty.")
    @Mobile
    private String mobile;

    @Schema(description = "Mobile SMS Authentication Code", requiredMode = Schema.RequiredMode.REQUIRED, example = "123456")
    @NotEmpty(message = "The cell phone SMS code can't be empty.")
    private String code;
}