package com.zcashjava.znl.module.infra.api.logger;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.biz.infra.logger.ApiAccessLogCommonApi;
import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiAccessLogCreateReqDTO;
import com.zcashjava.znl.module.infra.service.logger.ApiAccessLogService;

import javax.annotation.Resource;


@Service
@Validated
public class ApiAccessLogApiImpl implements ApiAccessLogCommonApi {

    @Resource
    private ApiAccessLogService apiAccessLogService;

    @Override
    public void createApiAccessLog(ApiAccessLogCreateReqDTO createDTO) {
        apiAccessLogService.createApiAccessLog(createDTO);
    }

}
