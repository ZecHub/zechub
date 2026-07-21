package com.zcashjava.znl.module.infra.dal.dataobject.config;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.infra.enums.config.ConfigTypeEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


@TableName("infra_config")
@KeySequence("infra_config_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@TenantIgnore
public class ConfigDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private String category;
    
    private String name;
    
    private String configKey;
    
    private String value;
    
    private Integer type;
    
    private Boolean visible;
    
    private String remark;

}
