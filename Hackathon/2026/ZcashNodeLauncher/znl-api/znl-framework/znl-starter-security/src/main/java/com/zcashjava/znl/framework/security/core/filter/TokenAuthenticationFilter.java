package com.zcashjava.znl.framework.security.core.filter;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.filter.OncePerRequestFilter;

import com.zcashjava.znl.framework.common.biz.system.oauth2.OAuth2TokenCommonApi;
import com.zcashjava.znl.framework.common.biz.system.oauth2.dto.OAuth2AccessTokenCheckRespDTO;
import com.zcashjava.znl.framework.common.exception.ServiceException;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;
import com.zcashjava.znl.framework.security.config.SecurityProperties;
import com.zcashjava.znl.framework.security.core.LoginUser;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;
import com.zcashjava.znl.framework.web.core.handler.GlobalExceptionHandler;
import com.zcashjava.znl.framework.web.core.util.WebFrameworkUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final SecurityProperties securityProperties;

    private final GlobalExceptionHandler globalExceptionHandler;

    private final OAuth2TokenCommonApi oauth2TokenApi;

    @Override
    @SuppressWarnings("NullableProblems")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = SecurityFrameworkUtils.obtainAuthorization(request,
                securityProperties.getTokenHeader(), securityProperties.getTokenParameter());
        if (StrUtil.isNotEmpty(token)) {
            Integer userType = WebFrameworkUtils.getLoginUserType(request);
            try {
                
                LoginUser loginUser = buildLoginUserByToken(token, userType);
                
                if (loginUser == null) {
                    loginUser = mockLoginUser(request, token, userType);
                }

                
                if (loginUser != null) {
                    SecurityFrameworkUtils.setLoginUser(loginUser, request);
                }
            } catch (Throwable ex) {
                CommonResult<?> result = globalExceptionHandler.allExceptionHandler(request, ex);
                ServletUtils.writeJSON(response, result);
                return;
            }
        }

        
        chain.doFilter(request, response);
    }

    private LoginUser buildLoginUserByToken(String token, Integer userType) {
        try {
            OAuth2AccessTokenCheckRespDTO accessToken = oauth2TokenApi.checkAccessToken(token);
            if (accessToken == null) {
                return null;
            }
            
            
            
            if (userType != null
                    && ObjectUtil.notEqual(accessToken.getUserType(), userType)) {
                throw new AccessDeniedException("Wrong user type");
            }
            
            
            LoginUser result = new LoginUser();
            
            result.setId(accessToken.getUserId());
            result.setUserType(accessToken.getUserType());
            

            result.setInfo(accessToken.getUserInfo()); 
            result.setTenantId(accessToken.getTenantId());
            result.setScopes(accessToken.getScopes());
            result.setExpiresTime(accessToken.getExpiresTime());
            return result;
            
        } catch (ServiceException serviceException) {
            
            return null;
        }
    }

    
    private LoginUser mockLoginUser(HttpServletRequest request, String token, Integer userType) {
        if (!securityProperties.getMockEnable()) {
            return null;
        }
        
        if (!token.startsWith(securityProperties.getMockSecret())) {
            return null;
        }
        
        Long userId = Long.valueOf(token.substring(securityProperties.getMockSecret().length()));
        
        LoginUser result = new LoginUser();
        
        result.setId(userId);
        result.setUserType(userType);
        result.setTenantId(WebFrameworkUtils.getTenantId(request));
        
        return result;
    }

}
