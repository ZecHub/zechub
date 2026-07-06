package com.zcashjava.znl.module.system.controller.app.tenant;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.system.controller.app.tenant.vo.AppTenantRespVO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantDO;
import com.zcashjava.znl.module.system.service.tenant.TenantService;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;

@Tag(name = "User App - Tenant")
@RestController
@RequestMapping("/system/tenant")
public class AppTenantController {

    @Resource
    private TenantService tenantService;

    @GetMapping("/get-by-website")
    @PermitAll
    @TenantIgnore
    @Operation(summary = "Use domain name to get tenant information", description = "Get tenant information based on the user's domain name")
    @Parameter(name = "website", description = "Domain Name", required = true)
    public CommonResult<AppTenantRespVO> getTenantByWebsite(@RequestParam("website") String website) {
        TenantDO tenant = tenantService.getTenantByWebsite(website);
        if (tenant == null || CommonStatusEnum.isDisable(tenant.getStatus())) {
            return success(null);
        }
        return success(BeanUtils.toBean(tenant, AppTenantRespVO.class));
    }

}
