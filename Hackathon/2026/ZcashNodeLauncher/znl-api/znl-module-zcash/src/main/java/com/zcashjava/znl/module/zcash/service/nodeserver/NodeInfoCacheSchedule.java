package com.zcashjava.znl.module.zcash.service.nodeserver;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.tenant.core.util.TenantUtils;
import com.zcashjava.znl.module.system.service.tenant.TenantService;
import com.zcashjava.znl.module.zcash.config.ZnlProperties;
import com.zcashjava.znl.module.zcash.ws.GlobeDataHandler;
import com.zcashjava.znl.module.zcash.ws.WebSocketSessionUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NodeInfoCacheSchedule {


	@Autowired
	private ZnlProperties znlProperties;
	
	
	@Autowired
	private NodeInfoManager nodeInfoManager;
	
	
	@Autowired
	private TenantService tenantService;

	
	
	@Scheduled(initialDelayString = "5000", fixedDelayString = "${znl.zcash.node-info-update-interval}")
	public void updateNodeInfoCache() throws IOException {
		
		
		List<Long> tenantIdList = tenantService.getTenantIdList();
		

		if (CollectionUtils.isEmpty(NodeInfoCacheContext.sessions)) {
			
			
			if (NodeInfoCacheContext.lastAllSessionOfflineTimestamp != null) {
				if (System.currentTimeMillis() - NodeInfoCacheContext.lastAllSessionOfflineTimestamp 
						> znlProperties.getIdelNodeClientAliveTime()) {
					nodeInfoManager.closeAllEstablishedSessions();
				}
			}
			
			return ;
		}
		
		
		Map<Long, GlobeData> tenantGlobeDataMapping = new HashMap<>();
		
		for (Long tenantId : tenantIdList) {
			
			TenantUtils.execute(tenantId, new Callable<Void>() {

				@Override
				public Void call() throws Exception {
					nodeInfoManager.updateNodeInfoCache();
					
					tenantGlobeDataMapping.put(tenantId, nodeInfoManager.getNodesGlobeData());
					
					return (Void) null;
				}
			});
			
			
		}
		
		

		NodeInfoCacheContext.sessions.forEach(session -> {
			try {
				
				Long tenantId = WebSocketSessionUtils.getTenantId(session);
				if (tenantId == null) {
					return ;
				}
				
				GlobeData globeData = tenantGlobeDataMapping.get(tenantId);
				if (globeData == null) {
					return ;
				}
				
				TextMessage textMessage = GlobeDataHandler.wrapMessage(globeData);
				
				
				session.sendMessage(textMessage);
			} catch (IOException e) {
				log.error("send message to websocket failed. ", e);
			}
		});
		
		
	}
	
	
	
	
	
	
	
	
	
	
}
