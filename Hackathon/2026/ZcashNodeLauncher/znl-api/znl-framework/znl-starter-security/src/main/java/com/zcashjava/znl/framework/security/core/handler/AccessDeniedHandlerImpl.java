package com.zcashjava.znl.framework.security.core.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.stereotype.Component;

import com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants.FORBIDDEN;
import static com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants.UNAUTHORIZED;

import java.io.IOException;


@Slf4j
@SuppressWarnings("JavadocReference")
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException e)
            throws IOException, ServletException {
        
        log.warn("[Commence] [Access to URL ({}), the user ({}) does not have sufficient permissions]", request.getRequestURI(),
                SecurityFrameworkUtils.getLoginUserId(), e);
        
        ServletUtils.writeJSON(response, CommonResult.error(FORBIDDEN));
    }

}
