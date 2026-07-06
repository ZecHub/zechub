package com.zcashjava.znl.module.zcash.service.nodeserver;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.module.zcash.enums.ErrorCodeConstants.NODE_SERVER_NOT_EXISTS;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

import javax.annotation.Resource;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.Strings;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.redis.RedisSafeTemplate;
import com.zcashjava.znl.framework.redis.Routine;
import com.zcashjava.znl.framework.ssh.DockerPsResult;
import com.zcashjava.znl.framework.ssh.NodeStatus;
import com.zcashjava.znl.framework.ssh.ServerOperationResult;
import com.zcashjava.znl.framework.ssh.ZcashNodeClient;
import com.zcashjava.znl.framework.ssh.ZcashNodeManager;
import com.zcashjava.znl.module.zcash.config.ZnlProperties;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerPageReqVO;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerSaveReqVO;
import com.zcashjava.znl.module.zcash.dal.dataobject.installationscript.InstallationScriptDO;
import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;
import com.zcashjava.znl.module.zcash.dal.mysql.installationscript.InstallationScriptMapper;
import com.zcashjava.znl.module.zcash.dal.mysql.nodeserver.NodeServerMapper;

import lombok.extern.slf4j.Slf4j;

/**
 * Node Server Service Implementation
 *
 * 
 */
@Service
@Validated
@Slf4j
public class NodeServerServiceImpl implements NodeServerService {


	@Autowired
	private ZnlProperties znlProperties;

    @Resource
    private NodeServerMapper nodeServerMapper;
    
    
    
    @Autowired
    private RedisSafeTemplate redisSafeTemplate;
    
    
    @Autowired
    private NodeInfoManager nodeInfoManager;
    
    @Autowired
    private ResourcePatternResolver resourcePatternResolver;
    
    
    @Autowired
    private InstallationScriptMapper installationScriptMapper;
    
    



	
    ;
    

	@Override
    public Long createNodeServer(NodeServerSaveReqVO createReqVO) {
        // Insert
        NodeServerDO nodeServer = BeanUtils.toBean(createReqVO, NodeServerDO.class);
        
        nodeServer.encryptPasswords(znlProperties.getServerPasswordCipherKey());
        
        
        nodeServerMapper.insert(nodeServer);
        
        if (createReqVO.getRefreshServerStatus() != null &&  createReqVO.getRefreshServerStatus()) {
            refreshStatus(nodeServer);
		}
        
        // Return
        return nodeServer.getId();
    }

