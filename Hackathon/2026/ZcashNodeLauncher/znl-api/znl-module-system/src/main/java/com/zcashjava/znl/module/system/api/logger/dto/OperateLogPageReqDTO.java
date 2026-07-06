package com.zcashjava.znl.module.system.api.logger.dto;

import com.zcashjava.znl.framework.common.pojo.PageParam;

import lombok.Data;


@Data
public class OperateLogPageReqDTO extends PageParam {

    
    private String type;
    
    private Long bizId;

    
    private Long userId;

}
