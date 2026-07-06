package com.zcashjava.znl.module.infra.framework.file.core.client.ftp;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.ftp.Ftp;
import cn.hutool.extra.ftp.FtpConfig;
import cn.hutool.extra.ftp.FtpException;
import cn.hutool.extra.ftp.FtpMode;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import com.zcashjava.znl.module.infra.framework.file.core.client.AbstractFileClient;


public class FtpFileClient extends AbstractFileClient<FtpFileClientConfig> {

    
    private static final Long CONNECTION_TIMEOUT = 3000L;
    
    private static final Long SO_TIMEOUT = 10000L;

    private Ftp ftp;

    public FtpFileClient(Long id, FtpFileClientConfig config) {
        super(id, config);
    }

    @Override
    protected void doInit() {
        
        FtpConfig ftpConfig = new FtpConfig(config.getHost(), config.getPort(), config.getUsername(), config.getPassword(),
                CharsetUtil.CHARSET_UTF_8, null, null);
        ftpConfig.setConnectionTimeout(CONNECTION_TIMEOUT);
        ftpConfig.setSoTimeout(SO_TIMEOUT);
        this.ftp = new Ftp(ftpConfig, FtpMode.valueOf(config.getMode()));
    }

    @Override
    public String upload(byte[] content, String path, String type) {
        
        String filePath = getFilePath(path);
        String fileName = FileUtil.getName(filePath);
        String dir = StrUtil.removeSuffix(filePath, fileName);
        reconnectIfTimeout();
        boolean success = ftp.upload(dir, fileName, new ByteArrayInputStream(content)); 
        if (!success) {
            throw new FtpException(StrUtil.format("Failed to upload file to destination directory ({})", filePath));
        }
        
        return super.formatFileUrl(config.getDomain(), path);
    }

    @Override
    public void delete(String path) {
        String filePath = getFilePath(path);
        reconnectIfTimeout();
        ftp.delFile(filePath);
    }

    @Override
    public byte[] getContent(String path) {
        String filePath = getFilePath(path);
        String fileName = FileUtil.getName(filePath);
        String dir = StrUtil.removeSuffix(filePath, fileName);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        reconnectIfTimeout();
        ftp.download(dir, fileName, out);
        return out.toByteArray();
    }

    private String getFilePath(String path) {
        return config.getBasePath() + StrUtil.SLASH + path;
    }

    private synchronized void reconnectIfTimeout() {
        ftp.reconnectIfTimeout();
    }

}
