package com.zcashjava.znl.module.system.controller.admin.oauth2;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.enums.UserTypeEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.http.HttpUtils;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.open.OAuth2OpenAccessTokenRespVO;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.open.OAuth2OpenAuthorizeInfoRespVO;
import com.zcashjava.znl.module.system.controller.admin.oauth2.vo.open.OAuth2OpenCheckTokenRespVO;
import com.zcashjava.znl.module.system.convert.oauth2.OAuth2OpenConvert;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2AccessTokenDO;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2ApproveDO;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2ClientDO;
import com.zcashjava.znl.module.system.enums.oauth2.OAuth2GrantTypeEnum;
import com.zcashjava.znl.module.system.service.oauth2.OAuth2ApproveService;
import com.zcashjava.znl.module.system.service.oauth2.OAuth2ClientService;
import com.zcashjava.znl.module.system.service.oauth2.OAuth2GrantService;
import com.zcashjava.znl.module.system.service.oauth2.OAuth2TokenService;
import com.zcashjava.znl.module.system.util.oauth2.OAuth2Utils;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants.BAD_REQUEST;
import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception0;
import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertList;
import static com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils.getLoginUserId;


@Tag(name = "Manage Backstage - OAuth 2.0 Authorization")
@RestController
@RequestMapping("/system/oauth2")
@Validated
@Slf4j
public class OAuth2OpenController {

    @Resource
    private OAuth2GrantService oauth2GrantService;
    @Resource
    private OAuth2ClientService oauth2ClientService;
    @Resource
    private OAuth2ApproveService oauth2ApproveService;
    @Resource
    private OAuth2TokenService oauth2TokenService;

    
    @PostMapping("/token")
    @PermitAll
    @Operation(summary = "Get Accessing Decoration", description = "Fit code authorization mode for code, or implecit simplified mode; call [to] at sso.vu single-point login interface")
    @Parameters({
            @Parameter(name = "grant_type", required = true, description = "Type of authorization", example = "code"),
            @Parameter(name = "code", description = "Scope of the mandate", example = "userinfo.read"),
            @Parameter(name = "redirect_uri", description = "Redirect URI"),
            @Parameter(name = "state", description = "Status", example = "1"),
            @Parameter(name = "username", example = "tudou"),
            @Parameter(name = "password", example = "cai"), 
            @Parameter(name = "scope", example = "user_info"),
            @Parameter(name = "refresh_token", example = "123424233"),
    })
    @SuppressWarnings("EnhancedSwitchMigration")
    public CommonResult<OAuth2OpenAccessTokenRespVO> postAccessToken(HttpServletRequest request,
                                                                     @RequestParam("grant_type") String grantType,
                                                                     @RequestParam(value = "code", required = false) String code, 
                                                                     @RequestParam(value = "redirect_uri", required = false) String redirectUri, 
                                                                     @RequestParam(value = "state", required = false) String state, 
                                                                     @RequestParam(value = "username", required = false) String username, 
                                                                     @RequestParam(value = "password", required = false) String password, 
                                                                     @RequestParam(value = "scope", required = false) String scope, 
                                                                     @RequestParam(value = "refresh_token", required = false) String refreshToken) { 
        List<String> scopes = OAuth2Utils.buildScopes(scope);
        
        OAuth2GrantTypeEnum grantTypeEnum = OAuth2GrantTypeEnum.getByGrantType(grantType);
        if (grantTypeEnum == null) {
            throw exception0(BAD_REQUEST.getCode(), StrUtil.format("Unknown authorization type ({})", grantType));
        }
        if (grantTypeEnum == OAuth2GrantTypeEnum.IMPLICIT) {
            throw exception0(BAD_REQUEST.getCode(), "Token interface does not support implecit authorization mode");
        }

        
        String[] clientIdAndSecret = obtainBasicAuthorization(request);
        OAuth2ClientDO client = oauth2ClientService.validOAuthClientFromCache(clientIdAndSecret[0], clientIdAndSecret[1],
                grantType, scopes, redirectUri);

        
        OAuth2AccessTokenDO accessTokenDO;
        switch (grantTypeEnum) {
            case AUTHORIZATION_CODE:
                accessTokenDO = oauth2GrantService.grantAuthorizationCodeForAccessToken(client.getClientId(), code, redirectUri, state);
                break;
            case PASSWORD:
                accessTokenDO = oauth2GrantService.grantPassword(username, password, client.getClientId(), scopes);
                break;
            case CLIENT_CREDENTIALS:
                accessTokenDO = oauth2GrantService.grantClientCredentials(client.getClientId(), scopes);
                break;
            case REFRESH_TOKEN:
                accessTokenDO = oauth2GrantService.grantRefreshToken(refreshToken, client.getClientId());
                break;
            default:
                throw new IllegalArgumentException("Unknown authorization type:" + grantType);
        }
        Assert.notNull(accessTokenDO, "Accessing tokens cannot be empty"); 
        return success(OAuth2OpenConvert.INSTANCE.convert(accessTokenDO));
    }