    protected void refreshStatus(NodeServerDO nodeServer) {
    	


    	Void result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + nodeServer.getId(), 
        		new Routine<Void>() {

			@Override
			public Void execute() throws Exception {
				

		    	ZcashNodeManager nodeManager = new ZcashNodeManager();
		        nodeManager.setServerConfig(nodeServer.toServerConfig());
		        
		        NodeStatus nodeStatus = null;
		        try {
					nodeStatus = nodeManager.getNodeStatus();
				} catch (IOException e) {
					log.error("Connect to server: " + nodeServer.getHost() + " failed. ", e);
					nodeStatus = new NodeStatus();
					
					nodeStatus.setServerStatusCheckTime(LocalDateTime.now());
					nodeStatus.setServerStatus("lost");
					nodeStatus.setServerError(ExceptionUtils.getStackTrace(e));
					
				}
		        
		        LambdaUpdateWrapper<NodeServerDO> update = new LambdaUpdateWrapper<>(NodeServerDO.class);
		        update.set(NodeServerDO::getServerError, nodeStatus.getServerError())
		        .set(NodeServerDO::getServerStatus, nodeStatus.getServerStatus())
		        .set(NodeServerDO::getServerStatusCheckTime, nodeStatus.getServerStatusCheckTime())
		        .set(NodeServerDO::getInstallationStatus, nodeStatus.getInstallationStatus())
		        .set(NodeServerDO::getInstallationStatusCheckTime, nodeStatus.getInstallationStatusCheckTime())
		        .set(NodeServerDO::getNodeStatus, nodeStatus.getNodeStatus())
		        .set(NodeServerDO::getNodeStatusCheckTime, nodeStatus.getNodeStatusCheckTime())
		        .eq(NodeServerDO::getId, nodeServer.getId())
		        ;
		        
		        nodeServerMapper.update(update);
		        
		        return (Void)null;
				
			}
		});
    	
        
	}

	@Override
    public void updateNodeServer(NodeServerSaveReqVO updateReqVO) {
        // Validate existence
        validateNodeServerExists(updateReqVO.getId());
        // Update
        NodeServerDO updateObj = BeanUtils.toBean(updateReqVO, NodeServerDO.class);
        
        
        updateObj.encryptPasswords(znlProperties.getServerPasswordCipherKey());
        
        nodeServerMapper.updateById(updateObj);
        
        if (updateReqVO.getRefreshServerStatus() != null &&  updateReqVO.getRefreshServerStatus()) {
            refreshStatus(updateObj);
		}
        nodeInfoManager.updateNodeInfoCache(updateObj);
    }

    @Override
    public void deleteNodeServer(Long id) {
        // Validate existence
        validateNodeServerExists(id);
        // Delete
        // TODO add concurrent lock
        nodeServerMapper.deleteById(id);
        nodeInfoManager.deleteNodeInfoCache(id);
    }

	@Override
	public void deleteNodeServerListByIds(List<Long> ids) {
		// Delete
		
		// TODO add concurrent lock
		nodeServerMapper.deleteByIds(ids);
		
		for (Long id : ids) {
	        nodeInfoManager.deleteNodeInfoCache(id);
		}
		
	}

    private NodeServerDO validateNodeServerExists(Long id) {
    	NodeServerDO findById = nodeServerMapper.selectById(id);
        if (findById == null) {
            throw exception(NODE_SERVER_NOT_EXISTS);
        }
        
        findById.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        
        return findById;
    }

    @Override
    public NodeServerDO getNodeServer(Long id) {
    	
    	NodeServerDO result = nodeServerMapper.selectById(id);

    	result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        
    	
        return result;
    }

    @Override
    public PageResult<NodeServerDO> getNodeServerPage(NodeServerPageReqVO pageReqVO) {
        PageResult<NodeServerDO> results = nodeServerMapper.selectPage(pageReqVO);
        
        List<NodeServerDO> nodeServerDOs = results.getList();
        if (CollectionUtils.isNotEmpty(nodeServerDOs)) {
			
        	for (NodeServerDO nodeServerDO : nodeServerDOs) {
				
        		nodeServerDO.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        		
			}
        	
		}
        
        
        
        return results;
    }

	@Override
	public NodeServerDO refreshStatus(Long id) {
		
		// Validate existence
        NodeServerDO nodeServerDO = validateNodeServerExists(id);
        
        refreshStatus(nodeServerDO);
		
        return nodeServerDO;
		
	}
	
	
	
	@Override
	public NodeServerDO start(Long id, Consumer<NodeServerDO> dockerContainerNotExistsHandler, 
			Consumer<NodeServerDO> nodeServerAlreadyRunningHandler) throws IOException {

        
        NodeServerDO result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + id, 
        		new Routine<NodeServerDO>() {

			@Override
			public NodeServerDO execute() throws Exception {
				return startInternal(id, dockerContainerNotExistsHandler, nodeServerAlreadyRunningHandler);
			}
		});
        
        
        return result;
        

        
	}
	
	
	
	

	protected NodeServerDO startInternal(Long id, Consumer<NodeServerDO> dockerContainerNotExistsHandler, 
			Consumer<NodeServerDO> nodeServerAlreadyRunningHandler) {
		
		
        NodeServerDO nodeServerDO = validateNodeServerExists(id);
        
        
        LocalDateTime now = LocalDateTime.now();

        try (ZcashNodeClient nodeClient = new ZcashNodeClient(nodeServerDO.toServerConfig())){
        	
        	DockerPsResult dockerPsResult = nodeClient.getDockerImageStatus();
        	if (dockerPsResult == null) {
        		
        		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
    					.set(NodeServerDO::getNodeError, "Docker container znl-zebra-node not exists! ")
    					.set(NodeServerDO::getNodeStatus, "")
    					.set(NodeServerDO::getNodeStatusCheckTime, now)
    					.set(NodeServerDO::getInstallationStatus, NodeServerDO.installationStatus_notInstalled)
    					.set(NodeServerDO::getInstallationStatusCheckTime, now)
    					.eq(NodeServerDO::getId, nodeServerDO.getId()));
        		
        		
        		
        		NodeServerDO result = nodeServerMapper.selectById(id);
        		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        		
        		if (dockerContainerNotExistsHandler != null) {
        			dockerContainerNotExistsHandler.accept(result);
				}
        		
        		return result;
        		
			}
        	
        	
        	String nodeStatus = dockerPsResult.getNode().get("State").textValue();
        	
        	if (Strings.CS.equals(nodeStatus, NodeServerDO.nodeStatus_running)) {
        		

        		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
    					.set(NodeServerDO::getNodeError, "Node server already running. ")
    					.set(NodeServerDO::getNodeStatus, nodeStatus)
    					.set(NodeServerDO::getNodeStatusCheckTime, now)
    					.eq(NodeServerDO::getId, nodeServerDO.getId()));
        		
        		
        		
        		NodeServerDO result = nodeServerMapper.selectById(id);
        		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        		
        		if (nodeServerAlreadyRunningHandler != null) {
        			nodeServerAlreadyRunningHandler.accept(result);
				}
        		
        		return result;
        		
        		
			}
        	
        	
        	// TODO support for other State. 
        	
        	ServerOperationResult<Void> startResult = nodeClient.start();
        	

    		
    		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getNodeError, startResult.getTerminalOutput())
					.set(NodeServerDO::getNodeStatus, NodeServerDO.nodeStatus_running)
					.set(NodeServerDO::getNodeStatusCheckTime, now)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));
    		
    		nodeInfoManager.updateNodeInfoCache(nodeServerDO);
        	
    		NodeServerDO result = nodeServerMapper.selectById(id);
    		

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		return result;
		} catch (Exception e) {
			log.error("Start node server failed: \n" + e.getMessage(), e);
			
    		
			
			nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getNodeError, ExceptionUtils.getStackTrace(e))
					.set(NodeServerDO::getNodeStatusCheckTime, now)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));
			

    		NodeServerDO result = nodeServerMapper.selectById(id);

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		return result;
			
		}
		
	}

	@Override
	public NodeServerDO stop(Long id, Consumer<NodeServerDO> dockerContainerNotExistsHandler, 
			Consumer<NodeServerDO> nodeNotRunningHandler) throws IOException {
		

        NodeServerDO result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + id, 
        		new Routine<NodeServerDO>() {

			@Override
			public NodeServerDO execute() throws Exception {
				return stopInternal(id, dockerContainerNotExistsHandler, nodeNotRunningHandler);
			}
		});
        
        
        return result;
		

        
	}
	
	
	
	

	protected NodeServerDO stopInternal(Long id, Consumer<NodeServerDO> dockerContainerNotExistsHandler, 
			Consumer<NodeServerDO> nodeNotRunningHandler) {
		

        NodeServerDO nodeServerDO = validateNodeServerExists(id);
        
        LocalDateTime now = LocalDateTime.now();

        try (ZcashNodeClient nodeClient = new ZcashNodeClient(nodeServerDO.toServerConfig())){
        	
        	DockerPsResult dockerPsResult = nodeClient.getDockerImageStatus();
        	if (dockerPsResult == null) {
        		
        		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
    					.set(NodeServerDO::getNodeError, null)
    					.set(NodeServerDO::getNodeStatus, null)
    					.set(NodeServerDO::getNodeStatusCheckTime, now)
    					.set(NodeServerDO::getInstallationStatus, NodeServerDO.installationStatus_notInstalled)
    					.set(NodeServerDO::getInstallationStatusCheckTime, now)
    					.eq(NodeServerDO::getId, nodeServerDO.getId()));
        		

        		
        		NodeServerDO result = nodeServerMapper.selectById(id);
        		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        		
        		if (dockerContainerNotExistsHandler != null) {
        			dockerContainerNotExistsHandler.accept(result);
				}
        		

        		
        		return result;
        	}
        	
        	String nodeStatus = dockerPsResult.getNode().get("State").textValue();
        	if (!Strings.CS.equals(nodeStatus, NodeServerDO.nodeStatus_running)) {
				
        		
        		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
    					.set(NodeServerDO::getNodeError, "Node not yet running. ")
    					.set(NodeServerDO::getNodeStatus, nodeStatus)
    					.set(NodeServerDO::getNodeStatusCheckTime, now)
    					.eq(NodeServerDO::getId, nodeServerDO.getId()));
        		
        		
        		
        		NodeServerDO result = nodeServerMapper.selectById(id);
        		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        		
        		if (nodeNotRunningHandler != null) {
        			nodeNotRunningHandler.accept(result);
				}
        		
        		return result;
        		
			}
        	
        	// TODO support for other State. 
        	
        	ServerOperationResult<Void> startResult = nodeClient.stop();
        	

    		
    		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getNodeError, startResult.getTerminalOutput())
					.set(NodeServerDO::getNodeStatus, NodeServerDO.nodeStatus_exited)
					.set(NodeServerDO::getNodeStatusCheckTime, now)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));

            nodeInfoManager.updateNodeInfoCache(nodeServerDO);
    		NodeServerDO result = nodeServerMapper.selectById(id);

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		return result;
		} catch (Exception e) {
			log.error("Stop node server failed: \n" + e.getMessage(), e);
			
    		
//			if (e instanceof ServiceException
//					&& Strings.CS.equals(e.getMessage(), "Node not running")) {
//				nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
//						.set(NodeServerDO::getNodeError, ExceptionUtils.getStackTrace(e))
//						.set(NodeServerDO::getNodeStatusCheckTime, now)
//						.set(NodeServerDO::getNodeStatus, null)
//						.eq(NodeServerDO::getId, nodeServerDO.getId()));
//			} else {

				nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
						.set(NodeServerDO::getNodeError, ExceptionUtils.getStackTrace(e))
						.set(NodeServerDO::getNodeStatusCheckTime, now)
						.eq(NodeServerDO::getId, nodeServerDO.getId()));
				
