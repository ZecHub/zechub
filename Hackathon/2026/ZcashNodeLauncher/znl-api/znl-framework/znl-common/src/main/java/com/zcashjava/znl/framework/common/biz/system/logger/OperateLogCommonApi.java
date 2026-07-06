package com.zcashjava.znl.framework.common.biz.system.logger;

import org.springframework.scheduling.annotation.Async;

import com.zcashjava.znl.framework.common.biz.system.logger.dto.OperateLogCreateReqDTO;

import javax.validation.Valid;


public interface OperateLogCommonApi {

    
    void createOperateLog(@Valid OperateLogCreateReqDTO createReqDTO);

    
    @Async
    default void createOperateLogAsync(OperateLogCreateReqDTO createReqDTO) {
        createOperateLog(createReqDTO);
    }

}
