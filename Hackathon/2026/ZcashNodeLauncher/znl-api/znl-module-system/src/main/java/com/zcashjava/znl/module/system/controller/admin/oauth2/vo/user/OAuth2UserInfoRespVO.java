package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Schema(description = "Manage Backstage - OAuth2 Get User Basic Information")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2UserInfoRespVO {

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

    
    private Dept dept;

    
    private List<Post> posts;

    @Schema(description = "Sector")
    @Data
    public static class Dept {

        @Schema(description = "Sector Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
        private Long id;

        @Schema(description = "Name of department", requiredMode = Schema.RequiredMode.REQUIRED, example = "Ministry of Research and Development")
        private String name;

    }

    @Schema(description = "Positions")
    @Data
    public static class Post {

        @Schema(description = "Job ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
        private Long id;

        @Schema(description = "Name of post", requiredMode = Schema.RequiredMode.REQUIRED, example = "Development")
        private String name;

    }

}
