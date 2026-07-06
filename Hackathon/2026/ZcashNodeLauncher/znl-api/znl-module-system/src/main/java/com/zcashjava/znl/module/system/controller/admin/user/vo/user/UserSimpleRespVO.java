package com.zcashjava.znl.module.system.controller.admin.user.vo.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "Manage Backstage - User Streamline InformationResponse VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSimpleRespVO {

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nickname;

    @Schema(description = "Sector ID", example = "I'm a user.")
    private Long deptId;
    @Schema(description = "Name of department", example = "Department of IT")
    private String deptName;

}
