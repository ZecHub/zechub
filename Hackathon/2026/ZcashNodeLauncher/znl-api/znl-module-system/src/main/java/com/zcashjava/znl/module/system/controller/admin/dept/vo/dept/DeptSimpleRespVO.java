package com.zcashjava.znl.module.system.controller.admin.dept.vo.dept;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "Manage Backstage - Department Streamline InformationResponse VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeptSimpleRespVO {

    @Schema(description = "Sector Number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long id;

    @Schema(description = "Name of department", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Parent id", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    private Long parentId;

}
