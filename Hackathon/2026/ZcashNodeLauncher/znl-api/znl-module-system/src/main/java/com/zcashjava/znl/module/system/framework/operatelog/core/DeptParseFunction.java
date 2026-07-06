package com.zcashjava.znl.module.system.framework.operatelog.core;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;

import com.mzt.logapi.service.IParseFunction;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;
import com.zcashjava.znl.module.system.service.dept.DeptService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;


@Slf4j
@Component
public class DeptParseFunction implements IParseFunction {

    public static final String NAME = "getDeptById";

    @Resource
    private DeptService deptService;

    @Override
    public String functionName() {
        return NAME;
    }

    @Override
    public String apply(Object value) {
        if (StrUtil.isEmptyIfStr(value)) {
            return "";
        }

        
        DeptDO dept = deptService.getDept(Convert.toLong(value));
        if (dept == null) {
            log.warn("[apply] [Requires department {} Empty", value);
            return "";
        }
        return dept.getName();
    }

}
