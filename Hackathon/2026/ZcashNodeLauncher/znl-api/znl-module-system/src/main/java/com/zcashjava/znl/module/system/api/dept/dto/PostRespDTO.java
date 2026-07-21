package com.zcashjava.znl.module.system.api.dept.dto;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;

import lombok.Data;


@Data
public class PostRespDTO {

    
    private Long id;
    
    private String name;
    
    private String code;
    
    private Integer sort;
    
    private Integer status;

}
