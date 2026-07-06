package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.client;

import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.validator.constraints.URL;

import com.zcashjava.znl.framework.common.util.json.JsonUtils;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Schema(description = "Manage Backstage - OAuth2 Client Create/Modify Request VO")
@Data
public class OAuth2ClientSaveReqVO {

    @Schema(description = "Numbering", example = "1024")
    private Long id;

    @Schema(description = "Client ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "tudou")
    @NotNull(message = "Client ID cannot be empty")
    private String clientId;

    @Schema(description = "Client Key", requiredMode = Schema.RequiredMode.REQUIRED, example = "fan")
    @NotNull(message = "Client key cannot be empty")
    private String secret;

    @Schema(description = "Apply Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Potatoes.")
    @NotNull(message = "Application name cannot be empty")
    private String name;

    @Schema(description = "Apply Icon", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Apply icons cannot be empty")
    @URL(message = "The address of the application icon is incorrect")
    private String logo;

    @Schema(description = "Apply Description", example = "I'm an app.")
    private String description;

    @Schema(description = "Status, see CommonStatusEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @NotNull(message = "The state cannot be empty.")
    private Integer status;

    @Schema(description = "Access to the period of validity of the medal", requiredMode = Schema.RequiredMode.REQUIRED, example = "8640")
    @NotNull(message = "Access to the token cannot be empty.")
    private Integer accessTokenValiditySeconds;

    @Schema(description = "Refresh the period of validity of the medals", requiredMode = Schema.RequiredMode.REQUIRED, example = "8640000")
    @NotNull(message = "The validity of the refresher token cannot be empty")
    private Integer refreshTokenValiditySeconds;

    @Schema(description = "Redirectable URI address", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Redirectable URI address cannot be empty")
    private List<@NotEmpty(message = "Redirected URI cannot be empty") @URL(message = "Redirected URI format is incorrect") String> redirectUris;

    @Schema(description = "Authorization type, see OAuth2GrantTypeEnum", requiredMode = Schema.RequiredMode.REQUIRED, example = "password")
    @NotNull(message = "authorizedGrantTypes cannot be empty")
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

    @AssertTrue(message = "Additional information must be in JSON format")
    public boolean isAdditionalInformationJson() {
        return StrUtil.isEmpty(additionalInformation) || JsonUtils.isJson(additionalInformation);
    }

}
