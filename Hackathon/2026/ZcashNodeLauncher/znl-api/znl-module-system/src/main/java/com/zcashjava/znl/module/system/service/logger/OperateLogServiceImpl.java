package com.zcashjava.znl.module.system.service.logger;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.biz.system.logger.dto.OperateLogCreateReqDTO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.api.logger.dto.OperateLogPageReqDTO;
import com.zcashjava.znl.module.system.controller.admin.logger.vo.operatelog.OperateLogPageReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.logger.OperateLogDO;
import com.zcashjava.znl.module.system.dal.mysql.logger.OperateLogMapper;

import javax.annotation.Resource;


@Service
@Validated
@Slf4j
public class OperateLogServiceImpl implements OperateLogService {

    @Resource
    private OperateLogMapper operateLogMapper;

    @Override
    public void createOperateLog(OperateLogCreateReqDTO createReqDTO) {
        OperateLogDO log = BeanUtils.toBean(createReqDTO, OperateLogDO.class);
        operateLogMapper.insert(log);
    }

    @Override
    public PageResult<OperateLogDO> getOperateLogPage(OperateLogPageReqVO pageReqVO) {
        return operateLogMapper.selectPage(pageReqVO);
    }

    @Override
    public PageResult<OperateLogDO> getOperateLogPage(OperateLogPageReqDTO pageReqDTO) {
        return operateLogMapper.selectPage(pageReqDTO);
    }

}
