package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.token;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "Manage Backstage - Access the Decoration Page Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
public class OAuth2AccessTokenPageReqVO extends PageParam {

    @Schema(description = "User ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "666")
    private Long userId;

    @Schema(description = "User type, see UserTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")
    private Integer userType;

    @Schema(description = "Client ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")
    private String clientId;

}
