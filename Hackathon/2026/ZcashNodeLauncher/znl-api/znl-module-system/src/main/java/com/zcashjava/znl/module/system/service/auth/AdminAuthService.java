package com.zcashjava.znl.module.system.service.auth;

import javax.validation.Valid;

import com.zcashjava.znl.module.system.controller.admin.auth.vo.*;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;


public interface AdminAuthService {

    
    AdminUserDO authenticate(String username, String password);

    
    AuthLoginRespVO login(@Valid AuthLoginReqVO reqVO);

    
    void logout(String token, Integer logType);




    
    AuthLoginRespVO refreshToken(String refreshToken);

    
    AuthLoginRespVO register(AuthRegisterReqVO createReqVO);


}
