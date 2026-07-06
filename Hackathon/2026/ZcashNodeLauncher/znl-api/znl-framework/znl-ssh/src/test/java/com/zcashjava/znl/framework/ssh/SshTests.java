package com.zcashjava.znl.framework.ssh;

import org.apache.sshd.client.SshClient;
import org.junit.jupiter.api.Test;

public class SshTests {
	

	

	private ServerConfig createTestConfig() {
		
		SshClient.setUpDefaultClient();
		
		
		ServerConfig serverConfig = ServerConfig.defaultInstance();
		serverConfig.setHost("127.0.0.1");
		serverConfig.setPassword("xxxx");
		

//		ProxyConfig proxyConfig = new ProxyConfig();
//		proxyConfig.setHost("");
//		proxyConfig.setPort();
//		proxyConfig.setProxyType(ProxyConfig.proxyType_SOCKS5);
//		serverConfig.setProxyConfig(proxyConfig);
//		
		
		return serverConfig;
	}

	
	@Test
	void testConnectByProxy() throws Exception {
		
		
		ServerConfig serverConfig = createTestConfig();
		
		ClientSessionEx session = SshClientUtils.connect(serverConfig);
		
		String resultString = session.executeRemoteCommand("ls -l");
		System.out.println(resultString);
		
		session.executeInteractiveCommand("ls -l", new SshConsoleListener());
		
		
		
		
	}
	
	



	@Test
	void testCheckInstallationStatus() throws Exception {
		
		ServerConfig serverConfig = createTestConfig();
		
		ZcashNodeManager manager = new ZcashNodeManager();
		manager.setServerConfig(serverConfig);
		
		
		ServerOperationResult<DockerPsResult> checkInstallationStatus = manager.getDockerContainerStatus();
		System.out.println(checkInstallationStatus.getResult());
		
		
		
		
		
		
		
		
	}
	
	
	

	@Test
	void testUninstall() throws Exception {
		
		ServerConfig serverConfig = createTestConfig();
		
		ZcashNodeManager manager = new ZcashNodeManager();
		manager.setServerConfig(serverConfig);
		
		
		ServerOperationResult<Void> result1 = manager.uninstall();
		System.out.println(result1.getResult());
		
		
		
	}
	
	

	@Test
	void testInstall() throws Exception {
		
		ServerConfig serverConfig = createTestConfig();
		
		ZcashNodeManager manager = new ZcashNodeManager();
		manager.setServerConfig(serverConfig);
		
		
		ServerOperationResult<Void> result1 = manager.install(
				"classpath:InternalScripts/AlmaLinux/9/InstallationScript.sh", ZcashNodeManager.nodeType_pruning);
		System.out.println(result1.getResult());
		
	}
	
	
	


	@Test
	void testCheckStatus() throws Exception {
		
		ServerConfig serverConfig = createTestConfig();
		
		ZcashNodeManager manager = new ZcashNodeManager();
		manager.setServerConfig(serverConfig);
		
		
		NodeStatus nodeStatus = manager.getNodeStatus();
		System.out.println(nodeStatus.getNodeStatus());
		
		
		manager.start();
		
		nodeStatus = manager.getNodeStatus();
		System.out.println(nodeStatus.getNodeStatus());
		
		
		manager.stop();
		
		nodeStatus = manager.getNodeStatus();
		System.out.println(nodeStatus.getNodeStatus());
		
		
		
	}
	

	@Test
	void testStart() throws Exception {
		
		ServerConfig serverConfig = createTestConfig();
		
		ZcashNodeManager manager = new ZcashNodeManager();
		manager.setServerConfig(serverConfig);
		
		manager.start();
		
	}
	
	


	@Test
	void testStop() throws Exception {
		
		ServerConfig serverConfig = createTestConfig();
		
		ZcashNodeManager manager = new ZcashNodeManager();
		manager.setServerConfig(serverConfig);
		
		manager.stop();
		
	}
	

}
