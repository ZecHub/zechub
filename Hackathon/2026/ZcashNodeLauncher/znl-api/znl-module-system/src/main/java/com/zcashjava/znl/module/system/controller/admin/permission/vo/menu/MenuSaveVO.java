package com.zcashjava.znl.module.system.controller.admin.permission.vo.menu;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Schema(description = "Manage Backstage - Menu Create/Modify Request VO")
@Data
public class MenuSaveVO {

    @Schema(description = "Menu Numbering", example = "1024")
    private Long id;

    @Schema(description = "Menu Name", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Menu name cannot be empty")
    @Size(max = 50, message = "Menu name may not be longer than 50 characters")
    private String name;

    @Schema(description = "Permission identification, which only needs to be passed if the menu type is a button", example = "sys:menu:add")
    @Size(max = 100)
    private String permission;

    @Schema(description = "Type, see MenuTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "Menu type cannot be empty")
    private Integer type;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "Show order cannot be empty")
    private Integer sort;

    @Schema(description = "Parent Menu ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "Parent Menu ID cannot be empty")
    private Long parentId;

    @Schema(description = "route address, only if the menu type is a menu or directory", example = "post")
    @Size(max = 200, message = "Route addresses cannot exceed 200 characters")
    private String path;

    @Schema(description = "menu icon, which only needs to be passed if the menu type is a menu or directory", example = "/menu/list")
    private String icon;

    @Schema(description = "Component path, which only needs to be passed if the menu type is a menu", example = "system/post/index")
    @Size(max = 200, message = "Component path must not exceed 255 characters")
    private String component;

    @Schema(description = "Component Name", example = "SystemUser")
    private String componentName;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    private Integer status;

    @Schema(description = "Visible", example = "false")
    private Boolean visible;

    @Schema(description = "Cache", example = "false")
    private Boolean keepAlive;

    @Schema(description = "Whether to always show", example = "false")
    private Boolean alwaysShow;

}
