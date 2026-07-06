package com.zcashjava.znl.module.infra.framework.file.core.utils;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;

import com.zcashjava.znl.framework.common.util.http.HttpUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
public class FileTypeUtils {

    private static final Tika TIKA = new Tika();

    
    @SneakyThrows
    public static String getMineType(byte[] data) {
        return TIKA.detect(data);
    }

    
    public static String getMineType(String name) {
        return TIKA.detect(name);
    }

    
    public static String getMineType(byte[] data, String name) {
        return TIKA.detect(data, name);
    }

    
    public static String getExtension(String mineType) {
        try {
            return MimeTypes.getDefaultMimeTypes().forName(mineType).getExtension();
        } catch (MimeTypeException e) {
            log.warn("[getExtension] [ Fetching file suffix ({}) failed]", mineType, e);
            return null;
        }
    }

    
    public static void writeAttachment(HttpServletResponse response, String filename, byte[] content) throws IOException {
        
        String mineType = getMineType(content, filename);
        response.setContentType(mineType);
        
        if (isImage(mineType)) {
            
            response.setHeader("Content-Disposition", "inline;filename=" + HttpUtils.encodeUtf8(filename));
        } else {
            response.setHeader("Content-Disposition", "attachment;filename=" + HttpUtils.encodeUtf8(filename));
        }
        
        if (StrUtil.containsIgnoreCase(mineType, "video")) {
            response.setHeader("Content-Length", String.valueOf(content.length));
            response.setHeader("Content-Range", "bytes 0-" + (content.length - 1) + "/" + content.length);
            response.setHeader("Accept-Ranges", "bytes");
        }
        
        IoUtil.write(response.getOutputStream(), false, content);
    }

    
    public static boolean isImage(String mineType) {
        return StrUtil.startWith(mineType, "image/");
    }

}
