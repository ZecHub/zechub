package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Schema(description = "Manage background - menu information for login usersResponse VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthMenuRespVO {

    @Schema(description = "Menu Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    @Schema(description = "Parent Menu ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long parentId;

    @Schema(description = "Menu Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "route address, only if the menu type is a menu or directory", example = "post")
    private String path;

    @Schema(description = "Component path, which only needs to be passed if the menu type is a menu", example = "system/post/index")
    private String component;

    @Schema(description = "Component Name", example = "SystemUser")
    private String componentName;

    @Schema(description = "menu icon, which only needs to be passed if the menu type is a menu or directory", example = "/menu/list")
    private String icon;

    @Schema(description = "Visible", requiredMode = Schema.RequiredMode.REQUIRED, example = "false")
    private Boolean visible;

    @Schema(description = "Cache", requiredMode = Schema.RequiredMode.REQUIRED, example = "false")
    private Boolean keepAlive;

    @Schema(description = "Whether to always show", example = "false")
    private Boolean alwaysShow;

    
    private List<AuthMenuRespVO> children;

}
