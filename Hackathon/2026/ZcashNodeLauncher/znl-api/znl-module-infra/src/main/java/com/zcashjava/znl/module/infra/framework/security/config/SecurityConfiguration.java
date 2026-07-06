package com.zcashjava.znl.module.infra.framework.security.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;

import com.zcashjava.znl.framework.security.config.AuthorizeRequestsCustomizer;


@Configuration(proxyBeanMethods = false, value = "infraSecurityConfiguration")
public class SecurityConfiguration {

    @Value("${spring.boot.admin.context-path:''}")
    private String adminSeverContextPath;

    @Bean("infraAuthorizeRequestsCustomizer")
    public AuthorizeRequestsCustomizer authorizeRequestsCustomizer() {
        return new AuthorizeRequestsCustomizer() {

            @Override
            public void customize(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) {
                
                registry.requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/webjars/**").permitAll()
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll();
                
                registry.requestMatchers("/actuator").permitAll()
                        .requestMatchers("/actuator/**").permitAll();
                
                registry.requestMatchers("/druid/**").permitAll();
                
                registry.requestMatchers(adminSeverContextPath).permitAll()
                        .requestMatchers(adminSeverContextPath + "/**").permitAll();
                
                registry.requestMatchers(buildAdminApi("/infra/file/*/get/**")).permitAll();
            }

        };
    }

}
