package com.zcashjava.znl.framework.ssh;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.util.Arrays;

import org.apache.commons.lang3.Strings;
import org.apache.sshd.client.SshClient;
import org.apache.sshd.client.keyverifier.AcceptAllServerKeyVerifier;
import org.apache.sshd.client.proxy.ProxyData;
import org.apache.sshd.client.session.ClientSession;

public class SshClientUtils {
	
	
	
	private static volatile SshClient defaultClient = null;
	
	
	
	public static SshClient getDefaultClient() {
		
		if (defaultClient != null) {
			return defaultClient;
		}
		
		synchronized (SshClientUtils.class) {
			if (defaultClient != null) {
				return defaultClient;
			}
			
			initDefaultClient();
			return defaultClient;
		}
		
	}
	
	

	public static SshClient createClient() {
		
		SshClient client = SshClient.setUpDefaultClient();
		
		client.setServerKeyVerifier(AcceptAllServerKeyVerifier.INSTANCE);
		
		return client;
		
	}
	
	
	
	
	
	
	private static void initDefaultClient() {
		defaultClient = SshClient.setUpDefaultClient();
		
		defaultClient.setServerKeyVerifier(AcceptAllServerKeyVerifier.INSTANCE);
		defaultClient.start();
	}




	public static ClientSessionEx connect(ServerConfig serverConfig) throws IOException {
		
		
		ProxyConfig proxyConfig = serverConfig.getProxyConfig();

		SshClient client = null;
		if (proxyConfig != null) {
			
			if (!Arrays.asList(ProxyConfig.proxyType_HTTP, ProxyConfig.proxyType_SOCKS5).contains(proxyConfig.getProxyType())) {
				throw new IllegalArgumentException("Illegal proxy type: " + proxyConfig.getProxyType());
			}
			
			
			Proxy.Type proxyType = null;
			if (Strings.CS.equals(proxyConfig.getProxyType(), ProxyConfig.proxyType_SOCKS5)) {
				proxyType = Type.SOCKS;
			} else if (Strings.CS.equals(proxyConfig.getProxyType(), ProxyConfig.proxyType_HTTP)) {
				proxyType = Type.HTTP;
			} else {
				throw new RuntimeException("TODO Unimplemented proxy type: " + proxyConfig.getProxyType());
			}
			
			Proxy socksProxy = new Proxy(proxyType, new InetSocketAddress(proxyConfig.getHost(), proxyConfig.getPort()));
	        
	        client = createClient();
	        
	        client.setProxyDataFactory(remoteAddress -> {
	            return new ProxyData(socksProxy);
	        });
	        client.start();
			
		} else {
			client = getDefaultClient();
		}
		
        

        ClientSession session = client
				.connect(serverConfig.getUsername(), serverConfig.getHost(), serverConfig.getPort())
				.verify(30 * 1000)
				.getSession();
		
        
        session.addPasswordIdentity(serverConfig.getPassword());
        session.auth().verify(30 * 1000);
        
        
        ClientSessionEx result = new ClientSessionEx(session);
        
        return result;
		
		
		
	}
	
	
	
	
	
	
	

}
