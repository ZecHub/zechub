package com.zcashjava.znl.framework.encrypt.config;

import lombok.extern.slf4j.Slf4j;

import static com.zcashjava.znl.framework.web.config.ZnlWebAutoConfiguration.createFilterBean;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import com.zcashjava.znl.framework.common.enums.WebFilterOrderEnum;
import com.zcashjava.znl.framework.encrypt.core.filter.ApiEncryptFilter;
import com.zcashjava.znl.framework.web.config.WebProperties;
import com.zcashjava.znl.framework.web.core.handler.GlobalExceptionHandler;

@AutoConfiguration
@Slf4j
@EnableConfigurationProperties(ApiEncryptProperties.class)
@ConditionalOnProperty(prefix = "znl.api-encrypt", name = "enable", havingValue = "true")
public class ZnlApiEncryptAutoConfiguration {

    @Bean
    public FilterRegistrationBean<ApiEncryptFilter> apiEncryptFilter(WebProperties webProperties,
                                                                     ApiEncryptProperties apiEncryptProperties,
                                                                     RequestMappingHandlerMapping requestMappingHandlerMapping,
                                                                     GlobalExceptionHandler globalExceptionHandler) {
        ApiEncryptFilter filter = new ApiEncryptFilter(webProperties, apiEncryptProperties,
                requestMappingHandlerMapping, globalExceptionHandler);
        return createFilterBean(filter, WebFilterOrderEnum.API_ENCRYPT_FILTER);

    }

}
