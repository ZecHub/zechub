package com.zcashjava.znl.module.infra.service.config;

import com.google.common.annotations.VisibleForTesting;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigPageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigSaveReqVO;
import com.zcashjava.znl.module.infra.convert.config.ConfigConvert;
import com.zcashjava.znl.module.infra.dal.dataobject.config.ConfigDO;
import com.zcashjava.znl.module.infra.dal.mysql.config.ConfigMapper;
import com.zcashjava.znl.module.infra.enums.config.ConfigTypeEnum;

import javax.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.infra.enums.ErrorCodeConstants.*;


@Service
@Slf4j
@Validated
public class ConfigServiceImpl implements ConfigService {

    @Resource
    private ConfigMapper configMapper;

    @Override
    public Long createConfig(ConfigSaveReqVO createReqVO) {
        
        validateConfigKeyUnique(null, createReqVO.getKey());

        
        ConfigDO config = ConfigConvert.INSTANCE.convert(createReqVO);
        config.setType(ConfigTypeEnum.CUSTOM.getType());
        configMapper.insert(config);
        return config.getId();
    }

    @Override
    public void updateConfig(ConfigSaveReqVO updateReqVO) {
        
        validateConfigExists(updateReqVO.getId());
        
        validateConfigKeyUnique(updateReqVO.getId(), updateReqVO.getKey());

        
        ConfigDO updateObj = ConfigConvert.INSTANCE.convert(updateReqVO);
        configMapper.updateById(updateObj);
    }

    @Override
    public void deleteConfig(Long id) {
        
        ConfigDO config = validateConfigExists(id);
        
        if (ConfigTypeEnum.SYSTEM.getType().equals(config.getType())) {
            throw exception(CONFIG_CAN_NOT_DELETE_SYSTEM_TYPE);
        }
        
        configMapper.deleteById(id);
    }

    @Override
    public void deleteConfigList(List<Long> ids) {
        
        List<ConfigDO> configs = configMapper.selectByIds(ids);
        configs.forEach(config -> {
            if (ConfigTypeEnum.SYSTEM.getType().equals(config.getType())) {
                throw exception(CONFIG_CAN_NOT_DELETE_SYSTEM_TYPE);
            }
        });

        
        configMapper.deleteByIds(ids);
    }

    @Override
    public ConfigDO getConfig(Long id) {
        return configMapper.selectById(id);
    }

    @Override
    public ConfigDO getConfigByKey(String key) {
        return configMapper.selectByKey(key);
    }

    @Override
    public PageResult<ConfigDO> getConfigPage(ConfigPageReqVO pageReqVO) {
        return configMapper.selectPage(pageReqVO);
    }

    @VisibleForTesting
    public ConfigDO validateConfigExists(Long id) {
        if (id == null) {
            return null;
        }
        ConfigDO config = configMapper.selectById(id);
        if (config == null) {
            throw exception(CONFIG_NOT_EXISTS);
        }
        return config;
    }

    @VisibleForTesting
    public void validateConfigKeyUnique(Long id, String key) {
        ConfigDO config = configMapper.selectByKey(key);
        if (config == null) {
            return;
        }
        
        if (id == null) {
            throw exception(CONFIG_KEY_DUPLICATE);
        }
        if (!config.getId().equals(id)) {
            throw exception(CONFIG_KEY_DUPLICATE);
        }
    }

}
