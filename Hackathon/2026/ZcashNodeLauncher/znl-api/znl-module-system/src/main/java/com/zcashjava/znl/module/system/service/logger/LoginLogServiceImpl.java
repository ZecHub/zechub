package com.zcashjava.znl.module.system.service.logger;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.api.logger.dto.LoginLogCreateReqDTO;
import com.zcashjava.znl.module.system.controller.admin.logger.vo.loginlog.LoginLogPageReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.logger.LoginLogDO;
import com.zcashjava.znl.module.system.dal.mysql.logger.LoginLogMapper;

import javax.annotation.Resource;


@Service
@Validated
public class LoginLogServiceImpl implements LoginLogService {

    @Resource
    private LoginLogMapper loginLogMapper;

    @Override
    public PageResult<LoginLogDO> getLoginLogPage(LoginLogPageReqVO pageReqVO) {
        return loginLogMapper.selectPage(pageReqVO);
    }

    @Override
    public void createLoginLog(LoginLogCreateReqDTO reqDTO) {
        LoginLogDO loginLog = BeanUtils.toBean(reqDTO, LoginLogDO.class);
        loginLogMapper.insert(loginLog);
    }

}
