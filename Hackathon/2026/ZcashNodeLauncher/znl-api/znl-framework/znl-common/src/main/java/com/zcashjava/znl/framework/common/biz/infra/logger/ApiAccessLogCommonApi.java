package com.zcashjava.znl.framework.common.biz.infra.logger;

import org.springframework.scheduling.annotation.Async;

import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiAccessLogCreateReqDTO;

import javax.validation.Valid;


public interface ApiAccessLogCommonApi {

    
    void createApiAccessLog(@Valid ApiAccessLogCreateReqDTO createDTO);

    
    @Async
    default void createApiAccessLogAsync(ApiAccessLogCreateReqDTO createDTO) {
        createApiAccessLog(createDTO);
    }

}
