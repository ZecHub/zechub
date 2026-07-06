package com.zcashjava.znl.module.system.controller.admin.permission.vo.menu;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Schema(description = "Manage Backstage - Menu Streamlining InformationResponse VO")
@Data
public class MenuSimpleRespVO {

    @Schema(description = "Menu Numbering", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Menu Name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Parent Menu ID", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long parentId;

    @Schema(description = "Type, see MenuTypeEnum e. g.", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Integer type;

}
