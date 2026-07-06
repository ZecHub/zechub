package com.zcashjava.znl.module.system.controller.admin.user.vo.user;

import cn.hutool.core.util.ObjectUtil;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mzt.logapi.starter.annotation.DiffLogField;
import com.zcashjava.znl.framework.common.validation.Mobile;
import com.zcashjava.znl.module.system.framework.operatelog.core.DeptParseFunction;
import com.zcashjava.znl.module.system.framework.operatelog.core.PostParseFunction;
import com.zcashjava.znl.module.system.framework.operatelog.core.SexParseFunction;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;
import java.util.Set;

@Schema(description = "Manage Backstage - User Create/Modify Request VO")
@Data
public class UserSaveReqVO {

    @Schema(description = "User ID", example = "1024")
    private Long id;

    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "username")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "User account is composed of numbers, letters")
    @Size(min = 4, max = 30, message = "User account length of 4-30 characters")
    @DiffLogField(name = "username")
    private String username;

    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    @Size(max = 30, message = "The nick length of the user cannot exceed 30 characters")
    @DiffLogField(name = "nick of the user")
    private String nickname;

    @Schema(description = "Remarks", example = "I'm a user.")
    @DiffLogField(name = "Remarks")
    private String remark;

    @Schema(description = "Sector Number", example = "I'm a user.")
    @DiffLogField(name = "Sector", function = DeptParseFunction.NAME)
    private Long deptId;

    @Schema(description = "Job ID array", example = "1")
    @DiffLogField(name = "Positions", function = PostParseFunction.NAME)
    private Set<Long> postIds;

    @Schema(description = "Cannot initialise Evolution's mail component.")
    @Email(message = "Cannot initialise Evolution's mail component.")
    @Size(max = 50, message = "Mailbox No More than 50 Characters")
    @DiffLogField(name = "Cannot initialise Evolution's mail component.")
    private String email;

    @Schema(description = "Cell phone number.", example = "15601691300")
    @Mobile
    @DiffLogField(name = "Cell phone number.")
    private String mobile;

    @Schema(description = "Sex of user, see SexEnum enumerates", example = "1")
    @DiffLogField(name = "Sex of user", function = SexParseFunction.NAME)
    private Integer sex;

    @Schema(description = "User Header")
    @DiffLogField(name = "User Header")
    private String avatar;

    

    @Schema(description = "Password", requiredMode = Schema.RequiredMode.REQUIRED, example = "123456")
    @Length(min = 4, max = 16, message = "Password length 4-16 bits")
    private String password;

    @AssertTrue(message = "Password cannot be empty.")
    @JsonIgnore
    public boolean isPasswordValid() {
        return id != null 
                || (ObjectUtil.isAllNotEmpty(password)); 
    }

}
