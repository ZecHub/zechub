package com.zcashjava.znl.module.zcash.dal.dataobject.installationscript;

import lombok.*;
import java.util.*;
import java.time.LocalDateTime;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.*;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;

/**
 * Installation script DO
 *
 * 
 */
@TableName("zcash_installation_script")
@KeySequence("zcash_installation_script_seq") // Used for auto-incrementing primary keys in Oracle, PostgreSQL, Kingbase, DB2, H2 databases. For databases like MySQL, this can be omitted.
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstallationScriptDO extends BaseDO {

    /**
     * ID
     */
    @TableId
    private Long id;
    /**
     * Name
     */
    private String name;
    /**
     * url
     */
    private String url;
    /**
     * Show Order
     */
    private Integer sort;
    /**
     * Remarks
     */
    private String remark;


}