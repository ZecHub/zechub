package com.zcashjava.znl.framework.common.util.io;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import lombok.SneakyThrows;

import java.io.File;


public class FileUtils {

    
    @SneakyThrows
    public static File createTempFile(String data) {
        File file = createTempFile();
        
        FileUtil.writeUtf8String(data, file);
        return file;
    }

    
    @SneakyThrows
    public static File createTempFile(byte[] data) {
        File file = createTempFile();
        
        FileUtil.writeBytes(data, file);
        return file;
    }

    
    @SneakyThrows
    public static File createTempFile() {
        
        File file = File.createTempFile(IdUtil.simpleUUID(), null);
        
        file.deleteOnExit();
        return file;
    }

}
