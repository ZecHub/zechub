package com.zcashjava.znl.module.infra.service.config;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigPageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.config.vo.ConfigSaveReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.config.ConfigDO;

import java.util.List;


public interface ConfigService {

    
    Long createConfig(@Valid ConfigSaveReqVO createReqVO);

    
    void updateConfig(@Valid ConfigSaveReqVO updateReqVO);

    
    void deleteConfig(Long id);

    
    void deleteConfigList(List<Long> ids);

    
    ConfigDO getConfig(Long id);

    
    ConfigDO getConfigByKey(String key);

    
    PageResult<ConfigDO> getConfigPage(ConfigPageReqVO reqVO);

}
