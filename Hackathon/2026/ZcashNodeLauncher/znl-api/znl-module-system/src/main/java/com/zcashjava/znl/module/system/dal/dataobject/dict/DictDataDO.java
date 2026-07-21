package com.zcashjava.znl.module.system.dal.dataobject.dict;

import com.baomidou.mybatisplus.annotation.*;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;


@TableName("system_dict_data")
@KeySequence("system_dict_data_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@TenantIgnore
public class DictDataDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private Integer sort;
    
    private String label;
    
    private String value;
    
    private String dictType;
    
    private Integer status;
    
    private String colorType;
    
    @TableField(updateStrategy = FieldStrategy.ALWAYS)
    private String cssClass;
    
    private String remark;

}
