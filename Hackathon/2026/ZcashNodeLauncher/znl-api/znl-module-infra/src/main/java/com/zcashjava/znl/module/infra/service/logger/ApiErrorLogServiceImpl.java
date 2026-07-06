package com.zcashjava.znl.module.infra.service.logger;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.framework.common.biz.infra.logger.dto.ApiErrorLogCreateReqDTO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.common.util.string.StrUtils;
import com.zcashjava.znl.framework.tenant.core.context.TenantContextHolder;
import com.zcashjava.znl.framework.tenant.core.util.TenantUtils;
import com.zcashjava.znl.module.infra.controller.admin.logger.vo.apierrorlog.ApiErrorLogPageReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.logger.ApiErrorLogDO;
import com.zcashjava.znl.module.infra.dal.mysql.logger.ApiErrorLogMapper;
import com.zcashjava.znl.module.infra.enums.logger.ApiErrorLogProcessStatusEnum;

import javax.annotation.Resource;
import java.time.LocalDateTime;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.infra.dal.dataobject.logger.ApiErrorLogDO.REQUEST_PARAMS_MAX_LENGTH;
import static com.zcashjava.znl.module.infra.enums.ErrorCodeConstants.API_ERROR_LOG_NOT_FOUND;
import static com.zcashjava.znl.module.infra.enums.ErrorCodeConstants.API_ERROR_LOG_PROCESSED;


@Service
@Validated
@Slf4j
public class ApiErrorLogServiceImpl implements ApiErrorLogService {

    @Resource
    private ApiErrorLogMapper apiErrorLogMapper;

    @Override
    public void createApiErrorLog(ApiErrorLogCreateReqDTO createDTO) {
        ApiErrorLogDO apiErrorLog = BeanUtils.toBean(createDTO, ApiErrorLogDO.class);
        apiErrorLog.setProcessStatus(ApiErrorLogProcessStatusEnum.INIT.getStatus());
        apiErrorLog.setRequestParams(StrUtils.maxLength(apiErrorLog.getRequestParams(), REQUEST_PARAMS_MAX_LENGTH));
        try {
            if (TenantContextHolder.getTenantId() != null) {
                apiErrorLogMapper.insert(apiErrorLog);
            } else {
                
                TenantUtils.executeIgnore(() -> apiErrorLogMapper.insert(apiErrorLog));
            }
        } catch (Exception ex) {
            
            log.error("[createApiErrorLog] [Recording during ({}) An anomaly]", createDTO, ex);
        }
    }

    @Override
    public PageResult<ApiErrorLogDO> getApiErrorLogPage(ApiErrorLogPageReqVO pageReqVO) {
        return apiErrorLogMapper.selectPage(pageReqVO);
    }

    @Override
    public void updateApiErrorLogProcess(Long id, Integer processStatus, Long processUserId) {
        ApiErrorLogDO errorLog = apiErrorLogMapper.selectById(id);
        if (errorLog == null) {
            throw exception(API_ERROR_LOG_NOT_FOUND);
        }
        if (!ApiErrorLogProcessStatusEnum.INIT.getStatus().equals(errorLog.getProcessStatus())) {
            throw exception(API_ERROR_LOG_PROCESSED);
        }
        
        apiErrorLogMapper.updateById(ApiErrorLogDO.builder().id(id).processStatus(processStatus)
                .processUserId(processUserId).processTime(LocalDateTime.now()).build());
    }

    @Override
    @SuppressWarnings("DuplicatedCode")
    public Integer cleanErrorLog(Integer exceedDay, Integer deleteLimit) {
        int count = 0;
        LocalDateTime expireDate = LocalDateTime.now().minusDays(exceedDay);
        
        for (int i = 0; i < Short.MAX_VALUE; i++) {
            int deleteCount = apiErrorLogMapper.deleteByCreateTimeLt(expireDate, deleteLimit);
            count += deleteCount;
            
            if (deleteCount < deleteLimit) {
                break;
            }
        }
        return count;
    }

}
