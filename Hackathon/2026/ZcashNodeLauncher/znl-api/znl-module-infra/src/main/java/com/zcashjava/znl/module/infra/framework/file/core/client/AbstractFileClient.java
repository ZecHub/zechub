package com.zcashjava.znl.module.infra.framework.file.core.client;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public abstract class AbstractFileClient<Config extends FileClientConfig> implements FileClient {

    
    private final Long id;
    
    protected Config config;

    public AbstractFileClient(Long id, Config config) {
        this.id = id;
        this.config = config;
    }

    
    public final void init() {
        doInit();
        log.debug("[init] [Configure ({}) Initialization completed]", config);
    }

    
    protected abstract void doInit();

    public final void refresh(Config config) {
        
        if (config.equals(this.config)) {
            return;
        }
        log.info("[refresh] [Configure ({}) changes, re-introduction]", config);
        this.config = config;
        
        this.init();
    }

    @Override
    public Long getId() {
        return id;
    }

    
    protected String formatFileUrl(String domain, String path) {
        return StrUtil.format("{}/admin-api/infra/file/{}/get/{}", domain, getId(), path);
    }

}
