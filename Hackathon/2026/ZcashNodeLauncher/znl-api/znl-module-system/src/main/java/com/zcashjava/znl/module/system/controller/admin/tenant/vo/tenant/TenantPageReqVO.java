package com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - Tenant Sub-page Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class TenantPageReqVO extends PageParam {

    @Schema(description = "Tenant name")
    private String name;

    @Schema(description = "contactName")
    private String contactName;

    @Schema(description = "Contact the cell phone.", example = "15601691300")
    private String contactMobile;

    @Schema(description = "Tenant status (0 normal 1 disabled)", example = "1")
    private Integer status;

    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    @Schema(description = "Created")
    private LocalDateTime[] createTime;

}
