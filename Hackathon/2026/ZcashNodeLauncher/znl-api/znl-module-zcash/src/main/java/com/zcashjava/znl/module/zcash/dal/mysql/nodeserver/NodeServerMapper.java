package com.zcashjava.znl.module.zcash.dal.mysql.nodeserver;

import java.util.*;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.mybatis.core.query.LambdaQueryWrapperX;
import com.zcashjava.znl.framework.mybatis.core.mapper.BaseMapperX;
import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;
import org.apache.ibatis.annotations.Mapper;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.*;

/**
 * Node Server Mapper
 *
 * 
 */
@Mapper
public interface NodeServerMapper extends BaseMapperX<NodeServerDO> {

    default PageResult<NodeServerDO> selectPage(NodeServerPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<NodeServerDO>()
                .eqIfPresent(NodeServerDO::getHost, reqVO.getHost())
                .likeIfPresent(NodeServerDO::getName, reqVO.getName())
                .eqIfPresent(NodeServerDO::getPort, reqVO.getPort())
                .eqIfPresent(NodeServerDO::getNodeType, reqVO.getNodeType())
                .eqIfPresent(NodeServerDO::getProxyType, reqVO.getProxyType())
                .eqIfPresent(NodeServerDO::getProxyHost, reqVO.getProxyHost())
                .eqIfPresent(NodeServerDO::getProxyPort, reqVO.getProxyPort())
                .likeIfPresent(NodeServerDO::getProxyUsername, reqVO.getProxyUsername())
                .eqIfPresent(NodeServerDO::getProxyPassword, reqVO.getProxyPassword())
                .eqIfPresent(NodeServerDO::getServerStatus, reqVO.getServerStatus())
                .eqIfPresent(NodeServerDO::getServerError, reqVO.getServerError())
                .betweenIfPresent(NodeServerDO::getServerStatusCheckTime, reqVO.getServerStatusCheckTime())
                .eqIfPresent(NodeServerDO::getInstallationStatus, reqVO.getInstallationStatus())
                .eqIfPresent(NodeServerDO::getInstallationLog, reqVO.getInstallationLog())
                .betweenIfPresent(NodeServerDO::getInstallationStatusCheckTime, reqVO.getInstallationStatusCheckTime())
                .eqIfPresent(NodeServerDO::getNodeStatus, reqVO.getNodeStatus())
                .eqIfPresent(NodeServerDO::getNodeError, reqVO.getNodeError())
                .betweenIfPresent(NodeServerDO::getNodeStatusCheckTime, reqVO.getNodeStatusCheckTime())
                .eqIfPresent(NodeServerDO::getSort, reqVO.getSort())
                .eqIfPresent(NodeServerDO::getRemark, reqVO.getRemark())
                .betweenIfPresent(NodeServerDO::getCreateTime, reqVO.getCreateTime())
                .orderByDesc(NodeServerDO::getId));
    }

}