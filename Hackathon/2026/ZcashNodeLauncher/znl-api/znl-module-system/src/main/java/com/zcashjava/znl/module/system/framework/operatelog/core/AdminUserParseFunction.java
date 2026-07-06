package com.zcashjava.znl.module.system.framework.operatelog.core;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;

import com.mzt.logapi.service.IParseFunction;
import com.zcashjava.znl.module.system.dal.dataobject.user.AdminUserDO;
import com.zcashjava.znl.module.system.service.user.AdminUserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;


@Slf4j
@Component
public class AdminUserParseFunction implements IParseFunction {

    public static final String NAME = "getAdminUserById";

    @Resource
    private AdminUserService adminUserService;

    @Override
    public String functionName() {
        return NAME;
    }

    @Override
    public String apply(Object value) {
        if (StrUtil.isEmptyIfStr(value)) {
            return "";
        }

        
        AdminUserDO user = adminUserService.getUser(Convert.toLong(value));
        if (user == null) {
            log.warn("[apply] [Require user {} Empty", value);
            return "";
        }
        
        String nickname = user.getNickname();
        if (StrUtil.isEmpty(user.getMobile())) {
            return nickname;
        }
        return StrUtil.format("{}({})", nickname, user.getMobile());
    }

}
