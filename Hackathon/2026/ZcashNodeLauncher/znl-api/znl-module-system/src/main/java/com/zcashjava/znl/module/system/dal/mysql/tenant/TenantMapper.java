package com.zcashjava.znl.module.system.dal.mysql.tenant;

import org.apache.ibatis.annotations.Mapper;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.mybatis.core.mapper.BaseMapperX;
import com.zcashjava.znl.framework.mybatis.core.query.LambdaQueryWrapperX;
import com.zcashjava.znl.framework.mybatis.core.util.MyBatisUtils;
import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantPageReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.tenant.TenantDO;

import java.util.List;

@Mapper
public interface TenantMapper extends BaseMapperX<TenantDO> {

    default PageResult<TenantDO> selectPage(TenantPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<TenantDO>()
                .likeIfPresent(TenantDO::getName, reqVO.getName())
                .likeIfPresent(TenantDO::getContactName, reqVO.getContactName())
                .likeIfPresent(TenantDO::getContactMobile, reqVO.getContactMobile())
                .eqIfPresent(TenantDO::getStatus, reqVO.getStatus())
                .betweenIfPresent(TenantDO::getCreateTime, reqVO.getCreateTime())
                .orderByDesc(TenantDO::getId));
    }

    default TenantDO selectByName(String name) {
        return selectOne(TenantDO::getName, name);
    }

    default List<TenantDO> selectListByWebsite(String website) {
        return selectList(new LambdaQueryWrapperX<TenantDO>()
                .apply(MyBatisUtils.findInSet("websites", website)));
    }

    default Long selectCountByPackageId(Long packageId) {
        return selectCount(TenantDO::getPackageId, packageId);
    }

    default List<TenantDO> selectListByPackageId(Long packageId) {
        return selectList(TenantDO::getPackageId, packageId);
    }

    default List<TenantDO> selectListByStatus(Integer status) {
        return selectList(TenantDO::getStatus, status);
    }

}
