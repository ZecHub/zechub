package com.zcashjava.znl.module.system.controller.app.dict;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.app.dict.vo.AppDictDataRespVO;
import com.zcashjava.znl.module.system.dal.dataobject.dict.DictDataDO;
import com.zcashjava.znl.module.system.service.dict.DictDataService;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.util.List;

@Tag(name = "User App - Dictionary Data")
@RestController
@RequestMapping("/system/dict-data")
@Validated
public class AppDictDataController {

    @Resource
    private DictDataService dictDataService;

    @GetMapping("/type")
    @Operation(summary = "Query Dictionary Data Information by Dictionary Type")
    @Parameter(name = "type", description = "Dictionary Type", required = true, example = "common_status")
    @PermitAll
    public CommonResult<List<AppDictDataRespVO>> getDictDataListByType(@RequestParam("type") String type) {
        List<DictDataDO> list = dictDataService.getDictDataList(
                CommonStatusEnum.ENABLE.getStatus(), type);
        return success(BeanUtils.toBean(list, AppDictDataRespVO.class));
    }

}
