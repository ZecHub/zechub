package com.zcashjava.znl.module.system.api.logger;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.biz.system.logger.dto.OperateLogCreateReqDTO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.api.logger.dto.OperateLogPageReqDTO;
import com.zcashjava.znl.module.system.api.logger.dto.OperateLogRespDTO;
import com.zcashjava.znl.module.system.dal.dataobject.logger.OperateLogDO;
import com.zcashjava.znl.module.system.service.logger.OperateLogService;

import javax.annotation.Resource;


@Service
@Validated
public class OperateLogApiImpl implements OperateLogApi {

    @Resource
    private OperateLogService operateLogService;

    @Override
    public void createOperateLog(OperateLogCreateReqDTO createReqDTO) {
        operateLogService.createOperateLog(createReqDTO);
    }

    @Override
    public PageResult<OperateLogRespDTO> getOperateLogPage(OperateLogPageReqDTO pageReqDTO) {
        PageResult<OperateLogDO> operateLogPage = operateLogService.getOperateLogPage(pageReqDTO);
        return BeanUtils.toBean(operateLogPage, OperateLogRespDTO.class);
    }

}
