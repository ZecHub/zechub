package com.zcashjava.znl.module.system.controller.admin.tenant;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.apilog.core.annotation.ApiAccessLog;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.excel.core.util.ExcelUtils;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantRespVO;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantDO;
import com.zcashjava.znl.module.system.service.tenant.TenantService;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

import static com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum.EXPORT;
import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertList;

@Tag(name = "Manage backstage - Tenant")
@RestController
@RequestMapping("/system/tenant")
public class TenantController {

    @Resource
    private TenantService tenantService;

    @GetMapping("/get-id-by-name")
    @PermitAll
    @TenantIgnore
    @Operation(summary = "Use tenant's name to get the tenant's number", description = "Login interface to get the tenant's number based on the user's tenant name")
    @Parameter(name = "name", description = "Tenant name", required = true, example = "1024")
    public CommonResult<Long> getTenantIdByName(@RequestParam("name") String name) {
        TenantDO tenant = tenantService.getTenantByName(name);
        return success(tenant != null ? tenant.getId() : null);
    }

    @GetMapping({ "simple-list" })
    @PermitAll
    @TenantIgnore
    @Operation(summary = "Get a tenant's list of streamlined information", description = "Only open tenants are included, selecting tenant options for the [first page] function")
    public CommonResult<List<TenantRespVO>> getTenantSimpleList() {
        List<TenantDO> list = tenantService.getTenantListByStatus(CommonStatusEnum.ENABLE.getStatus());
        return success(convertList(list, tenantDO ->
                {
                	TenantRespVO result = new TenantRespVO();
                	result.setId(tenantDO.getId());
                	result.setName(tenantDO.getName());
                	
                	return result;
                }));
    }

    @GetMapping("/get-by-website")
    @PermitAll
    @TenantIgnore
    @Operation(summary = "Use domain name to get tenant information", description = "Login interface to get tenant information based on the user's domain name")
    @Parameter(name = "website", description = "Domain Name", required = true)
    public CommonResult<TenantRespVO> getTenantByWebsite(@RequestParam("website") String website) {
        TenantDO tenant = tenantService.getTenantByWebsite(website);
        if (tenant == null || CommonStatusEnum.isDisable(tenant.getStatus())) {
            return success(null);
        }
        
        TenantRespVO result = new TenantRespVO();
        result.setId(tenant.getId());
        result.setName(tenant.getName());
        
        return success(result);
    }

    @PostMapping("/create")
    @Operation(summary = "Create Tenant")
    @PreAuthorize("@ss.hasPermission('system:tenant:create')")
    public CommonResult<Long> createTenant(@Valid @RequestBody TenantSaveReqVO createReqVO) {
        return success(tenantService.createTenant(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "Update Tenant")
    @PreAuthorize("@ss.hasPermission('system:tenant:update')")
    public CommonResult<Boolean> updateTenant(@Valid @RequestBody TenantSaveReqVO updateReqVO) {
        tenantService.updateTenant(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Remove Tenant")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('system:tenant:delete')")
    public CommonResult<Boolean> deleteTenant(@RequestParam("id") Long id) {
        tenantService.deleteTenant(id);
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Parameter(name = "ids", description = "Numbering List", required = true)
    @Operation(summary = "Batch Remove Tenant")
    @PreAuthorize("@ss.hasPermission('system:tenant:delete')")
    public CommonResult<Boolean> deleteTenantList(@RequestParam("ids") List<Long> ids) {
        tenantService.deleteTenantList(ids);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "Acquiring tenants")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('system:tenant:query')")
    public CommonResult<TenantRespVO> getTenant(@RequestParam("id") Long id) {
        TenantDO tenant = tenantService.getTenant(id);
        return success(BeanUtils.toBean(tenant, TenantRespVO.class));
    }

    @GetMapping("/page")
    @Operation(summary = "Get Tenant Sub-pages")
    @PreAuthorize("@ss.hasPermission('system:tenant:query')")
    public CommonResult<PageResult<TenantRespVO>> getTenantPage(@Valid TenantPageReqVO pageVO) {
        PageResult<TenantDO> pageResult = tenantService.getTenantPage(pageVO);
        return success(BeanUtils.toBean(pageResult, TenantRespVO.class));
    }

    @GetMapping("/export-excel")
    @Operation(summary = "Export Lessor Excel")
    @PreAuthorize("@ss.hasPermission('system:tenant:export')")
    @ApiAccessLog(operateType = EXPORT)
    public void exportTenantExcel(@Valid TenantPageReqVO exportReqVO, HttpServletResponse response) throws IOException {
        exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);
        List<TenantDO> list = tenantService.getTenantPage(exportReqVO).getList();
        
        ExcelUtils.write(response, "Tenant.xls", "Data", TenantRespVO.class,
                BeanUtils.toBean(list, TenantRespVO.class));
    }

}
