package com.zcashjava.znl.module.system.controller.admin.dept.vo.dept;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - Sector Information")
@Data
public class DeptRespVO {

    @Schema(description = "Sector Number", example = "1024")
    private Long id;

    @Schema(description = "Name of department", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Parent id", example = "1024")
    private Long parentId;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Integer sort;

    @Schema(description = "leaderUserId", example = "2048")
    private Long leaderUserId;

    @Schema(description = "Contact call.", example = "15601691000")
    private String phone;

    @Schema(description = "Mailbox")
    private String email;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Integer status;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED, example = "Time stamp format")
    private LocalDateTime createTime;

}
