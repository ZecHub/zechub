package com.zcashjava.znl.framework.tenant.core.security;

import cn.hutool.core.collection.CollUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.AntPathMatcher;

import com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;
import com.zcashjava.znl.framework.security.core.LoginUser;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;
import com.zcashjava.znl.framework.tenant.config.TenantProperties;
import com.zcashjava.znl.framework.tenant.core.context.TenantContextHolder;
import com.zcashjava.znl.framework.tenant.core.service.TenantFrameworkService;
import com.zcashjava.znl.framework.web.config.WebProperties;
import com.zcashjava.znl.framework.web.core.filter.ApiRequestFilter;
import com.zcashjava.znl.framework.web.core.handler.GlobalExceptionHandler;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;
import java.util.Set;


@Slf4j
public class TenantSecurityWebFilter extends ApiRequestFilter {

    private final TenantProperties tenantProperties;

    
    private final Set<String> ignoreUrls;

    private final AntPathMatcher pathMatcher;

    private final GlobalExceptionHandler globalExceptionHandler;
    private final TenantFrameworkService tenantFrameworkService;

    public TenantSecurityWebFilter(WebProperties webProperties,
                                   TenantProperties tenantProperties,
                                   Set<String> ignoreUrls,
                                   GlobalExceptionHandler globalExceptionHandler,
                                   TenantFrameworkService tenantFrameworkService) {
        super(webProperties);
        this.tenantProperties = tenantProperties;
        this.ignoreUrls = ignoreUrls;
        this.pathMatcher = new AntPathMatcher();
        this.globalExceptionHandler = globalExceptionHandler;
        this.tenantFrameworkService = tenantFrameworkService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        Long tenantId = TenantContextHolder.getTenantId();
        
        LoginUser user = SecurityFrameworkUtils.getLoginUser();
        if (user != null) {
            
            if (tenantId == null) {
                tenantId = user.getTenantId();
                TenantContextHolder.setTenantId(tenantId);
            
            } else if (!Objects.equals(user.getTenantId(), TenantContextHolder.getTenantId())) {
                log.error("[doFilterInternal] [tenant ({}) User ({/}) over-accessing tenant ({}) URL ({/{})]",
                        user.getTenantId(), user.getId(), user.getUserType(),
                        TenantContextHolder.getTenantId(), request.getRequestURI(), request.getMethod());
                ServletUtils.writeJSON(response, CommonResult.error(GlobalErrorCodeConstants.FORBIDDEN.getCode(),
                        "You do not have access to the tenant's data"));
                return;
            }
        }

        
        if (!isIgnoreUrl(request)) {
            
            if (tenantId == null) {
                log.error("[doFilterInternal] [URL({}/{}) does not transmit tenant number]", request.getRequestURI(), request.getMethod());
                ServletUtils.writeJSON(response, CommonResult.error(GlobalErrorCodeConstants.BAD_REQUEST.getCode(),
                        "The requested tenant identification was not sent, please check"));
                return;
            }
            
            try {
                tenantFrameworkService.validTenant(tenantId);
            } catch (Throwable ex) {
                CommonResult<?> result = globalExceptionHandler.allExceptionHandler(request, ex);
                ServletUtils.writeJSON(response, result);
                return;
            }
        } else { 
            if (tenantId == null) {
                TenantContextHolder.setIgnore(true);
            }
        }

        
        chain.doFilter(request, response);
    }

    private boolean isIgnoreUrl(HttpServletRequest request) {
        String apiUri = request.getRequestURI().substring(request.getContextPath().length());
        
        if (CollUtil.contains(tenantProperties.getIgnoreUrls(), apiUri)
            || CollUtil.contains(ignoreUrls, apiUri)) {
            return true;
        }
        
        for (String url : tenantProperties.getIgnoreUrls()) {
            if (pathMatcher.match(url, apiUri)) {
                return true;
            }
        }
        for (String url : ignoreUrls) {
            if (pathMatcher.match(url, apiUri)) {
                return true;
            }
        }
        return false;
    }

}
