package com.zcashjava.znl.module.system.controller.admin.dept.vo.post;

import cn.idev.excel.annotation.ExcelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "Manage Backstage - Streamline Job Information")
@Data
public class PostSimpleRespVO {

    @Schema(description = "Post number", requiredMode = Schema.RequiredMode.REQUIRED, example = "1024")
    @ExcelProperty("Post number")
    private Long id;

    @Schema(description = "Name of post", requiredMode = Schema.RequiredMode.REQUIRED, example = "Little potatoes.")
    @ExcelProperty("Name of post")
    private String name;

}
