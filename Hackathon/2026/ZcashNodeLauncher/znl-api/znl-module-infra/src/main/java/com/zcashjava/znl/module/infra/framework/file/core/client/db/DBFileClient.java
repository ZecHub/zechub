package com.zcashjava.znl.module.infra.framework.file.core.client.db;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.extra.spring.SpringUtil;

import java.util.Comparator;
import java.util.List;

import com.zcashjava.znl.module.infra.dal.dataobject.file.FileContentDO;
import com.zcashjava.znl.module.infra.dal.mysql.file.FileContentMapper;
import com.zcashjava.znl.module.infra.framework.file.core.client.AbstractFileClient;


public class DBFileClient extends AbstractFileClient<DBFileClientConfig> {

    private FileContentMapper fileContentMapper;

    public DBFileClient(Long id, DBFileClientConfig config) {
        super(id, config);
    }

    @Override
    protected void doInit() {
        fileContentMapper = SpringUtil.getBean(FileContentMapper.class);
    }

    @Override
    public String upload(byte[] content, String path, String type) {
        FileContentDO contentDO = new FileContentDO();
        contentDO.setConfigId(getId());
        contentDO.setPath(path);
        contentDO.setContent(content);
        fileContentMapper.insert(contentDO);
        
        return super.formatFileUrl(config.getDomain(), path);
    }

    @Override
    public void delete(String path) {
        fileContentMapper.deleteByConfigIdAndPath(getId(), path);
    }

    @Override
    public byte[] getContent(String path) {
        List<FileContentDO> list = fileContentMapper.selectListByConfigIdAndPath(getId(), path);
        if (CollUtil.isEmpty(list)) {
            return null;
        }
        
        list.sort(Comparator.comparing(FileContentDO::getId));
        return CollUtil.getLast(list).getContent();
    }

}
