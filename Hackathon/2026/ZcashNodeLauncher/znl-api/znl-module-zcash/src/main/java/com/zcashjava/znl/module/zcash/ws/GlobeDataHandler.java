package com.zcashjava.znl.module.zcash.ws;

import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.PongMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.tenant.core.util.TenantUtils;
import com.zcashjava.znl.module.zcash.service.nodeserver.GlobeData;
import com.zcashjava.znl.module.zcash.service.nodeserver.NodeInfoCacheContext;
import com.zcashjava.znl.module.zcash.service.nodeserver.NodeInfoManager;

import lombok.extern.slf4j.Slf4j;



@Slf4j
public class GlobeDataHandler extends TextWebSocketHandler {
	
	
	@Autowired
	private NodeInfoManager nodeInfoManager;
	
	
	
	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		super.handleMessage(session, message);
	}
	
	
	
	public static final String attr_firstMessageSent = "firstMessageSent";
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (message.getPayloadLength() == 0) {
            return;
        }
        if (message.getPayloadLength() == 4 && Objects.equals(message.getPayload(), "ping")) {
            session.sendMessage(new TextMessage("pong"));
            
            Boolean firstMessageSent = (Boolean) session.getAttributes().get(attr_firstMessageSent);
            if (firstMessageSent == null || !firstMessageSent) {
            	synchronized (session) {
            		firstMessageSent = (Boolean) session.getAttributes().get(attr_firstMessageSent);
            		
            		if (firstMessageSent == null || !firstMessageSent) {
	            		session.getAttributes().put(attr_firstMessageSent, true);
	                	handleGetNodeInfo(session);
            		}
            		
				}
            	
			}
            
            
            return;
        }
        
        String payload = message.getPayload();
        if (StringUtils.isBlank(payload)) {
			return ;
		}
        
        ObjectMapper om = JsonUtils.getObjectMapper();
        JsonNode node = om.readTree(payload);
        
        if (node == null) {
			return ;
		}
        
        JsonNode command = node.get("command");
        if (command == null || command.isNull()) {
			return ;
		}

        
        if (Strings.CS.equals(command.textValue(), "getNodeInfo")) {
        	handleGetNodeInfo(session);
		}
        
        
	}
	
	private void handleGetNodeInfo(WebSocketSession session) {
		NodeInfoCacheContext.lock.lock();
    	try {
    		
    		Long tenantId = WebSocketSessionUtils.getTenantId(session);
    		
    		if (tenantId != null) {

    			TenantUtils.execute(tenantId, new Callable<Void>() {
    				
    				@Override
    				public Void call() throws Exception {
    					GlobeData globeData = nodeInfoManager.getNodesGlobeData();

    					TextMessage textMessage = GlobeDataHandler.wrapMessage(globeData);
    					
    					session.sendMessage(textMessage);
    					
    					return (Void) null;
    				}
    			});
			}
    		
    		
    		
		} finally {
			NodeInfoCacheContext.lock.unlock();
		}
	}


	@Override
	protected void handlePongMessage(WebSocketSession session, PongMessage message) throws Exception {
		super.handlePongMessage(session, message);
	}
	
    
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
    	NodeInfoCacheContext.lock.lock();
    	try {
    		NodeInfoCacheContext.sessions.add(session);
    		if (NodeInfoCacheContext.sessions.size() == 1) {
    			// First session connected, reload node info cache immediately.
    			TenantUtils.execute(WebSocketSessionUtils.getTenantId(session), () -> {
    				
        			try {
    					nodeInfoManager.updateNodeInfoCache();
    				} catch (IOException e) {
    					e.printStackTrace();
    					log.error("Refresh node info failed! ", e);
    				}
        			
    			});
			}
    		handleGetNodeInfo(session);
    	} finally {
			NodeInfoCacheContext.lock.unlock();
		}
    }
    
    
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
    	
    	super.handleTransportError(session, exception);
    }
    
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	NodeInfoCacheContext.lock.lock();
    	try {
	    	NodeInfoCacheContext.sessions.remove(session);
	    	if (CollectionUtils.isEmpty(NodeInfoCacheContext.sessions)) {
	    		NodeInfoCacheContext.lastAllSessionOfflineTimestamp = System.currentTimeMillis();
			}
    	}finally {

			NodeInfoCacheContext.lock.unlock();
		}
    }
    

    public static void broadcast(String message) {
        for (WebSocketSession session : NodeInfoCacheContext.sessions) {
            if (session.isOpen()) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    
    public static TextMessage wrapMessage(GlobeData globeData) throws JsonProcessingException {
    	ObjectMapper om = JsonUtils.getObjectMapper();
		ObjectNode message = om.createObjectNode();
		message.put("type", "globeData");
		message.set("globeData", om.valueToTree(globeData));
		
		TextMessage textMessage = new TextMessage(om.writeValueAsString(message));
		
		return textMessage;
    }
    
    
	
	

}
