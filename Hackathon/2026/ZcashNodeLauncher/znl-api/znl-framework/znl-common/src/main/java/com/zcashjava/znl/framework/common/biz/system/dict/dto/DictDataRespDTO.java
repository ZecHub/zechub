package com.zcashjava.znl.framework.common.biz.system.dict.dto;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;

import lombok.Data;


@Data
public class DictDataRespDTO {

    
    private String label;
    
    private String value;
    
    private String dictType;
    
    private Integer status;

}
