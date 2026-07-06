package com.zcashjava.znl.module.infra.service.file;

import cn.hutool.core.io.resource.ResourceUtil;
import cn.hutool.core.util.IdUtil;

import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.common.util.validation.ValidationUtils;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigPageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigSaveReqVO;
import com.zcashjava.znl.module.infra.convert.file.FileConfigConvert;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileConfigDO;
import com.zcashjava.znl.module.infra.dal.mysql.file.FileConfigMapper;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientFactory;
import com.zcashjava.znl.module.infra.framework.file.core.enums.FileStorageEnum;

import javax.annotation.Resource;
import javax.validation.Validator;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.framework.common.util.cache.CacheUtils.buildAsyncReloadingCache;
import static com.zcashjava.znl.module.infra.enums.ErrorCodeConstants.FILE_CONFIG_DELETE_FAIL_MASTER;
import static com.zcashjava.znl.module.infra.enums.ErrorCodeConstants.FILE_CONFIG_NOT_EXISTS;


@Service
@Validated
@Slf4j
public class FileConfigServiceImpl implements FileConfigService {

    private static final Long CACHE_MASTER_ID = 0L;

    
    @Getter
    private final LoadingCache<Long, FileClient> clientCache = buildAsyncReloadingCache(Duration.ofSeconds(10L),
            new CacheLoader<Long, FileClient>() {

                @Override
                public FileClient load(Long id) {
                    FileConfigDO config = Objects.equals(CACHE_MASTER_ID, id) ?
                            fileConfigMapper.selectByMaster() : fileConfigMapper.selectById(id);
                    if (config != null) {
                        fileClientFactory.createOrUpdateFileClient(config.getId(), config.getStorage(), config.getConfig());
                    }
                    return fileClientFactory.getFileClient(null == config ? id : config.getId());
                }

            });

    @Resource
    private FileClientFactory fileClientFactory;

    @Resource
    private FileConfigMapper fileConfigMapper;

    @Resource
    private Validator validator;

    @Override
    public Long createFileConfig(FileConfigSaveReqVO createReqVO) {
        FileConfigDO fileConfig = FileConfigConvert.INSTANCE.convert(createReqVO);
        fileConfig.setConfig(parseClientConfig(createReqVO.getStorage(), createReqVO.getConfig()));
        fileConfig.setMaster(false); 
        fileConfigMapper.insert(fileConfig);
        return fileConfig.getId();
    }

    @Override
    public void updateFileConfig(FileConfigSaveReqVO updateReqVO) {
        
        FileConfigDO config = validateFileConfigExists(updateReqVO.getId());
        
        FileConfigDO updateObj = FileConfigConvert.INSTANCE.convert(updateReqVO);
        updateObj.setConfig(parseClientConfig(config.getStorage(), updateReqVO.getConfig()));
        fileConfigMapper.updateById(updateObj);

        
        clearCache(config.getId(), null);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateFileConfigMaster(Long id) {
        
        validateFileConfigExists(id);
        
        FileConfigDO updateMaster = new FileConfigDO();
        updateMaster.setMaster(false);
        fileConfigMapper.updateBatch(updateMaster);
        

        FileConfigDO updateMasterById = new FileConfigDO();
        updateMasterById.setMaster(true);
        updateMasterById.setId(id);
        
        fileConfigMapper.updateById(updateMasterById);

        
        clearCache(null, true);
    }

    private FileClientConfig parseClientConfig(Integer storage, Map<String, Object> config) {
        
        Class<? extends FileClientConfig> configClass = FileStorageEnum.getByStorage(storage)
                .getConfigClass();
        FileClientConfig clientConfig = JsonUtils.parseObject2(JsonUtils.toJsonString(config), configClass);
        
        ValidationUtils.validate(validator, clientConfig);
        
        return clientConfig;
    }

    @Override
    public void deleteFileConfig(Long id) {
        
        FileConfigDO config = validateFileConfigExists(id);
        if (Boolean.TRUE.equals(config.getMaster())) {
            throw exception(FILE_CONFIG_DELETE_FAIL_MASTER);
        }
        
        fileConfigMapper.deleteById(id);

        
        clearCache(id, null);
    }

    @Override
    public void deleteFileConfigList(List<Long> ids) {
        
        List<FileConfigDO> configs = fileConfigMapper.selectByIds(ids);
        for (FileConfigDO config : configs) {
            if (Boolean.TRUE.equals(config.getMaster())) {
                throw exception(FILE_CONFIG_DELETE_FAIL_MASTER);
            }
        }

        
        fileConfigMapper.deleteByIds(ids);

        
        ids.forEach(id -> clearCache(id, null));
    }

    
    private void clearCache(Long id, Boolean master) {
        if (id != null) {
            clientCache.invalidate(id);
        }
        if (Boolean.TRUE.equals(master)) {
            clientCache.invalidate(CACHE_MASTER_ID);
        }
    }

    private FileConfigDO validateFileConfigExists(Long id) {
        FileConfigDO config = fileConfigMapper.selectById(id);
        if (config == null) {
            throw exception(FILE_CONFIG_NOT_EXISTS);
        }
        return config;
    }

    @Override
    public FileConfigDO getFileConfig(Long id) {
        return fileConfigMapper.selectById(id);
    }

    @Override
    public PageResult<FileConfigDO> getFileConfigPage(FileConfigPageReqVO pageReqVO) {
        return fileConfigMapper.selectPage(pageReqVO);
    }

    @Override
    public String testFileConfig(Long id) throws Exception {
        
        validateFileConfigExists(id);
        
        byte[] content = ResourceUtil.readBytes("file/erweima.jpg");
        return getFileClient(id).upload(content, IdUtil.fastSimpleUUID() + ".jpg", "image/jpeg");
    }

    @Override
    public FileClient getFileClient(Long id) {
        return clientCache.getUnchecked(id);
    }

    @Override
    public FileClient getMasterFileClient() {
        return clientCache.getUnchecked(CACHE_MASTER_ID);
    }

}
