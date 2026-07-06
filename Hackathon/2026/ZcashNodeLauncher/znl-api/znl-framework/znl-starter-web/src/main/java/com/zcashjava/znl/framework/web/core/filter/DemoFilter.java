package com.zcashjava.znl.framework.web.core.filter;

import cn.hutool.core.util.StrUtil;

import org.springframework.web.filter.OncePerRequestFilter;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;
import com.zcashjava.znl.framework.web.core.util.WebFrameworkUtils;

import static com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants.DEMO_DENY;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class DemoFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String method = request.getMethod();
        return !StrUtil.equalsAnyIgnoreCase(method, "POST", "PUT", "DELETE")  
                || WebFrameworkUtils.getLoginUserId(request) == null; 
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        
        ServletUtils.writeJSON(response, CommonResult.error(DEMO_DENY));
    }

}
