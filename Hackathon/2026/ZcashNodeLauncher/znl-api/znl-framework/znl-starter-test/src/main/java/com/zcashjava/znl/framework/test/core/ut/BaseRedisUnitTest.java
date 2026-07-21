package com.zcashjava.znl.framework.test.core.ut;

import cn.hutool.extra.spring.SpringUtil;

import org.redisson.spring.starter.RedissonAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.zcashjava.znl.framework.redis.config.ZnlRedisAutoConfiguration;
import com.zcashjava.znl.framework.test.config.RedisTestConfiguration;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, classes = BaseRedisUnitTest.Application.class)
@ActiveProfiles("unit-test") 
public class BaseRedisUnitTest {

    @Import({
            
            RedisTestConfiguration.class, 
            RedisAutoConfiguration.class, 
            ZnlRedisAutoConfiguration.class, 
            RedissonAutoConfiguration.class, 

            
            SpringUtil.class
    })
    public static class Application {
    }

}
