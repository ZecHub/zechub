package com.zcashjava.znl.module.system.api.dept;

import org.springframework.stereotype.Service;

import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.api.dept.dto.DeptRespDTO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;
import com.zcashjava.znl.module.system.service.dept.DeptService;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;


@Service
public class DeptApiImpl implements DeptApi {

    @Resource
    private DeptService deptService;

    @Override
    public DeptRespDTO getDept(Long id) {
        DeptDO dept = deptService.getDept(id);
        return BeanUtils.toBean(dept, DeptRespDTO.class);
    }

    @Override
    public List<DeptRespDTO> getDeptList(Collection<Long> ids) {
        List<DeptDO> depts = deptService.getDeptList(ids);
        return BeanUtils.toBean(depts, DeptRespDTO.class);
    }

    @Override
    public void validateDeptList(Collection<Long> ids) {
        deptService.validateDeptList(ids);
    }

    @Override
    public List<DeptRespDTO> getChildDeptList(Long id) {
        List<DeptDO> childDeptList = deptService.getChildDeptList(id);
        return BeanUtils.toBean(childDeptList, DeptRespDTO.class);
    }

}
