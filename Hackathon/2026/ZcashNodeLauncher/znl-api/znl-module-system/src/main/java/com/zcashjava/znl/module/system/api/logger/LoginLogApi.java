package com.zcashjava.znl.module.system.api.logger;

import javax.validation.Valid;

import com.zcashjava.znl.module.system.api.logger.dto.LoginLogCreateReqDTO;


public interface LoginLogApi {

    
    void createLoginLog(@Valid LoginLogCreateReqDTO reqDTO);

}
