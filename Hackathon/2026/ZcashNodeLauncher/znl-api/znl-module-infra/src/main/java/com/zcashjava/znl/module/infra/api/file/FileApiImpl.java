package com.zcashjava.znl.module.infra.api.file;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.zcashjava.znl.module.infra.service.file.FileService;

import javax.annotation.Resource;


@Service
@Validated
public class FileApiImpl implements FileApi {

    @Resource
    private FileService fileService;

    @Override
    public String createFile(byte[] content, String name, String directory, String type) {
        return fileService.createFile(content, name, directory, type);
    }

    @Override
    public String presignGetUrl(String url, Integer expirationSeconds) {
        return fileService.presignGetUrl(url, expirationSeconds);
    }

}
