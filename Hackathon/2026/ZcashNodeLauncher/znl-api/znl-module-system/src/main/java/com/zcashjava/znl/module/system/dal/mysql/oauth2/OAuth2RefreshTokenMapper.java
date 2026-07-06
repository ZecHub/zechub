package com.zcashjava.znl.module.system.dal.mysql.oauth2;

import org.apache.ibatis.annotations.Mapper;

import com.zcashjava.znl.framework.mybatis.core.mapper.BaseMapperX;
import com.zcashjava.znl.framework.mybatis.core.query.LambdaQueryWrapperX;
import com.zcashjava.znl.framework.tenant.core.aop.TenantIgnore;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2RefreshTokenDO;

@Mapper
public interface OAuth2RefreshTokenMapper extends BaseMapperX<OAuth2RefreshTokenDO> {

    default int deleteByRefreshToken(String refreshToken) {
        return delete(new LambdaQueryWrapperX<OAuth2RefreshTokenDO>()
                .eq(OAuth2RefreshTokenDO::getRefreshToken, refreshToken));
    }

    @TenantIgnore 
    default OAuth2RefreshTokenDO selectByRefreshToken(String refreshToken) {
        return selectOne(OAuth2RefreshTokenDO::getRefreshToken, refreshToken);
    }

}
