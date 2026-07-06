package com.zcashjava.znl.module.system.controller.admin.dept.vo.dept;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "Manage Backstage - Sector List Request VO")
@Data
public class DeptListReqVO {

    @Schema(description = "Department name, blurry match")
    private String name;

    @Schema(description = "State of presentation, see CommonStatusEnum e. g.", example = "1")
    private Integer status;

}
