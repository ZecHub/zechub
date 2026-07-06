package com.zcashjava.znl.module.infra.controller.admin.file.vo.file;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import static com.zcashjava.znl.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

import java.time.LocalDateTime;

@Schema(description = "Manage Backstage - File Pages Request VO")
@Data
public class FilePageReqVO extends PageParam {

    @Schema(description = "File Path, Fuzzy Match")
    private String path;

    @Schema(description = "File type, Fuzzy Match", example = "jpg")
    private String type;

    @Schema(description = "Created", example = "[2022-07-01 00:00:00, 2022-07-01 23:59:59]")
    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)
    private LocalDateTime[] createTime;

}
