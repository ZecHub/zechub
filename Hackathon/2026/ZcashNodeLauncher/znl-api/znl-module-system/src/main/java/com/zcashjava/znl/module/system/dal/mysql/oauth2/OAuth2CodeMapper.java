package com.zcashjava.znl.module.system.dal.mysql.oauth2;

import org.apache.ibatis.annotations.Mapper;

import com.zcashjava.znl.framework.mybatis.core.mapper.BaseMapperX;
import com.zcashjava.znl.module.system.dal.dataobject.oauth2.OAuth2CodeDO;

@Mapper
public interface OAuth2CodeMapper extends BaseMapperX<OAuth2CodeDO> {

    default OAuth2CodeDO selectByCode(String code) {
        return selectOne(OAuth2CodeDO::getCode, code);
    }

}
