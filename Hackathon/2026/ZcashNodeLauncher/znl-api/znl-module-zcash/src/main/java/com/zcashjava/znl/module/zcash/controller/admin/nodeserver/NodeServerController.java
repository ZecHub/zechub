package com.zcashjava.znl.module.zcash.controller.admin.nodeserver;

import static com.zcashjava.znl.framework.apilog.core.enums.OperateTypeEnum.EXPORT;
import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zcashjava.znl.framework.apilog.core.annotation.ApiAccessLog;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.framework.common.pojo.PageParam;
import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.framework.common.pojo.Ref;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.excel.core.util.ExcelUtils;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerPageReqVO;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerRespVO;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerSaveReqVO;
import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;
import com.zcashjava.znl.module.zcash.enums.ErrorCodeConstants;
import com.zcashjava.znl.module.zcash.service.nodeserver.GlobeData;
import com.zcashjava.znl.module.zcash.service.nodeserver.InstallationScripts;
import com.zcashjava.znl.module.zcash.service.nodeserver.NodeInfoManager;
import com.zcashjava.znl.module.zcash.service.nodeserver.NodeInstallReq;
import com.zcashjava.znl.module.zcash.service.nodeserver.NodeServerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.Setter;

@Tag(name = "ZNL - Node Server")
@RestController
@RequestMapping("/zcash/node-server")
@Validated
public class NodeServerController {

    @Resource
    private NodeServerService nodeServerService;
    
    
    @Autowired
    private NodeInfoManager nodeInfoManager;
    
    
    @Getter
    @Setter
    @Value("${znl.demo}")
    private Boolean demo;
    
    

    @PostMapping("/create")
    @Operation(summary = "Create Node Server")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:create')")
    public CommonResult<Long> createNodeServer(@Valid @RequestBody NodeServerSaveReqVO createReqVO) {
        CommonResult<Long> result = success(nodeServerService.createNodeServer(createReqVO));
        
        return result;
    }

