package com.zcashjava.znl.framework.mybatis.core.dataobject;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.io.Serializable;
import java.time.LocalDateTime;


@Data
@JsonIgnoreProperties(value = "transMap") 
public abstract class BaseDO implements Serializable {

    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableField(fill = FieldFill.INSERT, jdbcType = JdbcType.VARCHAR)
    private String creator;
    
    @TableField(fill = FieldFill.INSERT_UPDATE, jdbcType = JdbcType.VARCHAR)
    private String updater;
    
    @TableLogic
    private Boolean deleted;

    
    public void clean(){
        this.creator = null;
        this.createTime = null;
        this.updater = null;
        this.updateTime = null;
    }

}
