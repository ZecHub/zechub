package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.open;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Schema(description = "Manage Backstage - Verify VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2OpenCheckTokenRespVO {

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "666")
    @JsonProperty("user_id")
    private Long userId;
    @Schema(description = "User type, see UserTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")
    @JsonProperty("user_type")
    private Integer userType;
    @Schema(description = "Tenant Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @JsonProperty("tenant_id")
    private Long tenantId;

    @Schema(description = "Client ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "car")
    @JsonProperty("client_id")
    private String clientId;
    @Schema(description = "Scope of the mandate", requiredMode = Schema.RequiredMode.REQUIRED, example = "user_info")
    private List<String> scopes;

    @Schema(description = "Access the tokens", requiredMode = Schema.RequiredMode.REQUIRED, example = "tudou")
    @JsonProperty("access_token")
    private String accessToken;

    @Schema(description = "Expiration time, time stamp / 1000, i. e. in seconds", requiredMode = Schema.RequiredMode.REQUIRED, example = "1593092157")
    private Long exp;

}
