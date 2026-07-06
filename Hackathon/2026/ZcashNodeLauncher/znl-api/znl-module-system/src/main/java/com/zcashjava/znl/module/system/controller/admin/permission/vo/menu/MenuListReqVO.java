package com.zcashjava.znl.module.system.controller.admin.permission.vo.menu;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "Manage Backstage - List of Menu")
@Data
public class MenuListReqVO {

    @Schema(description = "Menu Name, Fuzzy Match")
    private String name;

    @Schema(description = "State of presentation, see CommonStatusEnum e. g.", example = "1")
    private Integer status;

}
