package com.zcashjava.znl.module.system.api.logger;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.module.system.api.logger.dto.LoginLogCreateReqDTO;
import com.zcashjava.znl.module.system.service.logger.LoginLogService;

import javax.annotation.Resource;


@Service
@Validated
public class LoginLogApiImpl implements LoginLogApi {

    @Resource
    private LoginLogService loginLogService;

    @Override
    public void createLoginLog(LoginLogCreateReqDTO reqDTO) {
        loginLogService.createLoginLog(reqDTO);
    }

}
