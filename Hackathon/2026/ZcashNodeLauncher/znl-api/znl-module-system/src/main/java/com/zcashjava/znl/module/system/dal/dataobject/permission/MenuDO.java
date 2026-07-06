package com.zcashjava.znl.module.system.dal.dataobject.permission;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.system.enums.permission.MenuTypeEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;


@TableName("system_menu")
@KeySequence("system_menu_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@TenantIgnore
public class MenuDO extends BaseDO {

    
    public static final Long ID_ROOT = 0L;

    
    @TableId
    private Long id;
    
    private String name;
    
    private String permission;
    
    private Integer type;
    
    private Integer sort;
    
    private Long parentId;
    
    private String path;
    
    private String icon;
    
    private String component;
    
    private String componentName;
    
    private Integer status;
    
    private Boolean visible;
    
    private Boolean keepAlive;
    
    private Boolean alwaysShow;

}
