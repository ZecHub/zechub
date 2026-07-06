package com.zcashjava.znl.module.infra.dal.dataobject.file;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.infra.framework.file.core.client.db.DBFileClient;

import lombok.*;


@TableName("infra_file_content")
@KeySequence("infra_file_content_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TenantIgnore
public class FileContentDO extends BaseDO {

    
    @TableId
    private Long id;
    
    private Long configId;
    
    private String path;
    
    private byte[] content;

}
