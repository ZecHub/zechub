package com.zcashjava.znl.module.infra.convert.file;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.zcashjava.znl.module.infra.controller.admin.file.vo.config.FileConfigSaveReqVO;
import com.zcashjava.znl.module.infra.dal.dataobject.file.FileConfigDO;


@Mapper
public interface FileConfigConvert {

    FileConfigConvert INSTANCE = Mappers.getMapper(FileConfigConvert.class);

    @Mapping(target = "config", ignore = true)
    FileConfigDO convert(FileConfigSaveReqVO bean);

}
