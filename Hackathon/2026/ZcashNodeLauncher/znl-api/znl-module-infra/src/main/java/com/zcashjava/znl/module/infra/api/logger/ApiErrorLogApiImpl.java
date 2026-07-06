package com.zcashjava.znl.module.infra.api.logger;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.biz.infra.logger.ApiErrorLogCommonApi;
import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiErrorLogCreateReqDTO;
import com.zcashjava.znl.module.infra.service.logger.ApiErrorLogService;

import javax.annotation.Resource;


@Service
@Validated
public class ApiErrorLogApiImpl implements ApiErrorLogCommonApi {

    @Resource
    private ApiErrorLogService apiErrorLogService;

    @Override
    public void createApiErrorLog(ApiErrorLogCreateReqDTO createDTO) {
        apiErrorLogService.createApiErrorLog(createDTO);
    }

}
