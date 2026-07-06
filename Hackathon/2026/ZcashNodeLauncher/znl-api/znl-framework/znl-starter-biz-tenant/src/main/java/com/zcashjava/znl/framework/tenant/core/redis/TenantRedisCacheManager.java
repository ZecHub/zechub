package com.zcashjava.znl.framework.tenant.core.redis;

import cn.hutool.core.collection.CollUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;

import com.zcashjava.znl.framework.redis.core.TimeoutRedisCacheManager;
import com.zcashjava.znl.framework.tenant.core.context.TenantContextHolder;

import java.util.Set;


@Slf4j
public class TenantRedisCacheManager extends TimeoutRedisCacheManager {

    private final Set<String> ignoreCaches;

    public TenantRedisCacheManager(RedisCacheWriter cacheWriter,
                                   RedisCacheConfiguration defaultCacheConfiguration,
                                   Set<String> ignoreCaches) {
        super(cacheWriter, defaultCacheConfiguration);
        this.ignoreCaches = ignoreCaches;
    }

    @Override
    public Cache getCache(String name) {
        
        if (!TenantContextHolder.isIgnore()
            && TenantContextHolder.getTenantId() != null
            && !CollUtil.contains(ignoreCaches, name)) {
            name = name + ":" + TenantContextHolder.getTenantId();
        }

        
        return super.getCache(name);
    }

}
