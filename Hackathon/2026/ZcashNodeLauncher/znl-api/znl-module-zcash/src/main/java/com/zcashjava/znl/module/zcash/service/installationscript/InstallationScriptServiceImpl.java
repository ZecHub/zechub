package com.zcashjava.znl.module.zcash.service.installationscript;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo.*;
import com.zcashjava.znl.module.zcash.dal.dataobject.installationscript.InstallationScriptDO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;

import com.zcashjava.znl.module.zcash.dal.mysql.installationscript.InstallationScriptMapper;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertList;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.diffList;
import static com.zcashjava.znl.module.zcash.enums.ErrorCodeConstants.*;

/**
 * Installation script Service Implementation
 *
 * 
 */
@Service
@Validated
public class InstallationScriptServiceImpl implements InstallationScriptService {

    @Resource
    private InstallationScriptMapper installationScriptMapper;

    @Override
    public Long createInstallationScript(InstallationScriptSaveReqVO createReqVO) {
        // Insert
        InstallationScriptDO installationScript = BeanUtils.toBean(createReqVO, InstallationScriptDO.class);
        installationScriptMapper.insert(installationScript);

        // Return
        return installationScript.getId();
    }

    @Override
    public void updateInstallationScript(InstallationScriptSaveReqVO updateReqVO) {
        // Validate existence
        validateInstallationScriptExists(updateReqVO.getId());
        // Update
        InstallationScriptDO updateObj = BeanUtils.toBean(updateReqVO, InstallationScriptDO.class);
        installationScriptMapper.updateById(updateObj);
    }

    @Override
    public void deleteInstallationScript(Long id) {
        // Validate existence
        validateInstallationScriptExists(id);
        // Delete
        installationScriptMapper.deleteById(id);
    }

    @Override
        public void deleteInstallationScriptListByIds(List<Long> ids) {
        // Delete
        installationScriptMapper.deleteByIds(ids);
        }


    private void validateInstallationScriptExists(Long id) {
        if (installationScriptMapper.selectById(id) == null) {
            throw exception(INSTALLATION_SCRIPT_NOT_EXISTS);
        }
    }

    @Override
    public InstallationScriptDO getInstallationScript(Long id) {
        return installationScriptMapper.selectById(id);
    }

    @Override
    public PageResult<InstallationScriptDO> getInstallationScriptPage(InstallationScriptPageReqVO pageReqVO) {
        return installationScriptMapper.selectPage(pageReqVO);
    }

}