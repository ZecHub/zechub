package com.zcashjava.znl.framework.common.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Schema(description="Page Break Parameters")
@Data
public class PageParam implements Serializable {

    private static final Integer PAGE_NO = 1;
    private static final Integer PAGE_SIZE = 10;

    
    public static final Integer PAGE_SIZE_NONE = -1;

    @Schema(description = "Page number, starting with 1", requiredMode = Schema.RequiredMode.REQUIRED,example = "1")
    @NotNull(message = "Page numbers cannot be empty")
    @Min(value = 1, message = "Minimum value for page number to 1")
    private Integer pageNo = PAGE_NO;

    @Schema(description = "Number of bars per page with a maximum value of 100", requiredMode = Schema.RequiredMode.REQUIRED, example = "10")
    @NotNull(message = "The number of lines per page cannot be empty")
    @Min(value = 1, message = "Minimum value per page bar is 1")
    @Max(value = 100, message = "Maximum number of bars per page is 100")
    private Integer pageSize = PAGE_SIZE;

}
