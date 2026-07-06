package com.zcashjava.znl.module.system.service.dict;

import org.springframework.lang.Nullable;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.dict.vo.data.DictDataPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.dict.vo.data.DictDataSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.dict.DictDataDO;

import java.util.Collection;
import java.util.List;


public interface DictDataService {

    
    Long createDictData(DictDataSaveReqVO createReqVO);

    
    void updateDictData(DictDataSaveReqVO updateReqVO);

    
    void deleteDictData(Long id);

    
    void deleteDictDataList(List<Long> ids);

    
    List<DictDataDO> getDictDataList(@Nullable Integer status, @Nullable String dictType);

    
    PageResult<DictDataDO> getDictDataPage(DictDataPageReqVO pageReqVO);

    
    DictDataDO getDictData(Long id);

    
    long getDictDataCountByDictType(String dictType);

    
    void validateDictDataList(String dictType, Collection<String> values);

    
    DictDataDO getDictData(String dictType, String value);

    
    DictDataDO parseDictData(String dictType, String label);

    
    List<DictDataDO> getDictDataListByDictType(String dictType);

}
