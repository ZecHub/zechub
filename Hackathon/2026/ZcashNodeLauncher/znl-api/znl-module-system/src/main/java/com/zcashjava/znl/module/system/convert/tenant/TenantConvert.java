package com.zcashjava.znl.module.system.convert.tenant;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.zcashjava.znl.module.system.controller.admin.tenant.vo.tenant.TenantSaveReqVO;
import com.zcashjava.znl.module.system.controller.admin.user.vo.user.UserSaveReqVO;


@Mapper
public interface TenantConvert {

    TenantConvert INSTANCE = Mappers.getMapper(TenantConvert.class);

    default UserSaveReqVO convert02(TenantSaveReqVO bean) {
        UserSaveReqVO reqVO = new UserSaveReqVO();
        reqVO.setUsername(bean.getUsername());
        reqVO.setPassword(bean.getPassword());
        reqVO.setNickname(bean.getContactName());
        reqVO.setMobile(bean.getContactMobile());
        return reqVO;
    }

}
