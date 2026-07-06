package com.zcashjava.znl.module.system.api.dict;

import org.springframework.stereotype.Service;

import com.zcashjava.znl.framework.common.biz.system.dict.dto.DictDataRespDTO;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.dal.dataobject.dict.DictDataDO;
import com.zcashjava.znl.module.system.service.dict.DictDataService;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;


@Service
public class DictDataApiImpl implements DictDataApi {

    @Resource
    private DictDataService dictDataService;

    @Override
    public void validateDictDataList(String dictType, Collection<String> values) {
        dictDataService.validateDictDataList(dictType, values);
    }

    @Override
    public List<DictDataRespDTO> getDictDataList(String dictType) {
        List<DictDataDO> list = dictDataService.getDictDataListByDictType(dictType);
        return BeanUtils.toBean(list, DictDataRespDTO.class);
    }

}
