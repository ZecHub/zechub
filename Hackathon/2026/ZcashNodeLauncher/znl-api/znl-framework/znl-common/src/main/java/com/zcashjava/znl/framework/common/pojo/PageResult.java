package com.zcashjava.znl.framework.common.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "Page Break Result")
@Data
public final class PageResult<T> implements Serializable {

    @Schema(description = "Total", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long total;

    @Schema(description = "Data", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<T> list;

    public PageResult() {
    }

    public PageResult(List<T> list, Long total) {
        this.list = list;
        this.total = total;
    }

    public PageResult(Long total) {
        this.list = new ArrayList<>();
        this.total = total;
    }

    public static <T> PageResult<T> empty() {
        return new PageResult<>(0L);
    }

    public static <T> PageResult<T> empty(Long total) {
        return new PageResult<>(total);
    }

}
