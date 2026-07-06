package com.zcashjava.znl.module.zcash.controller.admin.installationscript;

import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.access.prepost.PreAuthorize;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Operation;

import javax.validation.constraints.*;
import javax.validation.*;
import javax.servlet.http.*;
import java.util.*;
import java.io.IOException;

import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import com.zcashjava.znl.framework.excel.core.util.ExcelUtils;

import com.zcashjava.znl.framework.apilog.core.annotation.ApiAccessLog;
import static com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum.*;

import com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo.*;
import com.zcashjava.znl.module.zcash.dal.dataobject.installationscript.InstallationScriptDO;
import com.zcashjava.znl.module.zcash.service.installationscript.InstallationScriptService;

@Tag(name = "ZNL - Installation script")
@RestController
@RequestMapping("/zcash/installation-script")
@Validated
public class InstallationScriptController {

    @Resource
    private InstallationScriptService installationScriptService;

    @PostMapping("/create")
    @Operation(summary = "Create Installation script")
    @PreAuthorize("@ss.hasPermission('zcash:installation-script:create')")
    public CommonResult<Long> createInstallationScript(@Valid @RequestBody InstallationScriptSaveReqVO createReqVO) {
        return success(installationScriptService.createInstallationScript(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "Update Installation script")
    @PreAuthorize("@ss.hasPermission('zcash:installation-script:update')")
    public CommonResult<Boolean> updateInstallationScript(@Valid @RequestBody InstallationScriptSaveReqVO updateReqVO) {
        installationScriptService.updateInstallationScript(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Delete Installation script")
    @Parameter(name = "id", description = "ID", required = true)
    @PreAuthorize("@ss.hasPermission('zcash:installation-script:delete')")
    public CommonResult<Boolean> deleteInstallationScript(@RequestParam("id") Long id) {
        installationScriptService.deleteInstallationScript(id);
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Parameter(name = "ids", description = "IDs", required = true)
    @Operation(summary = "Batch delete Installation script")
                @PreAuthorize("@ss.hasPermission('zcash:installation-script:delete')")
    public CommonResult<Boolean> deleteInstallationScriptList(@RequestParam("ids") List<Long> ids) {
        installationScriptService.deleteInstallationScriptListByIds(ids);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "Get Installation script")
    @Parameter(name = "id", description = "ID", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('zcash:installation-script:query')")
    public CommonResult<InstallationScriptRespVO> getInstallationScript(@RequestParam("id") Long id) {
        InstallationScriptDO installationScript = installationScriptService.getInstallationScript(id);
        return success(BeanUtils.toBean(installationScript, InstallationScriptRespVO.class));
    }

    @GetMapping("/page")
    @Operation(summary = "Get Installation script page")
    @PreAuthorize("@ss.hasPermission('zcash:installation-script:query')")
    public CommonResult<PageResult<InstallationScriptRespVO>> getInstallationScriptPage(@Valid InstallationScriptPageReqVO pageReqVO) {
        PageResult<InstallationScriptDO> pageResult = installationScriptService.getInstallationScriptPage(pageReqVO);
        return success(BeanUtils.toBean(pageResult, InstallationScriptRespVO.class));
    }

    @GetMapping("/export-excel")
    @Operation(summary = "Export Installation script Excel")
    @PreAuthorize("@ss.hasPermission('zcash:installation-script:export')")
    @ApiAccessLog(operateType = EXPORT)
    public void exportInstallationScriptExcel(@Valid InstallationScriptPageReqVO pageReqVO,
              HttpServletResponse response) throws IOException {
        pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);
        List<InstallationScriptDO> list = installationScriptService.getInstallationScriptPage(pageReqVO).getList();
        // Export Excel
        ExcelUtils.write(response, "Installation script.xls", "Data", InstallationScriptRespVO.class,
                        BeanUtils.toBean(list, InstallationScriptRespVO.class));
    }

}