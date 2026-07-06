package com.zcashjava.znl.module.infra.framework.file.core.client.local;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IORuntimeException;

import java.io.File;

import com.zcashjava.znl.module.infra.framework.file.core.client.AbstractFileClient;


public class LocalFileClient extends AbstractFileClient<LocalFileClientConfig> {

    public LocalFileClient(Long id, LocalFileClientConfig config) {
        super(id, config);
    }

    @Override
    protected void doInit() {
    }

    @Override
    public String upload(byte[] content, String path, String type) {
        
        String filePath = getFilePath(path);
        FileUtil.writeBytes(content, filePath);
        
        return super.formatFileUrl(config.getDomain(), path);
    }

    @Override
    public void delete(String path) {
        String filePath = getFilePath(path);
        FileUtil.del(filePath);
    }

    @Override
    public byte[] getContent(String path) {
        String filePath = getFilePath(path);
        try {
            return FileUtil.readBytes(filePath);
        } catch (IORuntimeException ex) {
            if (ex.getMessage().startsWith("File not exist:")) {
                return null;
            }
            throw ex;
        }
    }

    private String getFilePath(String path) {
        return config.getBasePath() + File.separator + path;
    }

}
