package com.zcashjava.znl.module.system.service.dict;

import java.util.List;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.dict.vo.type.DictTypePageReqVO;
import com.zcashjava.znl.module.system.controller.admin.dict.vo.type.DictTypeSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.dict.DictTypeDO;


public interface DictTypeService {

    
    Long createDictType(DictTypeSaveReqVO createReqVO);

    
    void updateDictType(DictTypeSaveReqVO updateReqVO);

    
    void deleteDictType(Long id);

    
    void deleteDictTypeList(List<Long> ids);

    
    PageResult<DictTypeDO> getDictTypePage(DictTypePageReqVO pageReqVO);

    
    DictTypeDO getDictType(Long id);

    
    DictTypeDO getDictType(String type);

    
    List<DictTypeDO> getDictTypeList();

}
