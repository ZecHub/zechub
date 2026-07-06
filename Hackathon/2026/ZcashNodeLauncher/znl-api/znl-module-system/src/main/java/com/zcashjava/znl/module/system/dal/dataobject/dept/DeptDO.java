package com.zcashjava.znl.module.system.dal.dataobject.dept;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.tenant.core.db.TenantBaseDO;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;

import lombok.Data;
import lombok.EqualsAndHashCode;


@TableName("system_dept")
@KeySequence("system_dept_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
public class DeptDO extends TenantBaseDO {

    public static final Long PARENT_ID_ROOT = 0L;

    
    @TableId
    private Long id;
    
    private String name;
    
    private Long parentId;
    
    private Integer sort;
    
    private Long leaderUserId;
    
    private String phone;
    
    private String email;
    
    private Integer status;

}
