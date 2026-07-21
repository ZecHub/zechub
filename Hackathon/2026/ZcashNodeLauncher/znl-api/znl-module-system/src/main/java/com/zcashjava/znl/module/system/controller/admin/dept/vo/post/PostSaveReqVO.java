package com.zcashjava.znl.module.system.controller.admin.dept.vo.post;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.validation.InEnum;

@Schema(description = "Manage Backstage - Create/Modify Request VO")
@Data
public class PostSaveReqVO {

    @Schema(description = "Job ID", example = "1024")
    private Long id;

    @Schema(description = "Name of post", requiredMode = Schema.RequiredMode.REQUIRED, example = "Little potatoes.")
    @NotBlank(message = "Job name cannot be empty")
    @Size(max = 50, message = "Job name may not be longer than 50 characters")
    private String name;

    @Schema(description = "Job Coding", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "The job code can't be empty.")
    @Size(max = 64, message = "Job encoded no longer than 64 characters")
    private String code;

    @Schema(description = "Show Order", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @NotNull(message = "Show order cannot be empty")
    private Integer sort;

    @Schema(description = "Status", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @InEnum(CommonStatusEnum.class)
    private Integer status;

    @Schema(description = "Remarks", example = "Happy note.")
    private String remark;

}