package com.zcashjava.znl.framework.common.biz.system.permission.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;


@Data
public class DeptDataPermissionRespDTO {

    
    private Boolean all;
    
    private Boolean self;
    
    private Set<Long> deptIds;

    public DeptDataPermissionRespDTO() {
        this.all = false;
        this.self = false;
        this.deptIds = new HashSet<>();
    }

}
