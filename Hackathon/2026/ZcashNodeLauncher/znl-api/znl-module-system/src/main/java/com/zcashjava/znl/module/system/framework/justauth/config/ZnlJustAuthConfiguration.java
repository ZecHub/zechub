package com.zcashjava.znl.module.system.framework.justauth.config;

import com.xkcoding.justauth.autoconfigure.JustAuthProperties;
import com.xkcoding.justauth.support.cache.RedisStateCache;
import com.zcashjava.znl.module.system.framework.justauth.core.AuthRequestFactory;

import me.zhyd.oauth.cache.AuthStateCache;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;


@Configuration(proxyBeanMethods = false)
public class ZnlJustAuthConfiguration {

    @Bean(name = "authRequestFactory2") 
    @ConditionalOnProperty(
            prefix = "justauth",
            value = {"enabled"},
            havingValue = "true",
            matchIfMissing = true
    )
    public AuthRequestFactory authRequestFactory(JustAuthProperties properties, AuthStateCache authStateCache) {
        return new AuthRequestFactory(properties, authStateCache);
    }

    @Bean
    public AuthStateCache authStateCache(RedisTemplate<String, String> justAuthRedisCacheTemplate,
                                         JustAuthProperties justAuthProperties) {
        return new RedisStateCache(justAuthRedisCacheTemplate, justAuthProperties.getCache());
    }

}
