package com.zcashjava.znl.module.infra.framework.file.core.client.s3;

import cn.hutool.core.util.StrUtil;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;


@Data
public class S3FileClientConfig implements FileClientConfig {

    public static final String ENDPOINT_QINIU = "qiniucs.com";
    public static final String ENDPOINT_ALIYUN = "aliyuncs.com";
    public static final String ENDPOINT_TENCENT = "myqcloud.com";
    public static final String ENDPOINT_VOLCES = "volces.com"; 

    
    @NotNull(message = "Endpoint cannot be empty.")
    private String endpoint;
    
    @URL(message = "Domain must be in URL format")
    private String domain;
    
    @NotNull(message = "It can't be empty.")
    private String bucket;

    
    @NotNull(message = "Access Key can't be empty.")
    private String accessKey;
    
    @NotNull(message = "AccessSecret cannot be empty.")
    private String accessSecret;

    
    @NotNull(message = "EenablePathStyleAccess cannot be empty.")
    private Boolean enablePathStyleAccess;

    
    @NotNull(message = "Public access cannot be empty")
    private Boolean enablePublicAccess;

    @SuppressWarnings("RedundantIfStatement")
    @AssertTrue(message = "Domain can't be empty.")
    @JsonIgnore
    public boolean isDomainValid() {
        
        if (StrUtil.contains(endpoint, ENDPOINT_QINIU) && StrUtil.isEmpty(domain)) {
            return false;
        }
        return true;
    }

}
