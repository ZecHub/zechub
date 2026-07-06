package com.zcashjava.znl.module.system.framework.operatelog.core;

import cn.hutool.core.util.StrUtil;

import com.mzt.logapi.service.IParseFunction;
import com.zcashjava.znl.framework.dict.core.DictFrameworkUtils;
import com.zcashjava.znl.module.infra.enums.DictTypeConstants;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class BooleanParseFunction implements IParseFunction {

    public static final String NAME = "getBoolean";

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
        return DictFrameworkUtils.parseDictDataLabel(DictTypeConstants.BOOLEAN_STRING, value.toString());
    }

}
