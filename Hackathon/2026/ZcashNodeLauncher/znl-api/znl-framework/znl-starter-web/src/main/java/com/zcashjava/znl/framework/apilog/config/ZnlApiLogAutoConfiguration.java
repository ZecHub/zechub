package com.zcashjava.znl.framework.apilog.config;

import javax.servlet.Filter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.zcashjava.znl.framework.apilog.core.filter.ApiAccessLogFilter;
import com.zcashjava.znl.framework.apilog.core.interceptor.ApiAccessLogInterceptor;
import com.zcashjava.znl.framework.common.biz.infra.logger.ApiAccessLogCommonApi;
import com.zcashjava.znl.framework.common.enums.WebFilterOrderEnum;
import com.zcashjava.znl.framework.web.config.WebProperties;
import com.zcashjava.znl.framework.web.config.ZnlWebAutoConfiguration;

@AutoConfiguration(after = ZnlWebAutoConfiguration.class)
public class ZnlApiLogAutoConfiguration implements WebMvcConfigurer {

    
    @Bean
    @ConditionalOnProperty(prefix = "znl.access-log", value = "enable", matchIfMissing = true) 
    public FilterRegistrationBean<ApiAccessLogFilter> apiAccessLogFilter(WebProperties webProperties,
                                                                         @Value("${spring.application.name}") String applicationName,
                                                                         ApiAccessLogCommonApi apiAccessLogApi) {
        ApiAccessLogFilter filter = new ApiAccessLogFilter(webProperties, applicationName, apiAccessLogApi);
        return createFilterBean(filter, WebFilterOrderEnum.API_ACCESS_LOG_FILTER);
    }

    private static <T extends Filter> FilterRegistrationBean<T> createFilterBean(T filter, Integer order) {
        FilterRegistrationBean<T> bean = new FilterRegistrationBean<>(filter);
        bean.setOrder(order);
        return bean;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ApiAccessLogInterceptor());
    }

}
