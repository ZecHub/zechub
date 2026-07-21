package com.zcashjava.znl.module.system.dal.dataobject.dept;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.Data;
import lombok.EqualsAndHashCode;


@TableName("system_post")
@KeySequence("system_post_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class PostDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private String name;
    
    private String code;
    
    private Integer sort;
    
    private Integer status;
    
    private String remark;

}
