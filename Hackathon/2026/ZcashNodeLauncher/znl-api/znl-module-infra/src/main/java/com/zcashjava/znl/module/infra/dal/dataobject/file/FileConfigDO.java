package com.zcashjava.znl.module.infra.dal.dataobject.file;

import cn.hutool.core.util.StrUtil;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.AbstractJsonTypeHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.db.DBFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.ftp.FtpFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.local.LocalFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.s3.S3FileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.sftp.SftpFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.enums.FileStorageEnum;

import lombok.*;

import java.lang.reflect.Field;


@TableName(value = "infra_file_config", autoResultMap = true)
@KeySequence("infra_file_config_seq") 
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TenantIgnore
public class FileConfigDO extends BaseDO {

    
    private Long id;
    
    private String name;
    
    private Integer storage;
    
    private String remark;
    
    private Boolean master;

    
    @TableField(typeHandler = FileClientConfigTypeHandler.class)
    private FileClientConfig config;

    public static class FileClientConfigTypeHandler extends AbstractJsonTypeHandler<Object> {

        public FileClientConfigTypeHandler(Class<?> type) {
            super(type);
        }

        public FileClientConfigTypeHandler(Class<?> type, Field field) {
            super(type, field);
        }

        @Override
        public Object parse(String json) {
            FileClientConfig config = JsonUtils.parseObjectQuietly(json, new TypeReference<FileClientConfig>() {
            });
            if (config != null) {
                return config;
            }

            
            String className = JsonUtils.parseObject(json, "@class", String.class);
            className = StrUtil.subAfter(className, ".", true);
            switch (className) {
                case "DBFileClientConfig":
                    return JsonUtils.parseObject2(json, DBFileClientConfig.class);
                case "FtpFileClientConfig":
                    return JsonUtils.parseObject2(json, FtpFileClientConfig.class);
                case "LocalFileClientConfig":
                    return JsonUtils.parseObject2(json, LocalFileClientConfig.class);
                case "SftpFileClientConfig":
                    return JsonUtils.parseObject2(json, SftpFileClientConfig.class);
                case "S3FileClientConfig":
                    return JsonUtils.parseObject2(json, S3FileClientConfig.class);
                default:
                    throw new IllegalArgumentException("Unknown FileClieentConfig type:" + json);
            }
        }

        @Override
        public String toJson(Object obj) {
            return JsonUtils.toJsonString(obj);
        }

    }

}
