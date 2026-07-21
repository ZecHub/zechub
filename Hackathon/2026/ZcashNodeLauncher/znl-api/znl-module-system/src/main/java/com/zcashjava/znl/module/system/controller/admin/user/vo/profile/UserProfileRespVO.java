package com.zcashjava.znl.module.system.controller.admin.user.vo.profile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptSimpleRespVO;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.post.PostSimpleRespVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.role.RoleSimpleRespVO;

@Data
@Schema(description = "Manage Backstage - User Personal Center InformationResponse VO")
public class UserProfileRespVO {

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Long id;

    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    private String username;

    @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nickname;

    @Schema(description = "Cannot initialise Evolution's mail component.")
    private String email;

    @Schema(description = "Cell phone number.", example = "15601691300")
    private String mobile;

    @Schema(description = "Sex of user, see SexEnum enumerates", example = "1")
    private Integer sex;

    @Schema(description = "User Header")
    private String avatar;

    @Schema(description = "Last Login IP", requiredMode = Schema.RequiredMode.REQUIRED, example = "192.168.1.1")
    private String loginIp;

    @Schema(description = "Last Login Time", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime loginDate;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime createTime;

    
    private List<RoleSimpleRespVO> roles;
    
    private DeptSimpleRespVO dept;
    
    private List<PostSimpleRespVO> posts;

}
