package com.zcashjava.znl.module.infra.service.file;

import javax.validation.constraints.NotEmpty;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FileCreateReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FilePageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FilePresignedUrlRespVO;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileDO;

import java.util.List;


public interface FileService {

    
    PageResult<FileDO> getFilePage(FilePageReqVO pageReqVO);

    
    String createFile(@NotEmpty(message = "content cannot be empty") byte[] content,
                      String name, String directory, String type);

    
    FilePresignedUrlRespVO presignPutUrl(@NotEmpty(message = "name cannot be empty") String name,
                                         String directory);
    
    String presignGetUrl(String url, Integer expirationSeconds);

    
    Long createFile(FileCreateReqVO createReqVO);

    
    void deleteFile(Long id) throws Exception;

    
    void deleteFileList(List<Long> ids) throws Exception;

    
    byte[] getFileContent(Long configId, String path) throws Exception;

}
