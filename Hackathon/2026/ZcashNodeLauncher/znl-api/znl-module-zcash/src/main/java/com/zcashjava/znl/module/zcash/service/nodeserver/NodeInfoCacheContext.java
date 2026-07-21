package com.zcashjava.znl.module.zcash.service.nodeserver;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class NodeInfoCacheContext {
	

	
	public static final ReentrantLock lock = new ReentrantLock();
	
	

    public static final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
	

    public static Long lastAllSessionOfflineTimestamp = null;
    
    
	
	
	
	
	
	

}
