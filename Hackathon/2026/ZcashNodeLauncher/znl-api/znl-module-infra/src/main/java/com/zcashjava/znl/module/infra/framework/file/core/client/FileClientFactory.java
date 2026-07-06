package com.zcashjava.znl.module.infra.framework.file.core.client;

import com.zcashjava.znl.module.infra.framework.file.core.enums.FileStorageEnum;

public interface FileClientFactory {

    
    FileClient getFileClient(Long configId);

    
    <Config extends FileClientConfig> void createOrUpdateFileClient(Long configId, Integer storage, Config config);

}