//			}
			

    		NodeServerDO result = nodeServerMapper.selectById(id);

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		return result;
			
		}
	}

	@Override
	public NodeServerDO install(NodeInstallReq req, Consumer<NodeServerDO> alreadyInstalledHandler, 
			BiConsumer<NodeServerDO, Exception> exceptionHandler) throws IOException {
		

        NodeServerDO result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + req.getId(), 
        		new Routine<NodeServerDO>() {

			@Override
			public NodeServerDO execute() throws Exception {
				return installInternal(req, alreadyInstalledHandler, exceptionHandler);
			}
		});
        
        
        return result;
		
        
	}
	
	
	
	


	protected NodeServerDO installInternal(NodeInstallReq req, Consumer<NodeServerDO> alreadyInstalledHandler, 
			BiConsumer<NodeServerDO, Exception> exceptionHandler) {
		

		Long id = req.getId();

        NodeServerDO nodeServerDO = validateNodeServerExists(id);
        
        LocalDateTime now = LocalDateTime.now();

        try (ZcashNodeClient nodeClient = new ZcashNodeClient(nodeServerDO.toServerConfig())){
        	
        	DockerPsResult dockerPsResult = nodeClient.getDockerImageStatus();
        	if (dockerPsResult != null) {
        		
        		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
    					.set(NodeServerDO::getInstallationStatus, NodeServerDO.installationStatus_installed)
    					.set(NodeServerDO::getInstallationStatusCheckTime, now)
    					//.set(NodeServerDO::getInstallationLog, "")
    					.eq(NodeServerDO::getId, nodeServerDO.getId()));
        		
        		NodeServerDO result = nodeServerMapper.selectById(id);
        		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());

        		if (alreadyInstalledHandler != null) {
        			alreadyInstalledHandler.accept(result);
				}

        		
        		return result;
			}
        	
        	
        	
        	
        	String scriptUrl = null;
        	if (Strings.CS.equals(req.getInstallationScriptType(), "Internal")) {
				scriptUrl = "classpath:InternalScripts/" + req.getInstalationScript();
        		
        		
			} else if (Strings.CS.equals(req.getInstallationScriptType(), "Custom")) {
				Long scriptId = Long.valueOf(req.getInstalationScript());
				
				InstallationScriptDO installationScriptDO = installationScriptMapper.selectById(scriptId);
				if (installationScriptDO == null) {
					throw new IllegalStateException("Installation script ["
							+ scriptId
							+ "] not exists. ");
				}
				
				scriptUrl = installationScriptDO.getUrl();
				
			} else {
				throw new IllegalArgumentException("Unsupported installationScriptType: " + req.getInstallationScriptType());
			}
        	
        	// TODO support for other State. 
        	
        	ServerOperationResult<Void> installResult = nodeClient.install(
        			scriptUrl, 
        			req.getNodeType());
        	

    		
    		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getInstallationLog, installResult.getTerminalOutput())
					.set(NodeServerDO::getInstallationStatus, NodeServerDO.installationStatus_installed)
					.set(NodeServerDO::getInstallationStatusCheckTime, now)
					.set(NodeServerDO::getNodeType, req.getNodeType())
					.set(NodeServerDO::getNodeError, null)
					.set(NodeServerDO::getNodeStatus, NodeServerDO.nodeStatus_created)
					.set(NodeServerDO::getNodeStatusCheckTime, now)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));

            nodeInfoManager.updateNodeInfoCache(nodeServerDO);
    		NodeServerDO result = nodeServerMapper.selectById(id);

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		return result;
		} catch (Exception e) {
			log.error("Install node server failed: \n" + e.getMessage(), e);
			
    		
			
			nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getInstallationLog, ExceptionUtils.getStackTrace(e))
					.set(NodeServerDO::getInstallationStatusCheckTime, now)
					.set(NodeServerDO::getNodeType, null)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));
			

    		NodeServerDO result = nodeServerMapper.selectById(id);
    		

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		if (exceptionHandler != null) {
				exceptionHandler.accept(result, e);
			}
    		
    		return result;
			
		}
        
        
	}

	@Override
	public NodeServerDO uninstall(NodeServerSaveReqVO req, Consumer<NodeServerDO> notYetInstalledHandler, 
			BiConsumer<NodeServerDO, Exception> exceptionHandler) throws IOException {


        NodeServerDO result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + req.getId(), 
        		new Routine<NodeServerDO>() {

			@Override
			public NodeServerDO execute() throws Exception {
				return uninstallInternal(req, notYetInstalledHandler, exceptionHandler);
			}
		});
        
        
        return result;
		
		
        
	}
	
	
	
	
	
	protected NodeServerDO uninstallInternal(NodeServerSaveReqVO req, Consumer<NodeServerDO> notYetInstalledHandler, 
			BiConsumer<NodeServerDO, Exception> exceptionHandler) {

		Long id = req.getId();
		
        NodeServerDO nodeServerDO = validateNodeServerExists(id);
        
        LocalDateTime now = LocalDateTime.now();

        try (ZcashNodeClient nodeClient = new ZcashNodeClient(nodeServerDO.toServerConfig())){
        	
        	DockerPsResult dockerPsResult = nodeClient.getDockerImageStatus();
        	if (dockerPsResult == null) {
        		
        		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
    					.set(NodeServerDO::getInstallationStatus, NodeServerDO.installationStatus_notInstalled)
    					.set(NodeServerDO::getInstallationStatusCheckTime, now)
    					.set(NodeServerDO::getInstallationLog, "")
    					.set(NodeServerDO::getNodeType, null)
    					.set(NodeServerDO::getNodeError, null)
    					.set(NodeServerDO::getNodeStatus, null)
    					.set(NodeServerDO::getNodeStatusCheckTime, now)
    					.eq(NodeServerDO::getId, nodeServerDO.getId()));
        		
        		NodeServerDO result = nodeServerMapper.selectById(id);
        		

        		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
        		
        		if (notYetInstalledHandler != null) {
        			notYetInstalledHandler.accept(result);
				}
        		
        		return result;
			}
        	
        	
        	// TODO support for other State. 
        	
        	ServerOperationResult<Void> uninstallResult = nodeClient.uninstall();
        	

    		
    		nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getInstallationLog, uninstallResult.getTerminalOutput())
					.set(NodeServerDO::getInstallationStatus, NodeServerDO.installationStatus_notInstalled)
					.set(NodeServerDO::getInstallationStatusCheckTime, now)
					.set(NodeServerDO::getNodeType, null)
					.set(NodeServerDO::getNodeError, null)
					.set(NodeServerDO::getNodeStatus, null)
					.set(NodeServerDO::getNodeStatusCheckTime, now)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));

            nodeInfoManager.updateNodeInfoCache(nodeServerDO);
    		NodeServerDO result = nodeServerMapper.selectById(id);

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		return result;
		} catch (Exception e) {
			log.error("Uninstall node server failed: \n" + e.getMessage(), e);
			
    		
			
			nodeServerMapper.update(new LambdaUpdateWrapper<NodeServerDO>(NodeServerDO.class)
					.set(NodeServerDO::getInstallationLog, ExceptionUtils.getStackTrace(e))
					.set(NodeServerDO::getInstallationStatusCheckTime, now)
					.eq(NodeServerDO::getId, nodeServerDO.getId()));
			

    		NodeServerDO result = nodeServerMapper.selectById(id);

    		result.decryptPasswords(znlProperties.getServerPasswordCipherKey());
    		
    		if (exceptionHandler != null) {
    			exceptionHandler.accept(result, e);
			}
    		
    		return result;
			
		}
	}

	@Override
	public InstallationScripts getInstallationScripts() throws IOException {
		
		InstallationScripts result = new InstallationScripts();
		
		
		String locationPattern = "classpath*:" + "InternalScripts" + "/**";
		
		org.springframework.core.io.Resource[] resources = resourcePatternResolver.getResources(locationPattern);
		
		for (org.springframework.core.io.Resource resource : resources) {
			
			URI uri = resource.getURI();
			String uriStr = uri.toString();
			
			if (!uriStr.endsWith(".sh")) {
				continue;
			}
			
			int lastIndexOf = uriStr.lastIndexOf("/InternalScripts/");
			
			String scriptPath = uriStr.substring(lastIndexOf + "/InternalScripts/".length());
			
			
			InstallationScript<String> script = new InstallationScript<>();
			script.setLabel(scriptPath);
			script.setValue(scriptPath);
			
			result.getInternalInstallationScripts().add(script);
			
			
		}
		
		List<InstallationScriptDO> installationScriptDOs = installationScriptMapper.selectList();
		for (InstallationScriptDO installationScriptDO : installationScriptDOs) {
			
			

			
			InstallationScript<Long> script = new InstallationScript<>();
			script.setLabel(installationScriptDO.getName());
			script.setValue(installationScriptDO.getId());
			
			result.getCustomInstallationScripts().add(script);
			
		}
		
		
		
		return result;
		
		
	}
	
	
	
	
	
	
	

}