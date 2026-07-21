package com.zcashjava.znl.module.system.dal.dataobject.dict;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;

import lombok.*;

import java.time.LocalDateTime;


@TableName("system_dict_type")
@KeySequence("system_dict_type_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TenantIgnore
public class DictTypeDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private String name;
    
    private String type;
    
    private Integer status;
    
    private String remark;

    
    private LocalDateTime deletedTime;

}
