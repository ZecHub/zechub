package com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo;

import javax.validation.constraints.NotEmpty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "ZNL - Installation script Create/Update Request VO")
@Data
public class NodeServerSaveReqVO {

    @Schema(description = "ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    @Schema(description = "host", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "host cannot be empty")
    private String host;

    @Schema(description = "Name", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "Name cannot be empty")
    private String name;

    @Schema(description = "default: 22")
    private Integer port;
    
    @Schema(description = "username", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "username cannot be empty")
    private String username;

    @Schema(description = "password", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "password cannot be empty")
    private String password;

    @Schema(description = "proxy type")
    private String proxyType;

    @Schema(description = "proxy host")
    private String proxyHost;

    @Schema(description = "proxy port")
    private Integer proxyPort;

    @Schema(description = "proxy username")
    private String proxyUsername;

    @Schema(description = "proxy password")
    private String proxyPassword;

    @Schema(description = "Show Order")
    private Integer sort;

    @Schema(description = "Remarks")
    private String remark;
    
    @Schema(description = "refreshServerStatus")
    private Boolean refreshServerStatus;

}