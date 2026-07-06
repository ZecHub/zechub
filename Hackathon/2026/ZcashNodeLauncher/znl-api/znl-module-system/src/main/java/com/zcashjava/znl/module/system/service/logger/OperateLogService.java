package com.zcashjava.znl.module.system.service.logger;

import com.zcashjava.znl.framework.common.biz.system.logger.dto.OperateLogCreateReqDTO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.api.logger.dto.OperateLogPageReqDTO;
import com.zcashjava.znl.module.system.controller.admin.logger.vo.operatelog.OperateLogPageReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.logger.OperateLogDO;


public interface OperateLogService {

    
    void createOperateLog(OperateLogCreateReqDTO createReqDTO);

    
    PageResult<OperateLogDO> getOperateLogPage(OperateLogPageReqVO pageReqVO);

    
    PageResult<OperateLogDO> getOperateLogPage(OperateLogPageReqDTO pageReqVO);

}
