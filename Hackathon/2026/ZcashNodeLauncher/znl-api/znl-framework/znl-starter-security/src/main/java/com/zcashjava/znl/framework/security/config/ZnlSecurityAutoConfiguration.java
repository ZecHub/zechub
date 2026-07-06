package com.zcashjava.znl.framework.security.config;

import javax.annotation.Resource;
import org.springframework.beans.factory.config.MethodInvokingFactoryBean;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.zcashjava.znl.framework.common.biz.system.oauth2.OAuth2TokenCommonApi;
import com.zcashjava.znl.framework.common.biz.system.permission.PermissionCommonApi;
import com.zcashjava.znl.framework.security.core.context.TransmittableThreadLocalSecurityContextHolderStrategy;
import com.zcashjava.znl.framework.security.core.filter.TokenAuthenticationFilter;
import com.zcashjava.znl.framework.security.core.handler.AccessDeniedHandlerImpl;
import com.zcashjava.znl.framework.security.core.handler.AuthenticationEntryPointImpl;
import com.zcashjava.znl.framework.security.core.service.SecurityFrameworkService;
import com.zcashjava.znl.framework.security.core.service.SecurityFrameworkServiceImpl;
import com.zcashjava.znl.framework.web.core.handler.GlobalExceptionHandler;


@AutoConfiguration
@AutoConfigureOrder(-1) 
@EnableConfigurationProperties(SecurityProperties.class)
public class ZnlSecurityAutoConfiguration {

    @Resource
    private SecurityProperties securityProperties;

    
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new AuthenticationEntryPointImpl();
    }

    
    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new AccessDeniedHandlerImpl();
    }

    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(securityProperties.getPasswordEncoderLength());
    }

    
    @Bean
    public TokenAuthenticationFilter authenticationTokenFilter(GlobalExceptionHandler globalExceptionHandler,
                                                               OAuth2TokenCommonApi oauth2TokenApi) {
        return new TokenAuthenticationFilter(securityProperties, globalExceptionHandler, oauth2TokenApi);
    }

    @Bean("ss") 
    public SecurityFrameworkService securityFrameworkService(PermissionCommonApi permissionApi) {
        return new SecurityFrameworkServiceImpl(permissionApi);
    }

    
    @Bean
    public MethodInvokingFactoryBean securityContextHolderMethodInvokingFactoryBean() {
        MethodInvokingFactoryBean methodInvokingFactoryBean = new MethodInvokingFactoryBean();
        methodInvokingFactoryBean.setTargetClass(SecurityContextHolder.class);
        methodInvokingFactoryBean.setTargetMethod("setStrategyName");
        methodInvokingFactoryBean.setArguments(TransmittableThreadLocalSecurityContextHolderStrategy.class.getName());
        return methodInvokingFactoryBean;
    }

}