    @PutMapping("/update")
    @Operation(summary = "Update Node Server")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:update')")
    public CommonResult<Boolean> updateNodeServer(@Valid @RequestBody NodeServerSaveReqVO updateReqVO) {
        nodeServerService.updateNodeServer(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Delete Node Server")
    @Parameter(name = "id", description = "ID", required = true)
    @PreAuthorize("@ss.hasPermission('zcash:node-server:delete')")
    public CommonResult<Boolean> deleteNodeServer(@RequestParam("id") Long id) {
        nodeServerService.deleteNodeServer(id);
        return success(true);
    }

    @DeleteMapping("/delete-list")
    @Parameter(name = "ids", description = "IDs", required = true)
    @Operation(summary = "Batch delete Node Server")
                @PreAuthorize("@ss.hasPermission('zcash:node-server:delete')")
    public CommonResult<Boolean> deleteNodeServerList(@RequestParam("ids") List<Long> ids) {
        nodeServerService.deleteNodeServerListByIds(ids);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "Get Node Server")
    @Parameter(name = "id", description = "ID", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:query')")
    public CommonResult<NodeServerRespVO> getNodeServer(@RequestParam("id") Long id) {
        NodeServerDO nodeServer = nodeServerService.getNodeServer(id);
        CommonResult<NodeServerRespVO> result = success(BeanUtils.toBean(nodeServer, NodeServerRespVO.class));
        
        clearPasswordIfIsDemoMode(result.getData());
        
        return result;
    }

    private void clearPasswordIfIsDemoMode(NodeServerRespVO data) {
    	if (demo) {
    		data.clearPrivateInfo();
		}
	}

    private void clearPasswordIfIsDemoMode(NodeServerDO data) {
    	if (demo) {
    		data.clearPrivateInfo();
		}
	}

	@GetMapping("/page")
    @Operation(summary = "Get Node Server page")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:query')")
    public CommonResult<PageResult<NodeServerRespVO>> getNodeServerPage(@Valid NodeServerPageReqVO pageReqVO) {
        PageResult<NodeServerDO> pageResult = nodeServerService.getNodeServerPage(pageReqVO);
        
        CommonResult<PageResult<NodeServerRespVO>> results = success(BeanUtils.toBean(pageResult, NodeServerRespVO.class));
        
        results.getData().getList().forEach(data -> {
        	clearPasswordIfIsDemoMode(data);
        });
        
        return results;
    }

    @GetMapping("/export-excel")
    @Operation(summary = "Export Node Server Excel")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:export')")
    @ApiAccessLog(operateType = EXPORT)
    public void exportNodeServerExcel(@Valid NodeServerPageReqVO pageReqVO,
              HttpServletResponse response) throws IOException {
        pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);
        List<NodeServerDO> list = nodeServerService.getNodeServerPage(pageReqVO).getList();
        
        for (NodeServerDO nodeServerDO : list) {
			clearPasswordIfIsDemoMode(nodeServerDO);
		}
        
        // Export Excel
        ExcelUtils.write(response, "Node Server.xls", "Data", NodeServerRespVO.class,
                        BeanUtils.toBean(list, NodeServerRespVO.class));
    }
    
    

    @PostMapping("/refresh-status")
    @Operation(summary = "Refresh status")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:refresh-status')")
    public CommonResult<NodeServerDO> refreshNodeServerStatus(@RequestBody NodeServerSaveReqVO createReqVO) {
    	
    	if (createReqVO.getId() == null) {
			throw new IllegalArgumentException("id must not be null! ");
		}
    	
    	NodeServerDO result = nodeServerService.refreshStatus(createReqVO.getId());
    	clearPasswordIfIsDemoMode(result);
    	
        return success(result);
    }
    
    
    

    @PostMapping("/start")
    @Operation(summary = "start")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:start')")
    public CommonResult<NodeServerDO> startNodeServer(@RequestBody NodeServerSaveReqVO createReqVO) throws IOException {
    	
    	if (createReqVO.getId() == null) {
			throw new IllegalArgumentException("id must not be null! ");
		}
    	
    	
    	Ref<Boolean> dockerImageNotExists = new Ref<>(false);
    	Ref<Boolean> nodeServerAlreadyRunning = new Ref<>(false);
    	NodeServerDO result = nodeServerService.start(createReqVO.getId(), d -> {
    		dockerImageNotExists.setData(true);
    	}, d -> {
    		nodeServerAlreadyRunning.setData(true);
    	});
    	
    	if (dockerImageNotExists.getData()) {
			return CommonResult.error(ErrorCodeConstants.NODE_NOT_INSTALLED);
		}

    	if (nodeServerAlreadyRunning.getData()) {
			return CommonResult.error(ErrorCodeConstants.NODE_SERVER_NOT_RUNNING);
		}
    	
    	clearPasswordIfIsDemoMode(result);
    	
    	
        return success(result);
    }
    

    @PostMapping("/stop")
    @Operation(summary = "stop")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:stop')")
    public CommonResult<NodeServerDO> stopNodeServer(@RequestBody NodeServerSaveReqVO createReqVO) throws IOException {
    	
    	if (createReqVO.getId() == null) {
			throw new IllegalArgumentException("id must not be null! ");
		}
    	

    	Ref<Boolean> dockerImageNotExists = new Ref<>(false);
    	Ref<Boolean> nodeServerNotRunning = new Ref<>(false);
    	NodeServerDO result = nodeServerService.stop(createReqVO.getId(), d -> {
    		dockerImageNotExists.setData(true);
    	}, d -> {
    		nodeServerNotRunning.setData(true);
    	});
    	
    	if (dockerImageNotExists.getData()) {
			return CommonResult.error(ErrorCodeConstants.NODE_NOT_INSTALLED);
		}
    	
    	if (nodeServerNotRunning.getData()) {
			return CommonResult.error(ErrorCodeConstants.NODE_SERVER_NOT_RUNNING);
		}
    	
    	
    	clearPasswordIfIsDemoMode(result);
    	
    	
        return success(result);
    }
    
    


    @PostMapping("/install")
    @Operation(summary = "install")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:install')")
    public CommonResult<NodeServerDO> installNodeServer(@RequestBody NodeInstallReq nodeInstallReq) throws IOException {
    	
    	if (nodeInstallReq.getId() == null) {
			throw new IllegalArgumentException("id must not be null! ");
		}
    	
    	Ref<Boolean> alreadyInstalled = new Ref<>(false);
    	Ref<Exception> installException = new Ref<>(null);
    	NodeServerDO result = nodeServerService.install(nodeInstallReq, d -> {
    		alreadyInstalled.setData(true);
    	}, (d, e) -> {
    		installException.setData(e);
    	});
    	

    	if (alreadyInstalled.getData()) {
			return CommonResult.error(ErrorCodeConstants.ALREADY_INSTALLED);
		}
    	
    	if (installException.getData() != null) {
			return CommonResult.error(ErrorCodeConstants.INSTALL_FAILED);
		}
    	
    	clearPasswordIfIsDemoMode(result);
    	
        return success(result);
    }
    

    @PostMapping("/uninstall")
    @Operation(summary = "uninstall")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:uninstall')")
    public CommonResult<NodeServerDO> uninstallNodeServer(@RequestBody NodeServerSaveReqVO createReqVO) throws IOException {
    	
    	if (createReqVO.getId() == null) {
			throw new IllegalArgumentException("id must not be null! ");
		}

    	Ref<Boolean> notYetInstalled = new Ref<>(false);
    	Ref<Exception> uninstallException = new Ref<>(null);
    	NodeServerDO result = nodeServerService.uninstall(createReqVO, d -> {
    		notYetInstalled.setData(true);
    	}, (d, e) -> {
    		uninstallException.setData(e);
    	});
    	

    	if (notYetInstalled.getData()) {
			return CommonResult.error(ErrorCodeConstants.NODE_NOT_INSTALLED);
		}
    	
    	if (uninstallException.getData() != null) {
			return CommonResult.error(ErrorCodeConstants.UNINSTALL_FAILED.getCode(), 
					ErrorCodeConstants.UNINSTALL_FAILED.getMsg() + "\r\n" + uninstallException.getData().getMessage());
		}

    	clearPasswordIfIsDemoMode(result);
    	
        return success(result);
    }
    
    


    @GetMapping("/getNodesGlobeData")
    @Operation(summary = "getNodesGlobeData")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:query')")
    public CommonResult<GlobeData> getNodesGlobeData() throws IOException {
        return success(nodeInfoManager.getNodesGlobeData());
    }
    


    @GetMapping("/getInstallationScripts")
    @Operation(summary = "getInstallationScripts")
    @PreAuthorize("@ss.hasPermission('zcash:node-server:query')")
    public CommonResult<InstallationScripts> getInstallationScripts() throws IOException {
        return success(nodeServerService.getInstallationScripts());
    }
    
    
    
    


}