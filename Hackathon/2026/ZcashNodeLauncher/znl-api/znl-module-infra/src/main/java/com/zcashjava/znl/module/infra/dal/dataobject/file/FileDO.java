package com.zcashjava.znl.module.infra.dal.dataobject.file;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;

import lombok.*;


@TableName("infra_file")
@KeySequence("infra_file_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TenantIgnore
public class FileDO extends BaseDO {

    
    private Long id;
    
    private Long configId;
    
    private String name;
    
    private String path;
    
    private String url;
    
    private String type;
    
    private Integer size;

}
