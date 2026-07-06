package com.zcashjava.znl.framework.operatelog.core.service;

import com.mzt.logapi.beans.LogRecord;
import com.mzt.logapi.service.ILogRecordService;
import com.zcashjava.znl.framework.common.biz.system.logger.OperateLogCommonApi;
import com.zcashjava.znl.framework.common.biz.system.logger.dto.OperateLogCreateReqDTO;
import com.zcashjava.znl.framework.common.util.monitor.TracerUtils;
import com.zcashjava.znl.framework.common.util.servlet.ServletUtils;
import com.zcashjava.znl.framework.security.core.LoginUser;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;

import lombok.extern.slf4j.Slf4j;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Slf4j
public class LogRecordServiceImpl implements ILogRecordService {

    @Resource
    private OperateLogCommonApi operateLogApi;

    @Override
    public void record(LogRecord logRecord) {
        OperateLogCreateReqDTO reqDTO = new OperateLogCreateReqDTO();
        try {
            reqDTO.setTraceId(TracerUtils.getTraceId());
            
            fillUserFields(reqDTO);
            
            fillModuleFields(reqDTO, logRecord);
            
            fillRequestFields(reqDTO);

            
            operateLogApi.createOperateLogAsync(reqDTO);
        } catch (Throwable ex) {
            
            log.error("[record] url ({}) log ({}) An anomaly occurred]", reqDTO.getRequestUrl(), reqDTO, ex);
        }
    }

    private static void fillUserFields(OperateLogCreateReqDTO reqDTO) {
        
        LoginUser loginUser = SecurityFrameworkUtils.getLoginUser();
        if (loginUser == null) {
            return;
        }
        reqDTO.setUserId(loginUser.getId());
        reqDTO.setUserType(loginUser.getUserType());
    }

    public static void fillModuleFields(OperateLogCreateReqDTO reqDTO, LogRecord logRecord) {
        reqDTO.setType(logRecord.getType()); 
        reqDTO.setSubType(logRecord.getSubType());
        reqDTO.setBizId(Long.parseLong(logRecord.getBizNo())); 
        reqDTO.setAction(logRecord.getAction());
        reqDTO.setExtra(logRecord.getExtra()); 
    }

    private static void fillRequestFields(OperateLogCreateReqDTO reqDTO) {
        
        HttpServletRequest request = ServletUtils.getRequest();
        if (request == null) {
            return;
        }
        
        reqDTO.setRequestMethod(request.getMethod());
        reqDTO.setRequestUrl(request.getRequestURI());
        reqDTO.setUserIp(ServletUtils.getClientIP(request));
        reqDTO.setUserAgent(ServletUtils.getUserAgent(request));
    }

    @Override
    public List<LogRecord> queryLog(String bizNo, String type) {
        throw new UnsupportedOperationException("Operation log queries using OperateLogApi");
    }

    @Override
    public List<LogRecord> queryLogByBizNo(String bizNo, String type, String subType) {
        throw new UnsupportedOperationException("Operation log queries using OperateLogApi");
    }

}