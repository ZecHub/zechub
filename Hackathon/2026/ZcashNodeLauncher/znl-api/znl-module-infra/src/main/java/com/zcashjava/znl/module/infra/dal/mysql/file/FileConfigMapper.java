package com.zcashjava.znl.module.infra.dal.mysql.file;

import org.apache.ibatis.annotations.Mapper;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.mybatis.core.mapper.BaseMapperX;
import com.zcashjava.znl.framework.mybatis.core.query.LambdaQueryWrapperX;
import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigPageReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileConfigDO;

@Mapper
public interface FileConfigMapper extends BaseMapperX<FileConfigDO> {

    default PageResult<FileConfigDO> selectPage(FileConfigPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<FileConfigDO>()
                .likeIfPresent(FileConfigDO::getName, reqVO.getName())
                .eqIfPresent(FileConfigDO::getStorage, reqVO.getStorage())
                .betweenIfPresent(FileConfigDO::getCreateTime, reqVO.getCreateTime())
                .orderByDesc(FileConfigDO::getId));
    }

    default FileConfigDO selectByMaster() {
        return selectOne(FileConfigDO::getMaster, true);
    }

}
