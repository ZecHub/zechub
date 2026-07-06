package com.zcashjava.znl.framework.xss.core.filter;

import lombok.AllArgsConstructor;
import org.springframework.util.PathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.zcashjava.znl.framework.xss.config.XssProperties;
import com.zcashjava.znl.framework.xss.core.clean.XssCleaner;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@AllArgsConstructor
public class XssFilter extends OncePerRequestFilter {

    
    private final XssProperties properties;
    
    private final PathMatcher pathMatcher;

    private final XssCleaner xssCleaner;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        filterChain.doFilter(new XssRequestWrapper(request, xssCleaner), response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        
        if (!properties.isEnable()) {
            return true;
        }

        
        String uri = request.getRequestURI();
        return properties.getExcludeUrls().stream().anyMatch(excludeUrl -> pathMatcher.match(excludeUrl, uri));
    }

}
