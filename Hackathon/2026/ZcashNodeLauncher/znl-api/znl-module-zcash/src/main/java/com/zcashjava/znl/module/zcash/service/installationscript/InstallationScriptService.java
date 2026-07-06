package com.zcashjava.znl.module.zcash.service.installationscript;

import java.util.*;
import javax.validation.*;
import com.zcashjava.znl.module.zcash.controller.admin.installationscript.vo.*;
import com.zcashjava.znl.module.zcash.dal.dataobject.installationscript.InstallationScriptDO;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.pojo.PageParam;

/**
 * Installation script Service Interface
 *
 * 
 */
public interface InstallationScriptService {

    /**
     * Create Installation script
     *
     * @param createReqVO Creation information
     * @return ID
     */
    Long createInstallationScript(@Valid InstallationScriptSaveReqVO createReqVO);

    /**
     * Update Installation script
     *
     * @param updateReqVO Update information
     */
    void updateInstallationScript(@Valid InstallationScriptSaveReqVO updateReqVO);

    /**
     * Delete Installation script
     *
     * @param id ID
     */
    void deleteInstallationScript(Long id);

    /**
    * Batch delete Installation script
    *
    * @param ids IDs
    */
    void deleteInstallationScriptListByIds(List<Long> ids);

    /**
     * Get Installation script
     *
     * @param id ID
     * @return Installation script
     */
    InstallationScriptDO getInstallationScript(Long id);

    /**
     * Get Installation script page
     *
     * @param pageReqVO Page query
     * @return Installation script page
     */
    PageResult<InstallationScriptDO> getInstallationScriptPage(InstallationScriptPageReqVO pageReqVO);

}