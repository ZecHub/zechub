package com.zcashjava.znl.framework.security.config;

import cn.hutool.core.collection.CollUtil;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import com.zcashjava.znl.framework.security.core.filter.TokenAuthenticationFilter;
import com.zcashjava.znl.framework.web.config.WebProperties;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.pattern.PathPattern;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.servlet.DispatcherType;

import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertList;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;


@AutoConfiguration
@AutoConfigureOrder(-1) 
@EnableMethodSecurity(securedEnabled = true)
public class ZnlWebSecurityConfigurerAdapter {

    @Resource
    private WebProperties webProperties;
    @Resource
    private SecurityProperties securityProperties;

    
    @Resource
    private AuthenticationEntryPoint authenticationEntryPoint;
    
    @Resource
    private AccessDeniedHandler accessDeniedHandler;
    
    @Resource
    private TokenAuthenticationFilter authenticationTokenFilter;

    
    @Resource
    private List<AuthorizeRequestsCustomizer> authorizeRequestsCustomizers;

    @Resource
    private ApplicationContext applicationContext;

    
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        
        httpSecurity
                
                .cors(Customizer.withDefaults())
                
                .csrf(AbstractHttpConfigurer::disable)
                
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(c -> c.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                
                .exceptionHandling(c -> c.authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler));
        

        
        Multimap<HttpMethod, String> permitAllUrls = getPermitAllUrlsFromAnnotations();
        
        httpSecurity
                
                .authorizeHttpRequests(c -> c
                    
                    .requestMatchers(HttpMethod.GET, "/*.html", "/*.css", "/*.js").permitAll()
                    
                    .requestMatchers(HttpMethod.GET, permitAllUrls.get(HttpMethod.GET).toArray(new String[0])).permitAll()
                    .requestMatchers(HttpMethod.POST, permitAllUrls.get(HttpMethod.POST).toArray(new String[0])).permitAll()
                    .requestMatchers(HttpMethod.PUT, permitAllUrls.get(HttpMethod.PUT).toArray(new String[0])).permitAll()
                    .requestMatchers(HttpMethod.DELETE, permitAllUrls.get(HttpMethod.DELETE).toArray(new String[0])).permitAll()
                    .requestMatchers(HttpMethod.HEAD, permitAllUrls.get(HttpMethod.HEAD).toArray(new String[0])).permitAll()
                    .requestMatchers(HttpMethod.PATCH, permitAllUrls.get(HttpMethod.PATCH).toArray(new String[0])).permitAll()
                    
                    .requestMatchers(securityProperties.getPermitAllUrls().toArray(new String[0])).permitAll()
                )
                
                .authorizeHttpRequests(c -> authorizeRequestsCustomizers.forEach(customizer -> customizer.customize(c)))
                
                .authorizeHttpRequests(c -> c
                        .dispatcherTypeMatchers(DispatcherType.ASYNC).permitAll() 
                        .anyRequest().authenticated());

        
        httpSecurity.addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    private String buildAppApi(String url) {
        return webProperties.getAppApi().getPrefix() + url;
    }

    private Multimap<HttpMethod, String> getPermitAllUrlsFromAnnotations() {
        Multimap<HttpMethod, String> result = HashMultimap.create();
        
        RequestMappingHandlerMapping requestMappingHandlerMapping = (RequestMappingHandlerMapping)
                applicationContext.getBean("requestMappingHandlerMapping");
        Map<RequestMappingInfo, HandlerMethod> handlerMethodMap = requestMappingHandlerMapping.getHandlerMethods();
        
        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : handlerMethodMap.entrySet()) {
            HandlerMethod handlerMethod = entry.getValue();
            if (!handlerMethod.hasMethodAnnotation(PermitAll.class) 
                && !handlerMethod.getBeanType().isAnnotationPresent(PermitAll.class)) { 
                continue;
            }
            Set<String> urls = new HashSet<>();
            if (entry.getKey().getPatternsCondition() != null) {
                urls.addAll(entry.getKey().getPatternsCondition().getPatterns());
            }
            if (entry.getKey().getPathPatternsCondition() != null) {
                urls.addAll(convertList(entry.getKey().getPathPatternsCondition().getPatterns(), PathPattern::getPatternString));
            }
            if (urls.isEmpty()) {
                continue;
            }

            
            Set<RequestMethod> methods = entry.getKey().getMethodsCondition().getMethods();
            if (CollUtil.isEmpty(methods)) {
                result.putAll(HttpMethod.GET, urls);
                result.putAll(HttpMethod.POST, urls);
                result.putAll(HttpMethod.PUT, urls);
                result.putAll(HttpMethod.DELETE, urls);
                result.putAll(HttpMethod.HEAD, urls);
                result.putAll(HttpMethod.PATCH, urls);
                continue;
            }
            
            entry.getKey().getMethodsCondition().getMethods().forEach(requestMethod -> {
                switch (requestMethod) {
                    case GET:
                        result.putAll(HttpMethod.GET, urls);
                        break;
                    case POST:
                        result.putAll(HttpMethod.POST, urls);
                        break;
                    case PUT:
                        result.putAll(HttpMethod.PUT, urls);
                        break;
                    case DELETE:
                        result.putAll(HttpMethod.DELETE, urls);
                        break;
                    case HEAD:
                        result.putAll(HttpMethod.HEAD, urls);
                        break;
                    case PATCH:
                        result.putAll(HttpMethod.PATCH, urls);
                        break;
                }
            });
        }
        return result;
    }

}
