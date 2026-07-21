package com.zcashjava.znl.module.system.service.dept;

import java.util.*;

import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptListReqVO;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;


public interface DeptService {

    
    Long createDept(DeptSaveReqVO createReqVO);

    
    void updateDept(DeptSaveReqVO updateReqVO);

    
    void deleteDept(Long id);

    
    void deleteDeptList(List<Long> ids);

    
    DeptDO getDept(Long id);

    
    List<DeptDO> getDeptList(Collection<Long> ids);

    
    List<DeptDO> getDeptList(DeptListReqVO reqVO);

    
    default Map<Long, DeptDO> getDeptMap(Collection<Long> ids) {
        List<DeptDO> list = getDeptList(ids);
        return CollectionUtils.convertMap(list, DeptDO::getId);
    }

    
    default List<DeptDO> getChildDeptList(Long id) {
        return getChildDeptList(Collections.singleton(id));
    }

    
    List<DeptDO> getChildDeptList(Collection<Long> ids);

    
    List<DeptDO> getDeptListByLeaderUserId(Long id);

    
    Set<Long> getChildDeptIdListFromCache(Long id);

    
    void validateDeptList(Collection<Long> ids);

}
