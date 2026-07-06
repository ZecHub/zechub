package com.zcashjava.znl.module.infra.controller.admin.config;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.apilog.core.annotation.ApiAccessLog;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.excel.core.util.ExcelUtils;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigPageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigRespVO;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigSaveReqVO;
import com.zcashjava.znl.module.infra.convert.config.ConfigConvert;
import com.zcashjava.znl.module.infra.dal.dataobject.config.ConfigDO;
import com.zcashjava.znl.module.infra.enums.ErrorCodeConstants;
import com.zcashjava.znl.module.infra.service.config.ConfigService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

import static com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum.EXPORT;
import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

@Tag(name = "Manage Backstage - Parameter Configuration")
@RestController
@RequestMapping("/infra/config")
@Validated
public class ConfigController {

    @Resource
    private ConfigService configService;

    @PostMapping("/create")
    @Operation(summary = "Create Parameter Configuration")
    @PreAuthorize("@ss.hasPermission('infra:config:create')")
    public CommonResult<Long> createConfig(@Valid @RequestBody ConfigSaveReqVO createReqVO) {
        return success(configService.createConfig(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "Modify Parameter Configuration")
    @PreAuthorize("@ss.hasPermission('infra:config:update')")
    public CommonResult<Boolean> updateConfig(@Valid @RequestBody ConfigSaveReqVO updateReqVO) {
        configService.updateConfig(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Remove Parameter Configuration")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('infra:config:delete')")
    public CommonResult<Boolean> deleteConfig(@RequestParam("id") Long id) {
        configService.deleteConfig(id);
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Operation(summary = "Batch Remove Parameter Configuration")
    @Parameter(name = "ids", description = "Numbering List", required = true)
    @PreAuthorize("@ss.hasPermission('infra:config:delete')")
    public CommonResult<Boolean> deleteConfigList(@RequestParam("ids") List<Long> ids) {
        configService.deleteConfigList(ids);
        return success(true);
    }

    @GetMapping(value = "/get")
    @Operation(summary = "Get Parameter Configuration")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('infra:config:query')")
    public CommonResult<ConfigRespVO> getConfig(@RequestParam("id") Long id) {
        return success(ConfigConvert.INSTANCE.convert(configService.getConfig(id)));
    }

    @GetMapping(value = "/get-value-by-key")
    @Operation(summary = "Query parameter values by parameter keyname", description = "Cannot initialise Evolution's mail component.")
    @Parameter(name = "key", description = "Parameter Keys", required = true, example = "yunai.biz.username")
    public CommonResult<String> getConfigKey(@RequestParam("key") String key) {
        ConfigDO config = configService.getConfigByKey(key);
        if (config == null) {
            return success(null);
        }
        if (!config.getVisible()) {
            throw exception(ErrorCodeConstants.CONFIG_GET_VALUE_ERROR_IF_VISIBLE);
        }
        return success(config.getValue());
    }

    @GetMapping("/page")
    @Operation(summary = "Retrieving Parameter Configuration Page Breaks")
    @PreAuthorize("@ss.hasPermission('infra:config:query')")
    public CommonResult<PageResult<ConfigRespVO>> getConfigPage(@Valid ConfigPageReqVO pageReqVO) {
        PageResult<ConfigDO> page = configService.getConfigPage(pageReqVO);
        return success(ConfigConvert.INSTANCE.convertPage(page));
    }

    @GetMapping("/export-excel")
    @Operation(summary = "Export Parameter Configuration")
    @PreAuthorize("@ss.hasPermission('infra:config:export')")
    @ApiAccessLog(operateType = EXPORT)
    public void exportConfig(ConfigPageReqVO exportReqVO,
                             HttpServletResponse response) throws IOException {
        exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);
        List<ConfigDO> list = configService.getConfigPage(exportReqVO).getList();
        
        ExcelUtils.write(response, "Parameter Configuration.xls", "Data", ConfigRespVO.class,
                ConfigConvert.INSTANCE.convertList(list));
    }

}
