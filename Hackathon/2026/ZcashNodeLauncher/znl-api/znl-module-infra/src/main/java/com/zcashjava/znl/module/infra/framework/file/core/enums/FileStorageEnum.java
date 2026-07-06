package com.zcashjava.znl.module.infra.framework.file.core.enums;

import com.zcashjava.znl.module.infra.framework.file.core.client.FileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.db.DBFileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.db.DBFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.ftp.FtpFileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.ftp.FtpFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.local.LocalFileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.local.LocalFileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.s3.S3FileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.s3.S3FileClientConfig;
import com.zcashjava.znl.module.infra.framework.file.core.client.sftp.SftpFileClient;
import com.zcashjava.znl.module.infra.framework.file.core.client.sftp.SftpFileClientConfig;

import cn.hutool.core.util.ArrayUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum FileStorageEnum {

    DB(1, DBFileClientConfig.class, DBFileClient.class),

    LOCAL(10, LocalFileClientConfig.class, LocalFileClient.class),
    FTP(11, FtpFileClientConfig.class, FtpFileClient.class),
    SFTP(12, SftpFileClientConfig.class, SftpFileClient.class),

    S3(20, S3FileClientConfig.class, S3FileClient.class),
    ;

    
    private final Integer storage;

    
    private final Class<? extends FileClientConfig> configClass;
    
    private final Class<? extends FileClient> clientClass;

    public static FileStorageEnum getByStorage(Integer storage) {
        return ArrayUtil.firstMatch(o -> o.getStorage().equals(storage), values());
    }

}