    @DeleteMapping("/token")
    @PermitAll
    @Operation(summary = "Remove Accessing Decals")
    @Parameter(name = "token", required = true, description = "Access the tokens", example = "biu")
    public CommonResult<Boolean> revokeToken(HttpServletRequest request,
                                             @RequestParam("token") String token) {
        
        String[] clientIdAndSecret = obtainBasicAuthorization(request);
        OAuth2ClientDO client = oauth2ClientService.validOAuthClientFromCache(clientIdAndSecret[0], clientIdAndSecret[1],
                null, null, null);

        
        return success(oauth2GrantService.revokeToken(client.getClientId(), token));
    }

    
    @PostMapping("/check-token")
    @PermitAll
    @Operation(summary = "Verify access tokens")
    @Parameter(name = "token", required = true, description = "Access the tokens", example = "biu")
    public CommonResult<OAuth2OpenCheckTokenRespVO> checkToken(HttpServletRequest request,
                                                               @RequestParam("token") String token) {
        
        String[] clientIdAndSecret = obtainBasicAuthorization(request);
        oauth2ClientService.validOAuthClientFromCache(clientIdAndSecret[0], clientIdAndSecret[1],
                null, null, null);

        
        OAuth2AccessTokenDO accessTokenDO = oauth2TokenService.checkAccessToken(token);
        Assert.notNull(accessTokenDO, "Accessing tokens cannot be empty"); 
        return success(OAuth2OpenConvert.INSTANCE.convert2(accessTokenDO));
    }

    
    @GetMapping("/authorize")
    @Operation(summary = "Can not open message", description = "Fit code authorization mode for code, or implecit simplified mode; call [to] at sso.vu single-point login interface")
    @Parameter(name = "clientId", required = true, description = "Client ID", example = "tudou")
    public CommonResult<OAuth2OpenAuthorizeInfoRespVO> authorize(@RequestParam("clientId") String clientId) {
        

        
        OAuth2ClientDO client = oauth2ClientService.validOAuthClientFromCache(clientId);
        
        List<OAuth2ApproveDO> approves = oauth2ApproveService.getApproveList(getLoginUserId(), getUserType(), clientId);
        
        return success(OAuth2OpenConvert.INSTANCE.convert(client, approves));
    }

    
    @PostMapping("/authorize")
    @Operation(summary = "Request for authorization", description = "Fit code authorization mode for code, or implecit simplified mode; call [submitted] at sso.vu single-point login interface")
    @Parameters({
            @Parameter(name = "response_type", required = true, description = "Type of response", example = "code"),
            @Parameter(name = "client_id", required = true, description = "Client ID", example = "tudou"),
            @Parameter(name = "scope", description = "Scope of the mandate", example = "userinfo.read"), 
            @Parameter(name = "redirect_uri", required = true, description = "Redirect URI"),
            @Parameter(name = "auto_approve", required = true, description = "Users accept or not", example = "true"),
            @Parameter(name = "state", example = "1")
    })
    public CommonResult<String> approveOrDeny(@RequestParam("response_type") String responseType,
                                              @RequestParam("client_id") String clientId,
                                              @RequestParam(value = "scope", required = false) String scope,
                                              @RequestParam("redirect_uri") String redirectUri,
                                              @RequestParam(value = "auto_approve") Boolean autoApprove,
                                              @RequestParam(value = "state", required = false) String state) {
        @SuppressWarnings("unchecked")
        Map<String, Boolean> scopes = JsonUtils.parseObject(scope, Map.class);
        scopes = ObjectUtil.defaultIfNull(scopes, Collections.emptyMap());
        

        
        OAuth2GrantTypeEnum grantTypeEnum = getGrantTypeEnum(responseType);
        
        OAuth2ClientDO client = oauth2ClientService.validOAuthClientFromCache(clientId, null,
                grantTypeEnum.getGrantType(), scopes.keySet(), redirectUri);

        
        if (Boolean.TRUE.equals(autoApprove)) {
            
            if (!oauth2ApproveService.checkForPreApproval(getLoginUserId(), getUserType(), clientId, scopes.keySet())) {
                return success(null);
            }
        } else { 
            
            if (!oauth2ApproveService.updateAfterApproval(getLoginUserId(), getUserType(), clientId, scopes)) {
                return success(OAuth2Utils.buildUnsuccessfulRedirect(redirectUri, responseType, state,
                        "access_denied", "User denied access"));
            }
        }

        
        List<String> approveScopes = convertList(scopes.entrySet(), Map.Entry::getKey, Map.Entry::getValue);
        if (grantTypeEnum == OAuth2GrantTypeEnum.AUTHORIZATION_CODE) {
            return success(getAuthorizationCodeRedirect(getLoginUserId(), client, approveScopes, redirectUri, state));
        }
        
        return success(getImplicitGrantRedirect(getLoginUserId(), client, approveScopes, redirectUri, state));
    }

