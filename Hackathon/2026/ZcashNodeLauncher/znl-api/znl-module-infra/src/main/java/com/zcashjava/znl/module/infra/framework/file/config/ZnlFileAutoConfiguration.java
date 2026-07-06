package com.zcashjava.znl.module.infra.framework.file.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientFactory;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientFactoryImpl;


@Configuration(proxyBeanMethods = false)
public class ZnlFileAutoConfiguration {

    @Bean
    public FileClientFactory fileClientFactory() {
        return new FileClientFactoryImpl();
    }

}
