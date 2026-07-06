package com.zcashjava.znl.module.infra.api.file;

import javax.validation.constraints.NotEmpty;


public interface FileApi {

    
    default String createFile(byte[] content) {
        return createFile(content, null, null, null);
    }

    
    default String createFile(byte[] content, String name) {
        return createFile(content, name, null, null);
    }

    
    String createFile(@NotEmpty(message = "content cannot be empty") byte[] content,
                      String name, String directory, String type);

    
    String presignGetUrl(@NotEmpty(message = "URL cannot be empty") String url,
                         Integer expirationSeconds);

}