    private static OAuth2GrantTypeEnum getGrantTypeEnum(String responseType) {
        if (StrUtil.equals(responseType, "code")) {
            return OAuth2GrantTypeEnum.AUTHORIZATION_CODE;
        }
        if (StrUtil.equalsAny(responseType, "token")) {
            return OAuth2GrantTypeEnum.IMPLICIT;
        }
        throw exception0(BAD_REQUEST.getCode(), "Only code and token are allowed for response_type argument values");
    }

    private String getImplicitGrantRedirect(Long userId, OAuth2ClientDO client,
                                            List<String> scopes, String redirectUri, String state) {
        
        OAuth2AccessTokenDO accessTokenDO = oauth2GrantService.grantImplicit(userId, getUserType(), client.getClientId(), scopes);
        Assert.notNull(accessTokenDO, "Accessing tokens cannot be empty"); 
        
        
        return OAuth2Utils.buildImplicitRedirectUri(redirectUri, accessTokenDO.getAccessToken(), state, accessTokenDO.getExpiresTime(),
                scopes, JsonUtils.parseObject(client.getAdditionalInformation(), Map.class));
    }

    private String getAuthorizationCodeRedirect(Long userId, OAuth2ClientDO client,
                                                List<String> scopes, String redirectUri, String state) {
        
        String authorizationCode = oauth2GrantService.grantAuthorizationCodeForCode(userId, getUserType(), client.getClientId(), scopes,
                redirectUri, state);
        
        return OAuth2Utils.buildAuthorizationCodeRedirectUri(redirectUri, authorizationCode, state);
    }

    private Integer getUserType() {
        return UserTypeEnum.ADMIN.getValue();
    }

    private String[] obtainBasicAuthorization(HttpServletRequest request) {
        String[] clientIdAndSecret = HttpUtils.obtainBasicAuthorization(request);
        if (ArrayUtil.isEmpty(clientIdAndSecret) || clientIdAndSecret.length != 2) {
            throw exception0(BAD_REQUEST.getCode(), "cliet_id or cliet_set not correctly transmitted");
        }
        return clientIdAndSecret;
    }

}
