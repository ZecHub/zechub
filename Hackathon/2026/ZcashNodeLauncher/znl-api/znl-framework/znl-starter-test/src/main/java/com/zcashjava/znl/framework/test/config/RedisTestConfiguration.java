package com.zcashjava.znl.framework.test.config;

import com.github.fppt.jedismock.RedisServer;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import java.io.IOException;


@Configuration(proxyBeanMethods = false)
@Lazy(false) 
@EnableConfigurationProperties(RedisProperties.class)
public class RedisTestConfiguration {

    
    @Bean
    public RedisServer redisServer(RedisProperties properties) throws IOException {
        RedisServer redisServer = new RedisServer(properties.getPort());
        
        try {
            redisServer.start();
        } catch (Exception ignore) {}
        return redisServer;
    }

}
