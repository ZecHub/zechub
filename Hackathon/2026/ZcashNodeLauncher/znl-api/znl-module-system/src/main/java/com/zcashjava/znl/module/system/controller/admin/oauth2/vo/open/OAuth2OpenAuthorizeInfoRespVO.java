package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.open;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.zcashjava.znl.framework.common.core.KeyValue;

@Schema(description = "Manage Backstage - Information for Authorisation PagesResponse VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2OpenAuthorizeInfoRespVO {

    
    private Client client;

    @Schema(description = "scopes", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<KeyValue<String, Boolean>> scopes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Client {

        @Schema(description = "Apply Name", requiredMode = Schema.RequiredMode.REQUIRED, example = "Potatoes.")
        private String name;

        @Schema(description = "Apply Icon", requiredMode = Schema.RequiredMode.REQUIRED)
        private String logo;

    }

}
