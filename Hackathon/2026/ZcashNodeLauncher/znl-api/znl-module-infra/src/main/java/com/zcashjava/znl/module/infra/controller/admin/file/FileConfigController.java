package com.zcashjava.znl.module.infra.controller.admin.file;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigPageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigRespVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigSaveReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileConfigDO;
import com.zcashjava.znl.module.infra.service.file.FileConfigService;

import javax.annotation.Resource;
import javax.validation.Valid;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.util.List;

@Tag(name = "Manage Backstage - File Configuration")
@RestController
@RequestMapping("/infra/file-config")
@Validated
public class FileConfigController {

    @Resource
    private FileConfigService fileConfigService;

    @PostMapping("/create")
    @Operation(summary = "Create File Configuration")
    @PreAuthorize("@ss.hasPermission('infra:file-config:create')")
    public CommonResult<Long> createFileConfig(@Valid @RequestBody FileConfigSaveReqVO createReqVO) {
        return success(fileConfigService.createFileConfig(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "Update File Configuration")
    @PreAuthorize("@ss.hasPermission('infra:file-config:update')")
    public CommonResult<Boolean> updateFileConfig(@Valid @RequestBody FileConfigSaveReqVO updateReqVO) {
        fileConfigService.updateFileConfig(updateReqVO);
        return success(true);
    }

    @PutMapping("/update-master")
    @Operation(summary = "Update File Configuration to Master")
    @PreAuthorize("@ss.hasPermission('infra:file-config:update')")
    public CommonResult<Boolean> updateFileConfigMaster(@RequestParam("id") Long id) {
        fileConfigService.updateFileConfigMaster(id);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Remove File Profile")
    @Parameter(name = "id", description = "Numbering", required = true)
    @PreAuthorize("@ss.hasPermission('infra:file-config:delete')")
    public CommonResult<Boolean> deleteFileConfig(@RequestParam("id") Long id) {
        fileConfigService.deleteFileConfig(id);
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Operation(summary = "Batch Delete File Configuration")
    @Parameter(name = "ids", description = "Numbering List", required = true)
    @PreAuthorize("@ss.hasPermission('infra:file-config:delete')")
    public CommonResult<Boolean> deleteFileConfigList(@RequestParam("ids") List<Long> ids) {
        fileConfigService.deleteFileConfigList(ids);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "Get File Configuration")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('infra:file-config:query')")
    public CommonResult<FileConfigRespVO> getFileConfig(@RequestParam("id") Long id) {
        FileConfigDO config = fileConfigService.getFileConfig(id);
        return success(BeanUtils.toBean(config, FileConfigRespVO.class));
    }

    @GetMapping("/page")
    @Operation(summary = "Get File Configuration Page Breaks")
    @PreAuthorize("@ss.hasPermission('infra:file-config:query')")
    public CommonResult<PageResult<FileConfigRespVO>> getFileConfigPage(@Valid FileConfigPageReqVO pageVO) {
        PageResult<FileConfigDO> pageResult = fileConfigService.getFileConfigPage(pageVO);
        return success(BeanUtils.toBean(pageResult, FileConfigRespVO.class));
    }

    @GetMapping("/test")
    @Operation(summary = "Test if file configuration is correct")
    @PreAuthorize("@ss.hasPermission('infra:file-config:query')")
    public CommonResult<String> testFileConfig(@RequestParam("id") Long id) throws Exception {
        String url = fileConfigService.testFileConfig(id);
        return success(url);
    }
}
