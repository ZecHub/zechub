package com.zcashjava.znl.framework.ssh;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProxyConfig extends ConnectableTarget {
	
	
	public static final String proxyType_HTTP = "HTTP";
	public static final String proxyType_SOCKS5 = "SOCKS5";
	private String proxyType;
	
	
	

}
