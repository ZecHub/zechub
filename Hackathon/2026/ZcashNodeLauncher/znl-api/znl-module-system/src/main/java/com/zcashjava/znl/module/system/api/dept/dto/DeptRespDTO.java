package com.zcashjava.znl.module.system.api.dept.dto;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;

import lombok.Data;


@Data
public class DeptRespDTO {

    
    private Long id;
    
    private String name;
    
    private Long parentId;
    
    private Long leaderUserId;
    
    private Integer status;

}
