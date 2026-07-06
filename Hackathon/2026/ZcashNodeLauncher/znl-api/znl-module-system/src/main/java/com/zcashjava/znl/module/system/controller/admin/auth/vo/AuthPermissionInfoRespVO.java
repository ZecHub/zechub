package com.zcashjava.znl.module.system.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Schema(description = "Manage backstage - login user permissions information")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthPermissionInfoRespVO {

    @Schema(description = "User Information", requiredMode = Schema.RequiredMode.REQUIRED)
    private UserVO user;

    @Schema(description = "Role ID array", requiredMode = Schema.RequiredMode.REQUIRED)
    private Set<String> roles;

    @Schema(description = "Operation permission arrays", requiredMode = Schema.RequiredMode.REQUIRED)
    private Set<String> permissions;

    @Schema(description = "Menu Tree", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<MenuVO> menus;

    @Schema(description = "User Information VO")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserVO {

        @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
        private Long id;

        @Schema(description = "nick of the user", requiredMode = Schema.RequiredMode.REQUIRED)
        private String nickname;

        @Schema(description = "User Header", requiredMode = Schema.RequiredMode.REQUIRED)
        private String avatar;

        @Schema(description = "Sector Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "2048")
        private Long deptId;

        @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
        private String username;

        @Schema(description = "Cannot initialise Evolution's mail component.")
        private String email;

    }

    @Schema(description = "Manage background - menu information for login usersResponse VO")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MenuVO {

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

        
        private List<MenuVO> children;

    }

}
