package com.zcashjava.znl.module.infra.service.file;

import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.DigestUtil;

import com.google.common.annotations.VisibleForTesting;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.http.HttpUtils;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FileCreateReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FilePageReqVO;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.file.FilePresignedUrlRespVO;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileDO;
import com.zcashjava.znl.module.infra.dal.mysql.file.FileMapper;
import com.zcashjava.znl.module.infra.framework.file.core.client.FileClient;
import com.zcashjava.znl.module.infra.framework.file.core.utils.FileTypeUtils;

import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

import static cn.hutool.core.date.DatePattern.PURE_DATE_PATTERN;
import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.infra.enums.ErrorCodeConstants.FILE_NOT_EXISTS;


@Service
public class FileServiceImpl implements FileService {

    
    static boolean PATH_PREFIX_DATE_ENABLE = true;
    
    static boolean PATH_SUFFIX_TIMESTAMP_ENABLE = true;

    @Resource
    private FileConfigService fileConfigService;

    @Resource
    private FileMapper fileMapper;

    @Override
    public PageResult<FileDO> getFilePage(FilePageReqVO pageReqVO) {
        return fileMapper.selectPage(pageReqVO);
    }

    @Override
    @SneakyThrows
    public String createFile(byte[] content, String name, String directory, String type) {
        
        if (StrUtil.isEmpty(type)) {
            type = FileTypeUtils.getMineType(content, name);
        }
        
        if (StrUtil.isEmpty(name)) {
            name = DigestUtil.sha256Hex(content);
        }
        if (StrUtil.isEmpty(FileUtil.extName(name))) {
            
            String extension = FileTypeUtils.getExtension(type);
            if (StrUtil.isNotEmpty(extension)) {
                name = name + extension;
            }
        }

        
        String path = generateUploadPath(name, directory);
        
        FileClient client = fileConfigService.getMasterFileClient();
        Assert.notNull(client, "Client (master) cannot be empty");
        String url = client.upload(content, path, type);

        
        FileDO fileDO = new FileDO();
        fileDO.setConfigId(client.getId());
        fileDO.setName(name);
        fileDO.setPath(path);
        fileDO.setUrl(url);
        fileDO.setType(type);
        fileDO.setSize(content.length);
        
        fileMapper.insert(fileDO);
        return url;
    }

    @VisibleForTesting
    String generateUploadPath(String name, String directory) {
        
        String prefix = null;
        if (PATH_PREFIX_DATE_ENABLE) {
            prefix = LocalDateTimeUtil.format(LocalDateTimeUtil.now(), PURE_DATE_PATTERN);
        }
        String suffix = null;
        if (PATH_SUFFIX_TIMESTAMP_ENABLE) {
            suffix = String.valueOf(System.currentTimeMillis());
        }

        
        if (StrUtil.isNotEmpty(suffix)) {
            String ext = FileUtil.extName(name);
            if (StrUtil.isNotEmpty(ext)) {
                name = FileUtil.mainName(name) + StrUtil.C_UNDERLINE + suffix + StrUtil.DOT + ext;
            } else {
                name = name + StrUtil.C_UNDERLINE + suffix;
            }
        }
        
        if (StrUtil.isNotEmpty(prefix)) {
            name = prefix + StrUtil.SLASH + name;
        }
        
        if (StrUtil.isNotEmpty(directory)) {
            name = directory + StrUtil.SLASH + name;
        }
        return name;
    }

    @Override
    @SneakyThrows
    public FilePresignedUrlRespVO presignPutUrl(String name, String directory) {
        
        String path = generateUploadPath(name, directory);

        
        FileClient fileClient = fileConfigService.getMasterFileClient();
        String uploadUrl = fileClient.presignPutUrl(path);
        String visitUrl = fileClient.presignGetUrl(path, null);
        FilePresignedUrlRespVO vo = new FilePresignedUrlRespVO();
        
        vo.setConfigId(fileClient.getId());
        vo.setPath(path);
        vo.setUploadUrl(uploadUrl);
        vo.setUrl(visitUrl);
        return vo;
    }

    @Override
    public String presignGetUrl(String url, Integer expirationSeconds) {
        FileClient fileClient = fileConfigService.getMasterFileClient();
        return fileClient.presignGetUrl(url, expirationSeconds);
    }

    @Override
    public Long createFile(FileCreateReqVO createReqVO) {
        createReqVO.setUrl(HttpUtils.removeUrlQuery(createReqVO.getUrl())); 
        FileDO file = BeanUtils.toBean(createReqVO, FileDO.class);
        fileMapper.insert(file);
        return file.getId();
    }

    @Override
    public void deleteFile(Long id) throws Exception {
        
        FileDO file = validateFileExists(id);

        
        FileClient client = fileConfigService.getFileClient(file.getConfigId());
        Assert.notNull(client, "Client ({}) cannot be empty", file.getConfigId());
        client.delete(file.getPath());

        
        fileMapper.deleteById(id);
    }

    @Override
    @SneakyThrows
    public void deleteFileList(List<Long> ids) {
        
        List<FileDO> files = fileMapper.selectByIds(ids);
        for (FileDO file : files) {
            
            FileClient client = fileConfigService.getFileClient(file.getConfigId());
            Assert.notNull(client, "Client ({}) cannot be empty", file.getPath());
            
            client.delete(file.getPath());
        }

        
        fileMapper.deleteByIds(ids);
    }

    private FileDO validateFileExists(Long id) {
        FileDO fileDO = fileMapper.selectById(id);
        if (fileDO == null) {
            throw exception(FILE_NOT_EXISTS);
        }
        return fileDO;
    }

    @Override
    public byte[] getFileContent(Long configId, String path) throws Exception {
        FileClient client = fileConfigService.getFileClient(configId);
        Assert.notNull(client, "Client ({}) cannot be empty", configId);
        return client.getContent(path);
    }

}
