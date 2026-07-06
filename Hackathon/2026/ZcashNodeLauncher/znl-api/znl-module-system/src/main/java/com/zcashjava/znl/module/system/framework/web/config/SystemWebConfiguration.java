package com.zcashjava.znl.module.system.framework.web.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zcashjava.znl.framework.swagger.config.ZnlSwaggerAutoConfiguration;


@Configuration(proxyBeanMethods = false)
public class SystemWebConfiguration {

    
    @Bean
    public GroupedOpenApi systemGroupedOpenApi() {
        return ZnlSwaggerAutoConfiguration.buildGroupedOpenApi("system");
    }

}
