package com.zcashjava.znl.module.system.api.dept;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.module.system.api.dept.dto.DeptRespDTO;


public interface DeptApi {

    
    DeptRespDTO getDept(Long id);

    
    List<DeptRespDTO> getDeptList(Collection<Long> ids);

    
    void validateDeptList(Collection<Long> ids);

    
    default Map<Long, DeptRespDTO> getDeptMap(Collection<Long> ids) {
        List<DeptRespDTO> list = getDeptList(ids);
        return CollectionUtils.convertMap(list, DeptRespDTO::getId);
    }

    
    List<DeptRespDTO> getChildDeptList(Long id);

}
