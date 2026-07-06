package com.zcashjava.znl.module.system.controller.admin.dept;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptListReqVO;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptRespVO;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptSaveReqVO;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.dept.DeptSimpleRespVO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.DeptDO;
import com.zcashjava.znl.module.system.service.dept.DeptService;

import javax.annotation.Resource;
import javax.validation.Valid;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.util.List;

@Tag(name = "Manage the backstage - department")
@RestController
@RequestMapping("/system/dept")
@Validated
public class DeptController {

    @Resource
    private DeptService deptService;

    @PostMapping("create")
    @Operation(summary = "Create Department")
    @PreAuthorize("@ss.hasPermission('system:dept:create')")
    public CommonResult<Long> createDept(@Valid @RequestBody DeptSaveReqVO createReqVO) {
        Long deptId = deptService.createDept(createReqVO);
        return success(deptId);
    }

    @PutMapping("update")
    @Operation(summary = "Update Department")
    @PreAuthorize("@ss.hasPermission('system:dept:update')")
    public CommonResult<Boolean> updateDept(@Valid @RequestBody DeptSaveReqVO updateReqVO) {
        deptService.updateDept(updateReqVO);
        return success(true);
    }

    @DeleteMapping("delete")
    @Operation(summary = "Delete Department")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('system:dept:delete')")
    public CommonResult<Boolean> deleteDept(@RequestParam("id") Long id) {
        deptService.deleteDept(id);
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Operation(summary = "Bulk Remove Sectors")
    @Parameter(name = "ids", description = "Numbering List", required = true)
    @PreAuthorize("@ss.hasPermission('system:dept:delete')")
    public CommonResult<Boolean> deleteDeptList(@RequestParam("ids") List<Long> ids) {
        deptService.deleteDeptList(ids);
        return success(true);
    }

    @GetMapping("/list")
    @Operation(summary = "Fetch sector list")
    @PreAuthorize("@ss.hasPermission('system:dept:query')")
    public CommonResult<List<DeptRespVO>> getDeptList(DeptListReqVO reqVO) {
        List<DeptDO> list = deptService.getDeptList(reqVO);
        return success(BeanUtils.toBean(list, DeptRespVO.class));
    }

    @GetMapping(value = {"/list-all-simple", "/simple-list"})
    @Operation(summary = "Obtain a list of streamlined departmental information", description = "Only sectors opened, mainly for front-end drop-down options")
    public CommonResult<List<DeptSimpleRespVO>> getSimpleDeptList() {
    	DeptListReqVO deptListReqVO = new DeptListReqVO();
    	deptListReqVO.setStatus(CommonStatusEnum.ENABLE.getStatus());
        List<DeptDO> list = deptService.getDeptList(deptListReqVO);
        return success(BeanUtils.toBean(list, DeptSimpleRespVO.class));
    }

    @GetMapping("/get")
    @Operation(summary = "Access to sectoral information")
    @Parameter(name = "id", description = "Numbering", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('system:dept:query')")
    public CommonResult<DeptRespVO> getDept(@RequestParam("id") Long id) {
        DeptDO dept = deptService.getDept(id);
        return success(BeanUtils.toBean(dept, DeptRespVO.class));
    }

}
