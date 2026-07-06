package com.zcashjava.znl.framework.redis.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;


@ConfigurationProperties("znl.cache")
@Data
@Validated
public class ZnlCacheProperties {

    
    private static final Integer REDIS_SCAN_BATCH_SIZE_DEFAULT = 30;

    
    private Integer redisScanBatchSize = REDIS_SCAN_BATCH_SIZE_DEFAULT;

}
