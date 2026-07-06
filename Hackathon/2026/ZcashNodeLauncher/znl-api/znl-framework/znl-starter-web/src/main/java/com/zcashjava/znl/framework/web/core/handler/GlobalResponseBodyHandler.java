package com.zcashjava.znl.framework.web.core.handler;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.web.core.util.WebFrameworkUtils;


@ControllerAdvice
public class GlobalResponseBodyHandler implements ResponseBodyAdvice {

    @Override
    @SuppressWarnings("NullableProblems") 
    public boolean supports(MethodParameter returnType, Class converterType) {
        if (returnType.getMethod() == null) {
            return false;
        }
        
        return returnType.getMethod().getReturnType() == CommonResult.class;
    }

    @Override
    @SuppressWarnings("NullableProblems") 
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType,
                                  ServerHttpRequest request, ServerHttpResponse response) {
        
        WebFrameworkUtils.setCommonResult(((ServletServerHttpRequest) request).getServletRequest(), (CommonResult<?>) body);
        return body;
    }

}
