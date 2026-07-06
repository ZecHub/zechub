package com.zcashjava.znl.module.infra.api.config;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.module.infra.dal.dataobject.config.ConfigDO;
import com.zcashjava.znl.module.infra.service.config.ConfigService;

import javax.annotation.Resource;


@Service
@Validated
public class ConfigApiImpl implements ConfigApi {

    @Resource
    private ConfigService configService;

    @Override
    public String getConfigValueByKey(String key) {
        ConfigDO config = configService.getConfigByKey(key);
        return config != null ? config.getValue() : null;
    }

}
