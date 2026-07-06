package com.zcashjava.znl.module.zcash.service.nodeserver;

import java.io.IOException;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

import javax.validation.Valid;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerPageReqVO;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerSaveReqVO;
import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;

/**
 * Node Server Service Interface
 *
 * 
 */
public interface NodeServerService {

    /**
     * Create Node Server
     *
     * @param createReqVO Creation information
     * @return ID
     */
    Long createNodeServer(@Valid NodeServerSaveReqVO createReqVO);

    /**
     * Update Node Server
     *
     * @param updateReqVO Update information
     */
    void updateNodeServer(@Valid NodeServerSaveReqVO updateReqVO);

    /**
     * Delete Node Server
     *
     * @param id ID
     */
    void deleteNodeServer(Long id);

    /**
    * Batch delete Node Server
    *
    * @param ids IDs
    */
    void deleteNodeServerListByIds(List<Long> ids);

    /**
     * Get Node Server
     *
     * @param id ID
     * @return Node Server
     */
    NodeServerDO getNodeServer(Long id);

    /**
     * Get Node Server page
     *
     * @param pageReqVO Page query
     * @return Node Server page
     */
    PageResult<NodeServerDO> getNodeServerPage(NodeServerPageReqVO pageReqVO);

    NodeServerDO refreshStatus(Long id);

    NodeServerDO start(Long id, Consumer<NodeServerDO> dockerContainerNotExistsHandler, 
			Consumer<NodeServerDO> nodeServerAlreadyRunningHandler) throws IOException;

	NodeServerDO stop(Long id, Consumer<NodeServerDO> dockerContainerNotExistsHandler, 
			Consumer<NodeServerDO> nodeNotRunningHandler) throws IOException;

	NodeServerDO install(NodeInstallReq req, Consumer<NodeServerDO> alreadyInstalledHandler, 
			BiConsumer<NodeServerDO, Exception> exceptionHandler) throws IOException;

	NodeServerDO uninstall(NodeServerSaveReqVO req, Consumer<NodeServerDO> notYetInstalledHandler, 
			BiConsumer<NodeServerDO, Exception> exceptionHandler) throws IOException;

	InstallationScripts getInstallationScripts() throws IOException;

}