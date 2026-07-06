package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Schema(description = "Manage Backstage - OAuth2 Update User Basic InformationRequest VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2UserUpdateReqVO {

    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    @Size(max = 30, message = "The nick length of the user cannot exceed 30 characters")
    private String nickname;

    @Schema(description = "Cannot initialise Evolution's mail component.")
    @Email(message = "Cannot initialise Evolution's mail component.")
    @Size(max = 50, message = "Mailbox No More than 50 Characters")
    private String email;

    @Schema(description = "Cell phone number.", example = "15601691300")
    @Length(min = 11, max = 11, message = "The cell phone must be 11 bits long.")
    private String mobile;

    @Schema(description = "Sex of user, see SexEnum enumerates", example = "1")
    private Integer sex;

}
