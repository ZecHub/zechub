package com.zcashjava.znl.framework.common.biz.infra.logger;

import org.springframework.scheduling.annotation.Async;

import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiErrorLogCreateReqDTO;

import javax.validation.Valid;


public interface ApiErrorLogCommonApi {

    
    void createApiErrorLog(@Valid ApiErrorLogCreateReqDTO createDTO);

    
    @Async
    default void createApiErrorLogAsync(ApiErrorLogCreateReqDTO createDTO) {
        createApiErrorLog(createDTO);
    }

}
