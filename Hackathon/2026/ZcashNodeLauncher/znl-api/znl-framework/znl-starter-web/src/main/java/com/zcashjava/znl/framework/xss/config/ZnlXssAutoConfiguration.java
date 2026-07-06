package com.zcashjava.znl.framework.xss.config;

import static com.zcashjava.znl.framework.web.config.ZnlWebAutoConfiguration.createFilterBean;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.util.PathMatcher;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.zcashjava.znl.framework.common.enums.WebFilterOrderEnum;
import com.zcashjava.znl.framework.xss.core.clean.JsoupXssCleaner;
import com.zcashjava.znl.framework.xss.core.clean.XssCleaner;
import com.zcashjava.znl.framework.xss.core.filter.XssFilter;
import com.zcashjava.znl.framework.xss.core.json.XssStringJsonDeserializer;

@AutoConfiguration
@EnableConfigurationProperties(XssProperties.class)
@ConditionalOnProperty(prefix = "znl.xss", name = "enable", havingValue = "true", matchIfMissing = true) 
public class ZnlXssAutoConfiguration implements WebMvcConfigurer {

    
    @Bean
    @ConditionalOnMissingBean(XssCleaner.class)
    public XssCleaner xssCleaner() {
        return new JsoupXssCleaner();
    }

    
    @Bean
    @ConditionalOnMissingBean(name = "xssJacksonCustomizer")
    @ConditionalOnProperty(value = "znl.xss.enable", havingValue = "true")
    public Jackson2ObjectMapperBuilderCustomizer xssJacksonCustomizer(XssProperties properties,
                                                                      PathMatcher pathMatcher,
                                                                      XssCleaner xssCleaner) {
        
        return builder ->
                builder.deserializerByType(String.class, new XssStringJsonDeserializer(properties, pathMatcher, xssCleaner));
    }

    
    @Bean
    @ConditionalOnBean(XssCleaner.class)
    public FilterRegistrationBean<XssFilter> xssFilter(XssProperties properties, PathMatcher pathMatcher, XssCleaner xssCleaner) {
        return createFilterBean(new XssFilter(properties, pathMatcher, xssCleaner), WebFilterOrderEnum.XSS_FILTER);
    }

}
