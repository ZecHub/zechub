package com.zcashjava.znl.module.system.controller.admin.user.vo.profile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;


@Schema(description = "Manage Backstage - User Personal Update Request VO")
@Data
public class UserProfileUpdateReqVO {

    @Schema(description = "nick of the user")
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

    @Schema(description = "The character's head.")
    @URL(message = "The header's address is not properly formatted.")
    private String avatar;

}
