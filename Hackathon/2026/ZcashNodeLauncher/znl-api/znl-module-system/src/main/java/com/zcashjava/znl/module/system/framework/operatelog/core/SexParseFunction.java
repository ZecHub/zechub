package com.zcashjava.znl.module.system.framework.operatelog.core;

import cn.hutool.core.util.StrUtil;

import com.mzt.logapi.service.IParseFunction;
import com.zcashjava.znl.framework.dict.core.DictFrameworkUtils;
import com.zcashjava.znl.module.system.enums.DictTypeConstants;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class SexParseFunction implements IParseFunction {

    public static final String NAME = "getSex";

    @Override
    public boolean executeBefore() {
        return true; 
    }

    @Override
    public String functionName() {
        return NAME;
    }

    @Override
    public String apply(Object value) {
        if (StrUtil.isEmptyIfStr(value)) {
            return "";
        }
        return DictFrameworkUtils.parseDictDataLabel(DictTypeConstants.USER_SEX, value.toString());
    }

}
