package com.zcashjava.znl.module.system.controller.admin.dept.vo.post;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "Manage Backstage - Job Page Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
public class PostPageReqVO extends PageParam {

    @Schema(description = "Job Coding, Fuzzy Matches")
    private String code;

    @Schema(description = "Job Name, Fuzzy Match")
    private String name;

    @Schema(description = "State of presentation, see CommonStatusEnum e. g.", example = "1")
    private Integer status;

}
