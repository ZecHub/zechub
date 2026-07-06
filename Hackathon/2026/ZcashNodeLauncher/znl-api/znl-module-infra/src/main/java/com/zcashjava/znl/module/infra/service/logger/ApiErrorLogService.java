package com.zcashjava.znl.module.infra.service.logger;

import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiErrorLogCreateReqDTO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.infra.controller.admin.logger.vo.apierrorlog.ApiErrorLogPageReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.logger.ApiErrorLogDO;


public interface ApiErrorLogService {

    
    void createApiErrorLog(ApiErrorLogCreateReqDTO createReqDTO);

    
    PageResult<ApiErrorLogDO> getApiErrorLogPage(ApiErrorLogPageReqVO pageReqVO);

    
    void updateApiErrorLogProcess(Long id, Integer processStatus, Long processUserId);

    
    Integer cleanErrorLog(Integer exceedDay, Integer deleteLimit);

}
