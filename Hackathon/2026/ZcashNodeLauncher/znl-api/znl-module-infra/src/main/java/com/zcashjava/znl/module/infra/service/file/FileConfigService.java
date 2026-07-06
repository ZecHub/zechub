package com.zcashjava.znl.module.infra.service.file;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigPageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigSaveReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileConfigDO;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClient;

import java.util.List;


public interface FileConfigService {

    
    Long createFileConfig(@Valid FileConfigSaveReqVO createReqVO);

    
    void updateFileConfig(@Valid FileConfigSaveReqVO updateReqVO);

    
    void updateFileConfigMaster(Long id);

    
    void deleteFileConfig(Long id);

    
    void deleteFileConfigList(List<Long> ids);

    
    FileConfigDO getFileConfig(Long id);

    
    PageResult<FileConfigDO> getFileConfigPage(FileConfigPageReqVO pageReqVO);

    
    String testFileConfig(Long id) throws Exception;

    
    FileClient getFileClient(Long id);

    
    FileClient getMasterFileClient();

}
