package com.zcashjava.znl.module.system.service.logger;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.api.logger.dto.LoginLogCreateReqDTO;
import com.zcashjava.znl.module.system.controller.admin.logger.vo.loginlog.LoginLogPageReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.logger.LoginLogDO;


public interface LoginLogService {

    
    PageResult<LoginLogDO> getLoginLogPage(LoginLogPageReqVO pageReqVO);

    
    void createLoginLog(@Valid LoginLogCreateReqDTO reqDTO);

}
