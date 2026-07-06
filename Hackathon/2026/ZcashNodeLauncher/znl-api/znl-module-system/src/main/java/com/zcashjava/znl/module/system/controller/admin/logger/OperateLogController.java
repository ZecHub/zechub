package com.zcashjava.znl.module.system.controller.admin.logger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.apilog.core.annotation.ApiAccessLog;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.excel.core.util.ExcelUtils;
import com.zcashjava.znl.module.system.controller.admin.logger.vo.operatelog.OperateLogPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.logger.vo.operatelog.OperateLogRespVO;
import com.zcashjava.znl.module.system.dal.dataobject.logger.OperateLogDO;
import com.zcashjava.znl.module.system.service.logger.OperateLogService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

import static com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum.EXPORT;
import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

@Tag(name = "Manage Backstage - Operation Log")
@RestController
@RequestMapping("/system/operate-log")
@Validated
public class OperateLogController {

    @Resource
    private OperateLogService operateLogService;

    @GetMapping("/page")
    @Operation(summary = "View Action Log Page Breaking List")
    @PreAuthorize("@ss.hasPermission('system:operate-log:query')")
    public CommonResult<PageResult<OperateLogRespVO>> pageOperateLog(@Valid OperateLogPageReqVO pageReqVO) {
        PageResult<OperateLogDO> pageResult = operateLogService.getOperateLogPage(pageReqVO);
        return success(BeanUtils.toBean(pageResult, OperateLogRespVO.class));
    }

    @Operation(summary = "Export Operations Log")
    @GetMapping("/export-excel")
    @PreAuthorize("@ss.hasPermission('system:operate-log:export')")
    @ApiAccessLog(operateType = EXPORT)
    public void exportOperateLog(HttpServletResponse response, @Valid OperateLogPageReqVO exportReqVO) throws IOException {
        exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);
        List<OperateLogDO> list = operateLogService.getOperateLogPage(exportReqVO).getList();
        ExcelUtils.write(response, "Operation log.xls", "Data List", OperateLogRespVO.class,
        		BeanUtils.toBean(list, OperateLogRespVO.class));
    }

}
