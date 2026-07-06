package com.zcashjava.znl.module.system.controller.admin.dict.vo.type;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import javax.validation.constraints.Size;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - Dictionary Type Tab ListRequest VO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictTypePageReqVO extends PageParam {

    @Schema(description = "Dictionary Type Name, Fuzzy Match")
    private String name;

    @Schema(description = "Dictionary type, Fuzzy Match", example = "sys_common_sex")
    @Size(max = 100, message = "Dictionary type type not to exceed 100 characters")
    private String type;

    @Schema(description = "State of presentation, see CommonStatusEnum e. g.", example = "1")
    private Integer status;

    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    @Schema(description = "Created")
    private LocalDateTime[] createTime;

}
