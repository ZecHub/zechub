package com.zcashjava.znl.module.system.controller.admin.oauth2.vo.client;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Schema(description = "Manage Backstage - OAuth2 Client Tab Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class OAuth2ClientPageReqVO extends PageParam {

    @Schema(description = "Apply Name, Fuzzy Match", example = "Potatoes.")
    private String name;

    @Schema(description = "Status, see CommonStatusEnum e. g.", example = "1")
    private Integer status;

}
