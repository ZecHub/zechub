package com.zcashjava.znl.module.zcash.dal.mysql.installationscript;

import java.util.*;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.mybatis.core.query.LambdaQueryWrapperX;
import com.zcashjava.znl.framework.mybatis.core.mapper.BaseMapperX;
import com.zcashjava.znl.module.zcash.dal.dataobject.installationscript.InstallationScriptDO;
import org.apache.ibatis.annotations.Mapper;
import com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo.*;

/**
 * Installation script Mapper
 *
 * 
 */
@Mapper
public interface InstallationScriptMapper extends BaseMapperX<InstallationScriptDO> {

    default PageResult<InstallationScriptDO> selectPage(InstallationScriptPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<InstallationScriptDO>()
                .likeIfPresent(InstallationScriptDO::getName, reqVO.getName())
                .eqIfPresent(InstallationScriptDO::getUrl, reqVO.getUrl())
                .eqIfPresent(InstallationScriptDO::getSort, reqVO.getSort())
                .eqIfPresent(InstallationScriptDO::getRemark, reqVO.getRemark())
                .betweenIfPresent(InstallationScriptDO::getCreateTime, reqVO.getCreateTime())
                .orderByDesc(InstallationScriptDO::getId));
    }

}