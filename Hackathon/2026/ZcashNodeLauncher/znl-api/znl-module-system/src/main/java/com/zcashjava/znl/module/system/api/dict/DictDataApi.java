package com.zcashjava.znl.module.system.api.dict;

import java.util.Collection;

import com.zcashjava.znl.framework.common.biz.system.dict.DictDataCommonApi;


public interface DictDataApi extends DictDataCommonApi {

    
    void validateDictDataList(String dictType, Collection<String> values);

}
