package com.zcashjava.znl.module.infra.service.logger;

import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiAccessLogCreateReqDTO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.infra.controller.admin.logger.vo.apiaccesslog.ApiAccessLogPageReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.logger.ApiAccessLogDO;


public interface ApiAccessLogService {

    
    void createApiAccessLog(ApiAccessLogCreateReqDTO createReqDTO);

    
    PageResult<ApiAccessLogDO> getApiAccessLogPage(ApiAccessLogPageReqVO pageReqVO);

    
    Integer cleanAccessLog(Integer exceedDay, Integer deleteLimit);

}
