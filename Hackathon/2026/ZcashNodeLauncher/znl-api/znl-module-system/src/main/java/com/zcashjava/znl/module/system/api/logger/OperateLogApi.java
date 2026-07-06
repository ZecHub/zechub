package com.zcashjava.znl.module.system.api.logger;

import com.zcashjava.znl.framework.common.biz.system.logger.OperateLogCommonApi;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.api.logger.dto.OperateLogPageReqDTO;
import com.zcashjava.znl.module.system.api.logger.dto.OperateLogRespDTO;


public interface OperateLogApi extends OperateLogCommonApi {

    
    PageResult<OperateLogRespDTO> getOperateLogPage(OperateLogPageReqDTO pageReqDTO);

}
