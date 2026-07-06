package com.zcashjava.znl.framework.ssh;

import java.io.Closeable;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.zcashjava.znl.framework.ssh.struct.NodeInfo;
import com.zcashjava.znl.framework.ssh.struct.PeerInfo;

public class ZcashNodeClient implements Closeable {
	
	
	
	private ServerConfig serverConfig;
	
	private ClientSessionEx session;

	private ZcashNodeManager nodeManager;
	


	public ZcashNodeClient(ServerConfig serverConfig) throws IOException {
		super();
		this.serverConfig = serverConfig;
		openSession();
	}
	
	
	public void openSession() throws IOException {

		this.nodeManager = new ZcashNodeManager();
		this.nodeManager.setServerConfig(serverConfig);
		session = this.nodeManager.createSessionInternal();
		
	}
	
	
	public ServerOperationResult<Void> start() throws IOException {
		return this.nodeManager.startInternal(session);
	}
	
	
	public ServerOperationResult<Void> stop() throws IOException {
		return this.nodeManager.stopInternal(session);
	}
	

	public ServerOperationResult<Void> install(String url, String nodeType) throws IOException {
		return this.nodeManager.installInternal(session, url, nodeType);
	}
	

	public ServerOperationResult<Void> uninstall() throws IOException {
		return this.nodeManager.uninstallInternal(session);
	}
	
	
	
	
	
	public DockerPsResult getDockerImageStatus() throws IOException {
		ServerOperationResult<DockerPsResult> result = this.nodeManager.getDockerContainerStatusInternal(session);
		
		return result.getResult();
	}
	


	@Override
	public void close() throws IOException {
		if (session != null) {
			session.close();
		}
	}
	

	public NodeInfo getNodeInfo() throws IOException {
		return getNodeInfo(true);
	}
	
	
	public NodeInfo getNodeInfo(boolean ignoreVerifyingBlocksError) throws IOException {
		
		
		NodeInfo nodeInfo = new NodeInfo();
		ServerOperationResult<ObjectNode> getblockchaininfo = nodeManager.getblockchaininfo(session);
		ObjectNode blockchaininfo = getblockchaininfo.getResult();
		
		nodeInfo.setBlockchaininfo(blockchaininfo);
		
		
		ServerOperationResult<ArrayNode> getpeerinfo = nodeManager.getpeerinfo(session, ignoreVerifyingBlocksError);
		
		ArrayNode peerinfoNodes = getpeerinfo.getResult();
		
		
		List<PeerInfo> peerInfos = new ArrayList<>();
		nodeInfo.setPeerInfos(peerInfos);
		for (JsonNode peerinfoNode : peerinfoNodes) {
			
			PeerInfo peerInfo = new PeerInfo();
			peerInfo.setInfo((ObjectNode) peerinfoNode);
			
			peerInfos.add(peerInfo);
			
		}
		
		
		
		return nodeInfo;
		
		
		
		
		
	}


	public void test() throws IOException {
		session.executeRemoteCommand("ls -l");
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
