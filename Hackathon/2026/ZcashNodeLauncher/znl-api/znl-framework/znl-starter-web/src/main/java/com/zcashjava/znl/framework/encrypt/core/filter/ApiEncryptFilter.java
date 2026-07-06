package com.zcashjava.znl.framework.encrypt.core.filter;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.asymmetric.AsymmetricDecryptor;
import cn.hutool.crypto.asymmetric.AsymmetricEncryptor;
import cn.hutool.crypto.symmetric.SymmetricDecryptor;
import cn.hutool.crypto.symmetric.SymmetricEncryptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.ServletRequestPathUtils;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.object.ObjectUtils;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;
import com.zcashjava.znl.framework.encrypt.config.ApiEncryptProperties;
import com.zcashjava.znl.framework.encrypt.core.annotation.ApiEncrypt;
import com.zcashjava.znl.framework.web.config.WebProperties;
import com.zcashjava.znl.framework.web.core.filter.ApiRequestFilter;
import com.zcashjava.znl.framework.web.core.handler.GlobalExceptionHandler;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.invalidParamException;

import java.io.IOException;


@Slf4j
public class ApiEncryptFilter extends ApiRequestFilter {

    private final ApiEncryptProperties apiEncryptProperties;

    private final RequestMappingHandlerMapping requestMappingHandlerMapping;

    private final GlobalExceptionHandler globalExceptionHandler;

    private final SymmetricDecryptor requestSymmetricDecryptor;
    private final AsymmetricDecryptor requestAsymmetricDecryptor;

    private final SymmetricEncryptor responseSymmetricEncryptor;
    private final AsymmetricEncryptor responseAsymmetricEncryptor;

    public ApiEncryptFilter(WebProperties webProperties,
                            ApiEncryptProperties apiEncryptProperties,
                            RequestMappingHandlerMapping requestMappingHandlerMapping,
                            GlobalExceptionHandler globalExceptionHandler) {
        super(webProperties);
        this.apiEncryptProperties = apiEncryptProperties;
        this.requestMappingHandlerMapping = requestMappingHandlerMapping;
        this.globalExceptionHandler = globalExceptionHandler;
        if (StrUtil.equalsIgnoreCase(apiEncryptProperties.getAlgorithm(), "AES")) {
            this.requestSymmetricDecryptor = SecureUtil.aes(StrUtil.utf8Bytes(apiEncryptProperties.getRequestKey()));
            this.requestAsymmetricDecryptor = null;
            this.responseSymmetricEncryptor = SecureUtil.aes(StrUtil.utf8Bytes(apiEncryptProperties.getResponseKey()));
            this.responseAsymmetricEncryptor = null;
        } else if (StrUtil.equalsIgnoreCase(apiEncryptProperties.getAlgorithm(), "RSA")) {
            this.requestSymmetricDecryptor = null;
            this.requestAsymmetricDecryptor = SecureUtil.rsa(apiEncryptProperties.getRequestKey(), null);
            this.responseSymmetricEncryptor = null;
            this.responseAsymmetricEncryptor = SecureUtil.rsa(null, apiEncryptProperties.getResponseKey());
        } else {
            
            throw new IllegalArgumentException("Unsupported encryption algorithms:" + apiEncryptProperties.getAlgorithm());
        }
    }

    @Override
    @SuppressWarnings("NullableProblems")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        ApiEncrypt apiEncrypt = getApiEncrypt(request);
        boolean requestEnable = apiEncrypt != null && apiEncrypt.request();
        boolean responseEnable = apiEncrypt != null && apiEncrypt.response();
        String encryptHeader = request.getHeader(apiEncryptProperties.getHeader());
        if (!requestEnable && !responseEnable && StrUtil.isBlank(encryptHeader))  {
            chain.doFilter(request, response);
            return;
        }

        
        if (ObjectUtils.equalsAny(HttpMethod.valueOf(request.getMethod()),
                HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE)) {
            try {
                if (StrUtil.isNotBlank(encryptHeader)) {
                    request = new ApiDecryptRequestWrapper(request,
                            requestSymmetricDecryptor, requestAsymmetricDecryptor);
                } else if (requestEnable) {
                    throw invalidParamException("The request does not contain the encryption header. Check if the encryption header is correctly configured");
                }
            } catch (Exception ex) {
                CommonResult<?> result = globalExceptionHandler.allExceptionHandler(request, ex);
                ServletUtils.writeJSON(response, result);
                return;
            }
        }

        
        if (responseEnable) {
            
            response = new ApiEncryptResponseWrapper(response);
        }
        chain.doFilter(request, response);

        
        if (responseEnable) {
            ((ApiEncryptResponseWrapper) response).encrypt(apiEncryptProperties,
                    responseSymmetricEncryptor, responseAsymmetricEncryptor);
        }
    }

    
    @SuppressWarnings("PatternVariableCanBeUsed")
    private ApiEncrypt getApiEncrypt(HttpServletRequest request) {
        try {
            
            if (!ServletRequestPathUtils.hasParsedRequestPath(request)) {
                ServletRequestPathUtils.parseAndCache(request);
            }

            
            HandlerExecutionChain mappingHandler = requestMappingHandlerMapping.getHandler(request);
            if (mappingHandler == null) {
                return null;
            }
            Object handler = mappingHandler.getHandler();
            if (handler instanceof HandlerMethod) {
                HandlerMethod handlerMethod = (HandlerMethod) handler;
                ApiEncrypt annotation = handlerMethod.getMethodAnnotation(ApiEncrypt.class);
                if (annotation == null) {
                    annotation = handlerMethod.getBeanType().getAnnotation(ApiEncrypt.class);
                }
                return annotation;
            }
        } catch (Exception e) {
            log.error("[getApiEncrypt][url({}) Fetching @ApiEncrypt Note Failed]",
                    request.getRequestURI(), request.getMethod(), e);
        }
        return null;
    }

}
