package com.zcashjava.znl.framework.ssh;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Strings;
import org.apache.sshd.common.util.io.IoUtils;
import org.apache.sshd.sftp.client.SftpClient;
import org.apache.sshd.sftp.client.SftpClientFactory;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class ZcashNodeManager {
	
	
	
	@Getter
	@Setter
	private ServerConfig serverConfig;
	
	

    public static final String nodeType_pruning = "Pruning Node";
    public static final String nodeType_full = "Full Node";
    


    public static final String sshOperationLockPrefix = "ZcashNodeManager";
	
    
    public static final Duration defaultCommandExecuteTimeout = Duration.ofSeconds(300);
	
	
	
	
	public ServerOperationResult<Void> start() throws IOException {

		ClientSessionEx session = createSessionInternal();
		
		ServerOperationResult<Void> operationResult = startInternal(session);
		
		session.close();
		
		return operationResult;
		
	}
	

	
	protected ServerOperationResult<Void> startInternal(ClientSessionEx session) throws IOException {

		String cmdResult = executeDockerCommand(session, "start " + name);

		ServerOperationResult<Void> operationResult = new ServerOperationResult<>();
		
		operationResult.setTerminalOutput(cmdResult);
		
		
		return operationResult;
		
	}
	
	

	
	public ServerOperationResult<Void> stop() throws IOException {

		ClientSessionEx session = createSessionInternal();
		
		ServerOperationResult<Void> operationResult = stopInternal(session);
		session.close();
		
		return operationResult;
		
	}
	

	
	protected ServerOperationResult<Void> stopInternal(ClientSessionEx session) throws IOException {

		String cmdResult = executeDockerCommand(session, "stop " + name);

		ServerOperationResult<Void> operationResult = new ServerOperationResult<>();
		
		operationResult.setTerminalOutput(cmdResult);
		
		
		return operationResult;
		
	}
	
	

	public NodeStatus getNodeStatus() throws IOException {


		ClientSessionEx session = null;
		try {
			session = createSessionInternal();
		} catch (IOException e) {
			log.error("Connect to server: " + serverConfig.getHost() + " failed. ", e);
			throw e;
		}

		NodeStatus result = new NodeStatus();
		result.setServerStatusCheckTime(LocalDateTime.now());
		

		result.setServerStatus("online");
		result.setServerError("");
		
		result = getNodeStatusInternal(result, session);
		
		try {
			session.close();
		} catch (IOException e) {
			throw new RuntimeException("Close session failed. ", e);
		}
		return result;
		
		
		
	}
	
	private NodeStatus getNodeStatusInternal(NodeStatus result, ClientSessionEx session) {
		
		result.setInstallationStatusCheckTime(LocalDateTime.now());
		DockerPsResult dockerPsResult;
		try {
			ServerOperationResult<DockerPsResult> installationStatus = checkInstallationStatusInternal(session);
			dockerPsResult = installationStatus.getResult();
			if (dockerPsResult == null) {
				result.setInstallationStatus("not installed");
			} else {
				result.setInstallationStatus("installed");
				
				String state = dockerPsResult.getNode().get("State").textValue();
				result.setNodeStatus(state);
				
			}
			
		} catch (IOException e) {
			log.error("Check installation status failed: " + serverConfig.getHost() + ". "
					+ "", e);
			throw new RuntimeException("Check installation status failed, server host: " + serverConfig.getHost(), e);
		}
		
		
		return result;
		
	}
	
	
	
	
	private static DefaultResourceLoader resourceLoader = null;
	private static DefaultResourceLoader getResourceLoader() {
		if (resourceLoader != null) {
			return resourceLoader;
		}
		
		synchronized (ZcashNodeManager.class) {
			if (resourceLoader != null) {
				return resourceLoader;
			}
			
			resourceLoader = new DefaultResourceLoader();
			return resourceLoader;
		}
		
	}
	
	

	public static final String safeDockerCommandTail = " 2>&1 | grep -v \"Emulate Docker CLI using podman\" || true";
	
	
	
	// public static final String image = "docker.io/electriccoinco/zcashd:latest";
	public static final String image = "zfnd/zebra:latest";
	
	public static final String name = "znl-zebra-node";

	
	public void createRemoteDirectory(SftpClient sftp, String remotePath) throws IOException {
	    String[] folders = remotePath.split("/");
	    StringBuilder currentPath = new StringBuilder();

	    for (String folder : folders) {
	        if (folder.isEmpty()) continue; 
	        
	        currentPath.append("/").append(folder);
	        String pathToCheck = currentPath.toString();

	        try {
	            sftp.stat(pathToCheck);
	        } catch (IOException e) {
	            try {
	                sftp.mkdir(pathToCheck);
	            } catch (IOException mkdirEx) {
	            	throw mkdirEx;
	            }
	        }
	    }
	}
	
	/**
	 * 
	 * @param session
	 * @param is need close by provider. who create who clean. 
	 * @param remotePath
	 * @throws IOException 
	 * @throws Exception
	 */
	public void uploadFile(ClientSessionEx session, InputStream is, String remotePath) throws IOException {
	    SftpClientFactory factory = SftpClientFactory.instance();
	    
	    
	    try (SftpClient sftp = factory.createSftpClient(session.getSession())) {
	    	
	    	String directory = remotePath.substring(0, remotePath.lastIndexOf("/"));
	        createRemoteDirectory(sftp, directory);
	    	
	        try (OutputStream remoteOut = sftp.write(remotePath)) {
                long bytesCopied = IoUtils.copy(is, remoteOut);
	        }
	    }
	    
	}


	
	public ServerOperationResult<Void> install(String url, String nodeType) throws IOException {
		ClientSessionEx session = createSessionInternal();
		
		ServerOperationResult<Void> result = installInternal(session, url, nodeType);
		
		session.close();
		
		return result;
		
	}
	
	protected ServerOperationResult<Void> installInternal(ClientSessionEx session, String url, String nodeType) throws IOException {

		String remoteFolder = "/opt/znl/temp";
		String remotePath = remoteFolder + "/install.sh";
		if (Strings.CS.startsWith(url, "classpath:")) {
			
			
			Resource resource = getResourceLoader().getResource(url);
			InputStream is = resource.getInputStream();
			uploadFile(session, is, remotePath);
			
			List<String> cmdResults = new ArrayList<>();
			{
				String cmdResult = session.executeRemoteCommand("chmod a+rwx " + remotePath);
				cmdResults.add(cmdResult);
			}
			
			{
				String cmdResult = session.executeRemoteCommand("sed -i 's/\r$//' " + remotePath);
				
				cmdResults.add(cmdResult);
			}

			

			{
				String cmdResult = session.executeRemoteCommand("chmod -R a+rw /opt/znl/");
				cmdResults.add(cmdResult);
			}
			
			
			String cmd = "/bin/bash -x " + remotePath;
			String cmdResult = session.executeInteractiveCommand(cmd, new SshConsoleListener());
			
			cmdResults.add(cmdResult);
			
			{
				String cmdTemp = StringUtils.trim(cmdResult);
				

				String lastLine = cmdTemp.substring(cmdTemp.lastIndexOf("\n"));
				lastLine = StringUtils.trim(lastLine);
				if (Strings.CI.startsWith(lastLine, "Error")) {
					throw new ShellException(cmdResult).setCmd(cmd);
				}
				
				
			}
			
			
			// Only for zcashd 
			// session.executeRemoteCommand(buildNodeServerConfig(nodeType));
			
			
			
			ServerOperationResult<Void> operationResult = new ServerOperationResult<>();
			operationResult.setTerminalOutput(StringUtils.join(cmdResults, "\n"));
			
			
			return operationResult;
		} else if (Strings.CS.startsWith(url, "http://") || Strings.CS.startsWith(url, "https://")) {
			

			List<String> cmdResults = new ArrayList<>();
			{
				String cmdResult = session.executeRemoteCommand("mkdir -p " + remoteFolder);
				cmdResults.add(cmdResult);
			}
			
			
			{
				String cmdResult = session.executeRemoteCommand(""
						+ "curl -L -o "
						+ remotePath
						+ " " + url);
				cmdResults.add(cmdResult);
			}
			
			

			{
				String cmdResult = session.executeRemoteCommand("chmod a+rwx " + remotePath);
				cmdResults.add(cmdResult);
			}
			
			String cmd = "/bin/bash -x " + remotePath;
			String cmdResult = session.executeInteractiveCommand(cmd, new SshConsoleListener());
			
			cmdResults.add(cmdResult);
			
			{
				String cmdTemp = StringUtils.trim(cmdResult);
				

				String lastLine = cmdTemp.substring(cmdTemp.lastIndexOf("\n"));
				lastLine = StringUtils.trim(lastLine);
				if (Strings.CI.startsWith(lastLine, "Error")) {
					throw new ShellException(cmdResult).setCmd(cmd);
				}
				
				
			}
			
			
			// Only for zcashd
			// session.executeRemoteCommand(buildNodeServerConfig(nodeType));
			
			


			ServerOperationResult<Void> operationResult = new ServerOperationResult<>();
			operationResult.setTerminalOutput(StringUtils.join(cmdResults, "\n"));
			
			return operationResult;
			
		} else {
			throw new IllegalArgumentException("Unsupported url: " + url);
		}

		
		
	}
	
	
//	private String buildNodeServerConfig(String nodeType) {
//		
//		if (!Strings.CS.equalsAny(nodeType, nodeType_pruning, nodeType_full)) {
//			throw new IllegalArgumentException("Unsupported nodeType: " + nodeType);
//		}
//		
//		
//		String head = ""
//				+ "# Magic Number: ZNL\n"
//				+ "# This file created by ZcashNodeLauncher automiticly\n"
//				+ "# https://github.com/zcashjava/ZcashNodeLauncher\n"
//				+ "\n"
//				+ "";
//		
//		
//		String nodeTypeConfig = "";
//		
//		if (Strings.CS.equals(nodeType, nodeType_pruning)) {
//			nodeTypeConfig = "# Download blocks only\n"
//					+ "blocksonly=1\n"
//					+ "# Enable pruning mode, keeping the last 550MB of data\n"
//					+ "prune=550\n"
//					+ "# Disable transaction indexing to save space\n"
//					+ "txindex=0\n";
//		}
//		
//		
//		String connectionConfig = "# Allow connections\n"
//				+ "listen=1\n"
//				+ "server=1\n"
//				+ "# Limit the number of connections\n"
//				+ "maxconnections=16\n";
//		
//		
//		String deprecatedConfim = "# Confirm awareness that zcashd will be deprecated in 2025 in favor of zebrad and zcash-wallet\n"
//				+ "i-am-aware-zcashd-will-be-replaced-by-zebrad-and-zallet-in-2025=1\n";
//		
//		
//		return "cat <<EOF > /opt/znl/zcash-data/zcash.conf\n"
//				+ head
//				+ nodeTypeConfig
//				+ connectionConfig
//				+ deprecatedConfim
//				+ "EOF\n"
//				+ "\n"
//				+ "";
//	}
	

	
	
	



	// docker rm -f
	public ServerOperationResult<Void> uninstall() throws IOException {

		ClientSessionEx session = createSessionInternal();
		
		ServerOperationResult<Void> result = uninstallInternal(session);
		
		session.close();
		
		return result;
		
	}
	
	

	public ServerOperationResult<Void> uninstallInternal(ClientSessionEx session) throws IOException {

		String cmdResult = executeDockerCommand(session, "rm -f " + name);
		
		ServerOperationResult<Void> operationResult = new ServerOperationResult<>();
		operationResult.setTerminalOutput(cmdResult);
		
		
		return operationResult;
		
	}
	
	
	
	
	public ServerOperationResult<DockerPsResult> getDockerContainerStatus() throws IOException {
		
		ClientSessionEx session = createSessionInternal();
		
		ServerOperationResult<DockerPsResult> result = getDockerContainerStatusInternal(session);
		
		session.close();
		
		return result;
		
	}
	
	

	protected ServerOperationResult<DockerPsResult> getDockerContainerStatusInternal(ClientSessionEx session) throws IOException {
		
		String cmdResult = executeDockerCommand(session, "ps -a --format '{{json .}}'");

		ServerOperationResult<DockerPsResult> result = new ServerOperationResult<>();
		result.setTerminalOutput(cmdResult);
		
		if (Strings.CS.contains(cmdResult, "docker: command not found")) {
			log.error(cmdResult);
			return result;
		}
		
		
		if (cmdResult == null) {
			return result;
		}
		
		List<DockerPsResult> psList = DockerPsResult.parse(cmdResult);
		if (CollectionUtils.isEmpty(psList)) {
			return result;
		}
		
		
		for (DockerPsResult ps : psList) {
			if (imageMatches(ps, image)
					&& nameMatches(ps, name)) {
				result.setResult(ps);
				
				return result;
				
			}
			
			
		}
			
		
		return result;
		
	}
	
	
	
	
	private boolean imageMatches(DockerPsResult ps, String image) {
		
		if (Strings.CS.endsWith(ps.getNode().get("Image").textValue(), image)) {
			return true;
		}
		
		return false;
	}



	private boolean nameMatches(DockerPsResult ps, String name) {
		
		JsonNode namesNode = ps.getNode().get("Names");
		if (namesNode == null || namesNode.isNull()) {
			return false;
		}
		
		if (namesNode.isArray()) {
			return Strings.CS.equals(ps.getNode().get("Names").get(0).textValue(), name);
		}
		
		return Strings.CS.equals(ps.getNode().get("Names").textValue(), name);
	}



	/**
	 * --format '{{json .}}'
	 */
	private ServerOperationResult<DockerPsResult> 
	checkInstallationStatusInternal(ClientSessionEx session) throws IOException {
		
		return getDockerContainerStatusInternal(session);
		
	}


	public ServerOperationResult<Boolean> checkConnection() throws IOException {
		
		ServerOperationResult<Boolean> result = new ServerOperationResult<>();
			
		ClientSessionEx session = createSessionInternal();
		session.close();
		
		result.setResult(true);
		return result;
			
		
		
	}
	
	
	
	
	protected ClientSessionEx createSessionInternal() throws IOException {

		validateServerConfig();
		
		
		ClientSessionEx session = SshClientUtils.connect(serverConfig);
		
		return session;
		
		
	}




	protected void validateServerConfig() {
		Assert.notNull(serverConfig, "serverConfig cannot be null! ");

		Assert.hasText(serverConfig.getHost(), "Server host cannot be empty! ");

		Assert.notNull(serverConfig.getPort(), "Server port cannot be null! ");
		
		if (serverConfig.getPort() < 0) {
			throw new IllegalArgumentException("Server port cannot less than ZERO(0). ");
		}
		
		

		Assert.hasText(serverConfig.getUsername(), "Server username cannot be empty! ");
		Assert.hasText(serverConfig.getPassword(), "Server password cannot be empty! ");
		
		
		if (serverConfig.getProxyConfig() != null) {

			Assert.hasText(serverConfig.getProxyConfig().getProxyType(), "Proxy config type cannot be empty! ");
			Assert.hasText(serverConfig.getProxyConfig().getHost(), "Proxy config host cannot be empty! ");
			Assert.notNull(serverConfig.getProxyConfig().getPort(), "Proxy config port cannot be null! ");
			
		}
	}
	
	
	
	protected String executeDockerCommand(ClientSessionEx session, String command) throws IOException {
		
		String cmdResult = session.executeRemoteCommand("docker " + command + safeDockerCommandTail, 
				defaultCommandExecuteTimeout);
		
		
		if (Strings.CI.startsWith(StringUtils.trim(cmdResult), "Error")) {
			throw new RuntimeException(cmdResult);
		} 

		return cmdResult;
		
	}
	
	
	
	


	
	/**
	
[
  {
    "id": 4,
    "addr": "xxxxxxxxx:8233",
    "addrlocal": "xxxxxxxxx:43730",
    "services": "0000000000000001",
    "relaytxes": true,
    "lastsend": 1782582250,
    "lastrecv": 1782582250,
    "bytessent": 513599,
    "bytesrecv": 183460754,
    "conntime": 1782581694,
    "timeoffset": -295,
    "pingtime": 0.29104,
    "version": 170140,
    "subver": "/Zebra:4.4.1/",
    "inbound": false,
    "startingheight": 3364604,
    "banscore": 0,
    "synced_headers": 109158,
    "synced_blocks": 12345,
    "inflight": [
      12346,
      12348,
      12350,
      12351,
      12352,
      12353,
      12354,
      12355,
      12356,
      12357,
      12358,
      12359,
      12361
    ],
    "addr_processed": 10,
    "addr_rate_limited": 0,
    "whitelisted": false
  },

......
	 */
	/**

Zebra: 

curl --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' \
     -H 'content-type: application/json' \
     http://127.0.0.1:8232/

{"jsonrpc":"1.0","id":"curltest","result":[{"addr":"18.27.125.103:8233","services":"0000000000000001","lastrecv":1783147262,"inbound":false,"banscore":0,"subver":"/MagicBean:6.20.0/","version":170150,"connection_state":"connected"},{"addr":"38.190.136.76:8233","services":"0000000000000001","lastrecv":1783147263,"inbound":false,"banscore":0,"subver":"/Zebra:5.0.0-vendored/","version":170150,"connection_state":"connected"},{"addr":"51.178.97.131:8233","services":"0000000000000001","lastrecv":1783147264,"inbound":false,"banscore":0,"subver":"/Zebra:5.2.0/","version":170150,"connection_state":"connected"}],"error":null}

	 */
	protected ServerOperationResult<ArrayNode> getpeerinfo(ClientSessionEx session, boolean ignoreVerifyingBlocksError) throws IOException {

		
		ObjectMapper om = JsonUtils.getObjectMapper();

		
		ServerOperationResult<ArrayNode> operationResult = new ServerOperationResult<>();
		String cmdResult = null;
		operationResult.setTerminalOutput(cmdResult);
		
// Zcashd version:
//		try {
//			cmdResult = executeDockerCommand(session, "exec -i " + name + " zcash-cli getpeerinfo ");
//		} catch (RuntimeException e) {
//			// TODO Make a unique Exception class form method executeDockerCommand()
//			
//			log.error("gerpeerinfo error", e);
//			
//			if (StringUtils.trim(e.getMessage()).endsWith("Verifying blocks...")) {
//				if (ignoreVerifyingBlocksError) {
//
//					ArrayNode result = om.createArrayNode();
//					operationResult.setResult(result);
//					
//					return operationResult;
//				}
//			} else {
//				throw e;
//			}
//		}
		
		
		// Zebrad
		String cmd = ""
				+ "curl -s --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"getpeerinfo\", \"params\": [] }' "
				+ "     -H 'content-type: application/json' "
				+ "     http://127.0.0.1:8232/";
		cmdResult = session.executeRemoteCommand(cmd, 
				defaultCommandExecuteTimeout);
		
		
		if (StringUtils.isBlank(cmdResult)) {

			ArrayNode result = om.createArrayNode();
			operationResult.setResult(result);
			
			return operationResult;
		}
		

		
		ObjectNode result = (ObjectNode) om.readTree(cmdResult);
		JsonNode error = result.get("error");
		if (error != null && !error.isNull()) {
			throw new ShellException(cmdResult)
			.setCmd(cmd);
		}
		

		operationResult.setResult((ArrayNode) result.get("result"));
		
		return operationResult;
		
	}
	

	/**
	 * 
docker exec -it znl-zcash-node zcash-cli getblockchaininfo
{
  "chain": "main",
  "blocks": 106551,
  "initial_block_download_complete": false,
  "headers": 106551,
  "bestblockhash": "00000000790d07c5f24643d7b634bef68e35084f371c888cdda812d7465428d0",
  "difficulty": 987687.5023571346,
  "verificationprogress": 0.0205144803111574,
  "chainwork": "0000000000000000000000000000000000000000000000000002b2e199ab5912",
  "pruned": true,
  "size_on_disk": 720360422,
  "estimatedheight": 3412120,
  "commitments": 322016,
  "chainSupply": {
    "monitored": true,
    "chainValue": 1206748.44156848,
    "chainValueZat": 120674844156848
  },
  "valuePools": [
    {
      "id": "transparent",
      "monitored": true,
      "chainValue": 1181959.23703121,
      "chainValueZat": 118195923703121
    },
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 24789.20453727,
      "chainValueZat": 2478920453727
    },
    {
      "id": "sapling",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    },
    {
      "id": "orchard",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    },
    {
      "id": "lockbox",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    }
  ],
  "softforks": [
    {
      "id": "bip34",
      "version": 2,
      "enforce": {
        "status": true,
        "found": 4000,
        "required": 750,
        "window": 4000
      },
      "reject": {
        "status": true,
        "found": 4000,
        "required": 950,
        "window": 4000
      }
    },
    {
      "id": "bip66",
      "version": 3,
      "enforce": {
        "status": true,
        "found": 4000,
        "required": 750,
        "window": 4000
      },
      "reject": {
        "status": true,
        "found": 4000,
        "required": 950,
        "window": 4000
      }
    },
    {
      "id": "bip65",
      "version": 4,
      "enforce": {
        "status": true,
        "found": 4000,
        "required": 750,
        "window": 4000
      },
      "reject": {
        "status": true,
        "found": 4000,
        "required": 950,
        "window": 4000
      }
    }
  ],
  "upgrades": {
    "5ba81b19": {
      "name": "Overwinter",
      "activationheight": 347500,
      "status": "pending",
      "info": "See https://z.cash/upgrade/overwinter/ for details."
    },
    "76b809bb": {
      "name": "Sapling",
      "activationheight": 419200,
      "status": "pending",
      "info": "See https://z.cash/upgrade/sapling/ for details."
    },
    "2bb40e60": {
      "name": "Blossom",
      "activationheight": 653600,
      "status": "pending",
      "info": "See https://z.cash/upgrade/blossom/ for details."
    },
    "f5b9230b": {
      "name": "Heartwood",
      "activationheight": 903000,
      "status": "pending",
      "info": "See https://z.cash/upgrade/heartwood/ for details."
    },
    "e9ff75a6": {
      "name": "Canopy",
      "activationheight": 1046400,
      "status": "pending",
      "info": "See https://z.cash/upgrade/canopy/ for details."
    },
    "c2d6d0b4": {
      "name": "NU5",
      "activationheight": 1687104,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu5/ for details."
    },
    "c8e71055": {
      "name": "NU6",
      "activationheight": 2726400,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu6/ for details."
    },
    "4dec4df0": {
      "name": "NU6.1",
      "activationheight": 3146400,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu6.1/ for details."
    },
    "5437f330": {
      "name": "NU6.2",
      "activationheight": 3364600,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu6.2/ for details."
    }
  },
  "consensus": {
    "chaintip": "00000000",
    "nextblock": "00000000"
  },
  "pruneheight": 102302
}



	 */
	/*

curl --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' \
     -H 'content-type: application/json' \
     http://127.0.0.1:8232/


{"jsonrpc":"1.0","id":"curltest","result":{"chain":"main","blocks":21425,"headers":21425,"difficulty":836877.3371654042,"verificationprogress":0.006264598367818787,"chainwork":0,"pruned":false,"size_on_disk":637182598,"commitments":0,"bestblockhash":"0000000051a778bcf5691b1dc47aba3a14ddd3cd328bdf26fc7dc9da54a9b1e4","estimatedheight":3420331,"chainSupply":{"chainValue":142674.59552697,"chainValueZat":14267459552697,"monitored":true},"valuePools":[{"id":"transparent","chainValue":141969.290126,"chainValueZat":14196929012600,"monitored":true},{"id":"sprout","chainValue":705.30540097,"chainValueZat":70530540097,"monitored":true},{"id":"sapling","chainValue":0.0,"chainValueZat":0,"monitored":false},{"id":"orchard","chainValue":0.0,"chainValueZat":0,"monitored":false},{"id":"lockbox","chainValue":0.0,"chainValueZat":0,"monitored":false}],"upgrades":{"5ba81b19":{"name":"Overwinter","activationheight":347500,"status":"pending"},"76b809bb":{"name":"Sapling","activationheight":419200,"status":"pending"},"2bb40e60":{"name":"Blossom","activationheight":653600,"status":"pending"},"f5b9230b":{"name":"Heartwood","activationheight":903000,"status":"pending"},"e9ff75a6":{"name":"Canopy","activationheight":1046400,"status":"pending"},"c2d6d0b4":{"name":"NU5","activationheight":1687104,"status":"pending"},"c8e71055":{"name":"NU6","activationheight":2726400,"status":"pending"},"4dec4df0":{"name":"NU6.1","activationheight":3146400,"status":"pending"},"5437f330":{"name":"NU6.2","activationheight":3364600,"status":"pending"}},"consensus":{"chaintip":"00000000","nextblock":"00000000"}},"error":null}


	 */
	protected ServerOperationResult<ObjectNode> getblockchaininfo(ClientSessionEx session) throws IOException {
		
		// Zcashd version
		// String cmdResult = executeDockerCommand(session, "exec -i " + name + " zcash-cli getblockchaininfo ");
		
		
		// Zebra version
		String cmd = ""
				+ "curl -s --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"getblockchaininfo\", \"params\": [] }' "
				+ "     -H 'content-type: application/json' "
				+ "     http://127.0.0.1:8232/";
		String cmdResult = session.executeRemoteCommand(cmd, 
				defaultCommandExecuteTimeout);
		
		ServerOperationResult<ObjectNode> operationResult = new ServerOperationResult<>();
		operationResult.setTerminalOutput(cmdResult);
		
		
		ObjectMapper om = JsonUtils.getObjectMapper();
		
		
		if (StringUtils.isBlank(cmdResult)) {
			return operationResult;
		}
		
		
		ObjectNode result = (ObjectNode) om.readTree(cmdResult);
		
		JsonNode error = result.get("error");
		if (error != null && !error.isNull()) {
			throw new ShellException(cmdResult)
			.setCmd(cmd);
		}

		operationResult.setResult((ObjectNode) result.get("result"));
		
		return operationResult;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	

}
