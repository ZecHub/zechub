package com.zcashjava.znl.server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;

import static com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants.NOT_IMPLEMENTED;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;


@RestController
@Slf4j
public class DefaultController {


    
    @RequestMapping(value = { "/test" })
    @PermitAll
    public CommonResult<Boolean> test(HttpServletRequest request) {
        
        log.info("Query: {}", ServletUtils.getParamMap(request));
        
        log.info("Header: {}", ServletUtils.getHeaderMap(request));
        
        log.info("Body: {}", ServletUtils.getBody(request));
        return CommonResult.success(true);
    }

}
