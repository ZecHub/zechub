package com.zcashjava.znl.module.system.controller.admin.dict.vo.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Size;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.validation.InEnum;

@Schema(description = "Manage Backstage - Dictionary Type Tab ListRequest VO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictDataPageReqVO extends PageParam {

    @Schema(description = "Dictionary Tags")
    @Size(max = 100, message = "Dictionary labels cannot be longer than 100 characters")
    private String label;

    @Schema(description = "Dictionary type, Fuzzy Match", example = "sys_common_sex")
    @Size(max = 100, message = "Dictionary type type not to exceed 100 characters")
    private String dictType;

    @Schema(description = "State of presentation, see CommonStatusEnum e. g.", example = "1")
    @InEnum(value = CommonStatusEnum.class, message = "The modified state must be {value}")
    private Integer status;

}
