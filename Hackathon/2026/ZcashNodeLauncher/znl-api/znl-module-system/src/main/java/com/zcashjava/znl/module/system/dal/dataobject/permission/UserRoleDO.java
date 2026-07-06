package com.zcashjava.znl.module.system.dal.dataobject.permission;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

import lombok.Data;
import lombok.EqualsAndHashCode;


@TableName("system_user_role")
@KeySequence("system_user_role_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class UserRoleDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private Long userId;
    
    private Long roleId;

}
