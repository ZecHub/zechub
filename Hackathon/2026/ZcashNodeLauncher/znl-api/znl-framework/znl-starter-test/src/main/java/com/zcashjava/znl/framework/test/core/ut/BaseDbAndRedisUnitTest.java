package com.zcashjava.znl.framework.test.core.ut;

import cn.hutool.extra.spring.SpringUtil;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure;
import com.baomidou.mybatisplus.autoconfigure.MybatisPlusAutoConfiguration;
import com.zcashjava.znl.framework.datasource.config.ZnlDataSourceAutoConfiguration;
import com.zcashjava.znl.framework.mybatis.config.ZnlMybatisAutoConfiguration;
import com.zcashjava.znl.framework.redis.config.ZnlRedisAutoConfiguration;
import com.zcashjava.znl.framework.test.config.RedisTestConfiguration;
import com.zcashjava.znl.framework.test.config.SqlInitializationTestConfiguration;

import org.redisson.spring.starter.RedissonAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, classes = BaseDbAndRedisUnitTest.Application.class)
@ActiveProfiles("unit-test") 
@Sql(scripts = "/sql/clean.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD) 
public class BaseDbAndRedisUnitTest {

    @Import({
            
            ZnlDataSourceAutoConfiguration.class, 
            DataSourceAutoConfiguration.class, 
            DataSourceTransactionManagerAutoConfiguration.class, 
            DruidDataSourceAutoConfigure.class, 
            SqlInitializationTestConfiguration.class, 
            
            ZnlMybatisAutoConfiguration.class, 
            MybatisPlusAutoConfiguration.class, 

            
            RedisTestConfiguration.class, 
            ZnlRedisAutoConfiguration.class, 
            RedisAutoConfiguration.class, 
            RedissonAutoConfiguration.class, 

            
            SpringUtil.class
    })
    public static class Application {
    }

}
