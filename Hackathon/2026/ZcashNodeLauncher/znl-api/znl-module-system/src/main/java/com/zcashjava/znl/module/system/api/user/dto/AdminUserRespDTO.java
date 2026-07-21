package com.zcashjava.znl.module.system.api.user.dto;

import lombok.Data;

import java.util.Set;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;


@Data
public class AdminUserRespDTO {

    
    private Long id;
    
    private String nickname;
    
    private Integer status;

    
    private Long deptId;
    
    private Set<Long> postIds;
    
    private String mobile;
    
    private String avatar;

}
