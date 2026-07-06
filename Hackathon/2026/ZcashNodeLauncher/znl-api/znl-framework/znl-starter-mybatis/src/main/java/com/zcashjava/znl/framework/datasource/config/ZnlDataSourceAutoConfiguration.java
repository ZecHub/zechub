package com.zcashjava.znl.framework.datasource.config;

import com.alibaba.druid.spring.boot.autoconfigure.properties.DruidStatProperties;
import com.zcashjava.znl.framework.datasource.core.filter.DruidAdRemoveFilter;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@AutoConfiguration
@EnableTransactionManagement(proxyTargetClass = true) 
@EnableConfigurationProperties(DruidStatProperties.class)
public class ZnlDataSourceAutoConfiguration {

    
    @Bean
    @ConditionalOnProperty(name = "spring.datasource.druid.stat-view-servlet.enabled", havingValue = "true")
    public FilterRegistrationBean<DruidAdRemoveFilter> druidAdRemoveFilterFilter(DruidStatProperties properties) {
        
        DruidStatProperties.StatViewServlet config = properties.getStatViewServlet();
        
        String pattern = config.getUrlPattern() != null ? config.getUrlPattern() : "/druid/*";
        String commonJsPattern = pattern.replaceAll("\\*", "js/common.js");
        
        FilterRegistrationBean<DruidAdRemoveFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new DruidAdRemoveFilter());
        registrationBean.addUrlPatterns(commonJsPattern);
        return registrationBean;
    }

}
