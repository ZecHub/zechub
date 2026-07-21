package com.zcashjava.znl.framework.security.core.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.ExceptionTranslationFilter;

import com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;

import static com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants.UNAUTHORIZED;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Slf4j
@SuppressWarnings("JavadocReference") 
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) {
        log.debug("[commence] [access to URL ({}), no login]", request.getRequestURI(), e);
        
        ServletUtils.writeJSON(response, CommonResult.error(UNAUTHORIZED));
    }

}
