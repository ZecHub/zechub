package com.zcashjava.znl.framework.web.core.filter;

import cn.hutool.core.util.StrUtil;

import org.springframework.web.filter.OncePerRequestFilter;

import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class CacheRequestBodyFilter extends OncePerRequestFilter {

    
    private static final String[] IGNORE_URIS = {"/admin/", "/actuator/"};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        filterChain.doFilter(new CacheRequestBodyWrapper(request), response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        
        String requestURI = request.getRequestURI();
        if (StrUtil.startWithAny(requestURI, IGNORE_URIS)) {
            return true;
        }

        
        return !ServletUtils.isJsonRequest(request);
    }

}
