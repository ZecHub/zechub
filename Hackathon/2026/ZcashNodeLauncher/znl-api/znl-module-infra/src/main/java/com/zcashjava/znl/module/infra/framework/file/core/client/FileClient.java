package com.zcashjava.znl.module.infra.framework.file.core.client;


public interface FileClient {

    
    Long getId();

    
    String upload(byte[] content, String path, String type) throws Exception;

    
    void delete(String path) throws Exception;

    
    byte[] getContent(String path) throws Exception;

    

    
    default String presignPutUrl(String path) {
        throw new UnsupportedOperationException("not implemented");
    }

    
    default String presignGetUrl(String url, Integer expirationSeconds) {
        throw new UnsupportedOperationException("not implemented");
    }

}
