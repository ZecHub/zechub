package com.zcashjava.znl.module.system.controller.admin.oauth2;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.token.OAuth2AccessTokenPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.token.OAuth2AccessTokenRespVO;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2AccessTokenDO;
import com.zcashjava.znl.module.system.enums.logger.LoginLogTypeEnum;
import com.zcashjava.znl.module.system.service.auth.AdminAuthService;
import com.zcashjava.znl.module.system.service.oauth2.OAuth2TokenService;

import javax.annotation.Resource;
import javax.validation.Valid;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.util.List;

@Tag(name = "Manage Backstage - OAuth 2.0 Decorator")
@RestController
@RequestMapping("/system/oauth2-token")
public class OAuth2TokenController {

    @Resource
    private OAuth2TokenService oauth2TokenService;
    @Resource
    private AdminAuthService authService;

    @GetMapping("/page")
    @Operation(summary = "Get Accessing Decoration Pages", description = "Return only during the period of validity")
    @PreAuthorize("@ss.hasPermission('system:oauth2-token:page')")
    public CommonResult<PageResult<OAuth2AccessTokenRespVO>> getAccessTokenPage(@Valid OAuth2AccessTokenPageReqVO reqVO) {
        PageResult<OAuth2AccessTokenDO> pageResult = oauth2TokenService.getAccessTokenPage(reqVO);
        return success(BeanUtils.toBean(pageResult, OAuth2AccessTokenRespVO.class));
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Remove Accessing Decals")
    @Parameter(name = "accessToken", description = "Access the tokens", required = true, example = "tudou")
    @PreAuthorize("@ss.hasPermission('system:oauth2-token:delete')")
    public CommonResult<Boolean> deleteAccessToken(@RequestParam("accessToken") String accessToken) {
        authService.logout(accessToken, LoginLogTypeEnum.LOGOUT_DELETE.getType());
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Operation(summary = "Batch to remove access tokens")
    @Parameter(name = "accessTokens", description = "Access the talisman array", required = true)
    @PreAuthorize("@ss.hasPermission('system:oauth2-token:delete')")
    public CommonResult<Boolean> deleteAccessTokenList(@RequestParam("accessTokens") List<String> accessTokens) {
        accessTokens.forEach(accessToken ->
                authService.logout(accessToken, LoginLogTypeEnum.LOGOUT_DELETE.getType()));
        return success(true);
    }

}
