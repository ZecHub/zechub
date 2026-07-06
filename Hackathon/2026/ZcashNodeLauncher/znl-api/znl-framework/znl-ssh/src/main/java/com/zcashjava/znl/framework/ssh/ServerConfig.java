package com.zcashjava.znl.framework.ssh;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServerConfig extends ConnectableTarget {
	
	
	
	
	private ProxyConfig proxyConfig;
	
	
	public static ServerConfig defaultInstance() {
		ServerConfig result = new ServerConfig();
		
		result.setPort(22);
		result.setUsername("root");
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
