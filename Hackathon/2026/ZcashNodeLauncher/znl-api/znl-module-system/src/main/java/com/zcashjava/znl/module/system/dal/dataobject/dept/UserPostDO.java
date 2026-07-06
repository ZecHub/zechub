package com.zcashjava.znl.module.system.dal.dataobject.dept;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;

import lombok.Data;
import lombok.EqualsAndHashCode;


@TableName("system_user_post")
@KeySequence("system_user_post_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class UserPostDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private Long userId;
    
    private Long postId;

}
