package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.client;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "Manage Backstage - OAuth2 Client Response VO")
@Data
public class OAuth2ClientRespVO {

    @Schema(description = "Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Client ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "tudou")
    private String clientId;

    @Schema(description = "Client Key", requiredMode = Schema.RequiredMode.REQUIRED, example = "fan")
    private String secret;

    @Schema(description = "Apply Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Potatoes.")
    private String name;

    @Schema(description = "Apply Icon", requiredMode = Schema.RequiredMode.REQUIRED)
    private String logo;

    @Schema(description = "Apply Description", example = "I'm an app.")
    private String description;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Integer status;

    @Schema(description = "Access to the period of validity of the medal", requiredMode = Schema.RequiredMode.REQUIRED, example = "8640")
    private Integer accessTokenValiditySeconds;

    @Schema(description = "Refresh the period of validity of the medals", requiredMode = Schema.RequiredMode.REQUIRED, example = "8640000")
    private Integer refreshTokenValiditySeconds;

    @Schema(description = "Redirectable URI address", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<String> redirectUris;

    @Schema(description = "Authorization type, see OAuth2GrantTypeEnum", requiredMode = Schema.RequiredMode.REQUIRED, example = "password")
    private List<String> authorizedGrantTypes;

    @Schema(description = "Scope of the mandate", example = "user_info")
    private List<String> scopes;

    @Schema(description = "Scope of authorization automatically adopted", example = "user_info")
    private List<String> autoApproveScopes;

    @Schema(description = "Permissions", example = "system:user:query")
    private List<String> authorities;

    @Schema(description = "Resources", example = "1024")
    private List<String> resourceIds;

    @Schema(description = "Can not open message", example = "{yunai: true}")
    private String additionalInformation;

    @Schema(description = "Created", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

}
