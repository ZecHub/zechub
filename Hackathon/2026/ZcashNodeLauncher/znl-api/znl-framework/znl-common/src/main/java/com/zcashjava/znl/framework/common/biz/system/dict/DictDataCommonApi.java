package com.zcashjava.znl.framework.common.biz.system.dict;

import java.util.List;

import com.zcashjava.znl.framework.common.biz.system.dict.dto.DictDataRespDTO;


public interface DictDataCommonApi {

    
    List<DictDataRespDTO> getDictDataList(String dictType);

}
