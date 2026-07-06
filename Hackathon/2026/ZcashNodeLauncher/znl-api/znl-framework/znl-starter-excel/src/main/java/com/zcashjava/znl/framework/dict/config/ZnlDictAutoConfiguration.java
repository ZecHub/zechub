package com.zcashjava.znl.framework.dict.config;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.zcashjava.znl.framework.common.biz.system.dict.DictDataCommonApi;
import com.zcashjava.znl.framework.dict.core.DictFrameworkUtils;

@AutoConfiguration
public class ZnlDictAutoConfiguration {

    @Bean
    @SuppressWarnings("InstantiationOfUtilityClass")
    public DictFrameworkUtils dictUtils(DictDataCommonApi dictDataApi) {
        DictFrameworkUtils.init(dictDataApi);
        return new DictFrameworkUtils();
    }

}
