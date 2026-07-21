package com.zcashjava.znl.module.zcash.service.nodeserver;

import java.io.IOException;
import java.net.InetAddress;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import com.zcashjava.znl.framework.common.pojo.Ref;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.framework.redis.RedisSafeTemplate;
import com.zcashjava.znl.framework.redis.Routine;
import com.zcashjava.znl.framework.ssh.ZcashNodeClient;
import com.zcashjava.znl.framework.ssh.ZcashNodeManager;
import com.zcashjava.znl.framework.ssh.struct.NodeInfo;
import com.zcashjava.znl.framework.ssh.struct.PeerInfo;
import com.zcashjava.znl.module.system.dal.redis.RedisKeyConstants;
import com.zcashjava.znl.module.zcash.config.ZnlProperties;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerRespVO;
import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;
import com.zcashjava.znl.module.zcash.dal.mysql.nodeserver.NodeServerMapper;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NodeInfoManager {

	
	@Autowired
	private ZnlProperties znlProperties;
	
	
	@Autowired
	private NodeServerMapper nodeServerMapper;
	
	
	@Autowired
	private RedisSafeTemplate redisSafeTemplate;
	
	
	@Autowired
	private DatabaseReader dbIpReader;
	

    @Getter
    @Setter
    @Value("${znl.demo}")
    private Boolean demo;
    
	
	
	private Map<Long, ZcashNodeClient> nodeClientPool = new ConcurrentHashMap<>();

	
	
	protected ZcashNodeClient getOrCreateClient(NodeServerDO nodeClient) throws IOException {
		
		NodeInfoCacheContext.lock.lock();
		try {
			
			ZcashNodeClient zcashNodeClient = nodeClientPool.get(nodeClient.getId());
			
			if (zcashNodeClient != null) {
				
				try {
					zcashNodeClient.test();
					return zcashNodeClient;
				} catch (Exception e) {
					log.error("ZcashNodeClient test failed. ", e);
					zcashNodeClient = null;
				}
				
			}
			
			zcashNodeClient = new ZcashNodeClient(nodeClient.toServerConfig());
			
			nodeClientPool.put(nodeClient.getId(), zcashNodeClient);
			
			
			return zcashNodeClient;
		} finally {
			NodeInfoCacheContext.lock.unlock();
		}

			
			
		
	}
	
	
	
	
	
	

	public void updateNodeInfoCache() throws IOException {
		
		NodeInfoCacheContext.lock.lock();
		try {
			
			if (demo) {
				// Demo mode use the static random data, don't need update cache. 
				return ;
			}
			
			Calendar now = Calendar.getInstance();
			
			if (znlProperties.calcNodeInfoUpdateInterval() > Integer.MAX_VALUE) {
				throw new IllegalStateException("znlProperties.calcNodeInfoUpdateInterval() cannot large than " + Integer.MAX_VALUE);
			}
			
			
			List<NodeServerDO> nodeServers = nodeServerMapper.selectList();
			for (NodeServerDO nodeServerDO : nodeServers) {
				nodeServerDO.decryptPasswords(znlProperties.getServerPasswordCipherKey());
				updateNodeInfoCache(nodeServerDO, true, now);
				
			}
			
			
			
			
		} finally {
			NodeInfoCacheContext.lock.unlock();
		}

		
		
	}
	
	
	
	public void deleteNodeInfoCache(Long id) {
		redisSafeTemplate.delSafe(nodeInfoCacheKey(id));
	}



	public void updateNodeInfoCache(NodeServerDO nodeServerDO) {
		updateNodeInfoCache(nodeServerDO, false, null);
	}
	
	
	public void updateNodeInfoCache(NodeServerDO nodeServerDO, boolean checkUpdateTime, Calendar now) {
		

		NodeInfoCacheContext.lock.lock();
		try {
			
		
			if (!Strings.CS.equals(nodeServerDO.getNodeStatus(), NodeServerDO.nodeStatus_running)) {
				
				Ref<NodeInfo> rNodeInfo = new Ref<>();
				

				Void result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + nodeServerDO.getId(), 
		        		new Routine<Void>() {

					@Override
					public Void execute() throws Exception {

						redisSafeTemplate.replaceValueSafe(nodeInfoCacheKey(nodeServerDO.getId()), () -> {
							
							NodeInfo nodeInfo = new NodeInfo();
							
							rNodeInfo.setData(nodeInfo);
							
							return JsonUtils.getObjectMapper().writeValueAsString(nodeInfo);
							
						}, 60, TimeUnit.MINUTES);
						
						
						
						
						LambdaUpdateWrapper<NodeServerDO> update = new LambdaUpdateWrapper<>();
						update.set(NodeServerDO::getNodeInfoCacheUpdateTime, LocalDateTime.now())
						.eq(NodeServerDO::getId, nodeServerDO.getId());
						
						
			
						log.debug("NodeInfo cache updated. host: ["
								+ nodeServerDO.getHost()
								+ "]");
							
						
						return (Void)null;
					}


					
				});
				
				
				return;
				
			}
			
			
			
			LocalDateTime nodeInfoCacheUpdateTime = nodeServerDO.getNodeInfoCacheUpdateTime();
			
			boolean isCacheTimeout = false;
			
			if (!checkUpdateTime) {
				isCacheTimeout = true;
			} else {
	
				if (nodeInfoCacheUpdateTime == null) {
					isCacheTimeout = true;
				} else {
					long ldtMillis = nodeInfoCacheUpdateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
					if (now.getTimeInMillis() - ldtMillis > znlProperties.calcNodeInfoUpdateInterval().intValue()) {
						isCacheTimeout = true;
					}
				}
				
			}
			
			
			if (!isCacheTimeout) {
				return;
	
			}
	
			
			// TODO node must started least started 30 seconds. 
			/**
	docker exec -it znl-zcash-node zcash-cli getblockchaininfo
	Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.
	error code: -28
	error message:
	Verifying blocks...
	
			 */
			
	
			Ref<NodeInfo> rNodeInfo = new Ref<>();
			try {
				

				Void result = redisSafeTemplate.executeSafe(ZcashNodeManager.sshOperationLockPrefix + ":NodeServerDO:" + nodeServerDO.getId(), 
		        		new Routine<Void>() {

					@Override
					public Void execute() throws Exception {
						
						redisSafeTemplate.replaceValueSafe(nodeInfoCacheKey(nodeServerDO.getId()), () -> {
							ZcashNodeClient nodeClient = getOrCreateClient(nodeServerDO);
							
							NodeInfo ni = nodeClient.getNodeInfo();
							
							rNodeInfo.setData(ni);
							
							return JsonUtils.getObjectMapper().writeValueAsString(ni);
							
						}, 60, TimeUnit.MINUTES);
						
						LambdaUpdateWrapper<NodeServerDO> update = new LambdaUpdateWrapper<>();
						update.set(NodeServerDO::getNodeInfoCacheUpdateTime, LocalDateTime.now())
						.eq(NodeServerDO::getId, nodeServerDO.getId());
						
						
			
						log.debug("NodeInfo cache updated. host: ["
								+ nodeServerDO.getHost()
								+ "]");
						
						
						
						return (Void)null;
					}
				});
				
				
			} catch (Exception e) {
				
				log.error("Error to get node info for server: ["
						+ nodeServerDO.getHost()
						+ "]", e);
				
				return;
				
			}
		
		} finally {
			NodeInfoCacheContext.lock.unlock();
		}
		
		
		
		
	}
	
	
	
	
	
	
	
	public void closeAllEstablishedSessions() throws IOException {

		NodeInfoCacheContext.lock.lock();
		
		try {
			
			Set<Entry<Long,ZcashNodeClient>> entrySet = nodeClientPool.entrySet();
			
			for (Entry<Long, ZcashNodeClient> entry : entrySet) {
				
				entry.getValue().close();
				
			}
			
			nodeClientPool.clear();
			
		} finally {

			NodeInfoCacheContext.lock.unlock();;
		}
		
	}







	public static String nodeInfoCacheKey(Long id) {
		return RedisKeyConstants.NODE_INFO_CACHE + "#" + id;
	}

	

	
	public GlobeData getNodesGlobeData() throws IOException {
		
		
		
		if (demo) {
			GlobeData globeData = demoGlobeData(dbIpReader);
			
			return globeData;
		} else {
			
			List<NodeServerDO> allNodeServers = nodeServerMapper.selectList();
			GlobeData globeData = toGlobeData(allNodeServers);
			return globeData;
		}
		
		
		
		
	}

	


	private static GlobeData randomGlobeData = null;
	private static GlobeData demoGlobeData(DatabaseReader dbIpReader) throws IOException {
		
		if (randomGlobeData != null) {
			return randomGlobeData;
		}
		
		synchronized (NodeInfoManager.class) {
			if (randomGlobeData != null) {
				return randomGlobeData;
			}
			
			GlobeData result = GlobeDataUtils.randomGlobeData(dbIpReader);
			
			randomGlobeData = result;
			
		}
		
		
		return randomGlobeData;
	}







	private void fillCoordinate(PointData pointData) throws IOException {
		
			
		String ip = pointData.getIp();

		pointData.setLat(0f);
		pointData.setLng(0f);
		
		
		if (ip == null) {
			return ;
		}
		

        InetAddress ipAddr = InetAddress.getByName(ip);
        CityResponse response;
		try {
			response = dbIpReader.city(ipAddr);
		} catch (IOException | GeoIp2Exception e) {
			throw new IllegalStateException("Query dbip failed. ["
					+ ip
					+ "]", e);
		}
		
		if (response == null) {
			return ;
		}
		
		pointData.setLat(response.getLocation().getLatitude().floatValue());
		pointData.setLng(response.getLocation().getLongitude().floatValue());
		
		
	}

	private GlobeData toGlobeData(List<NodeServerDO> allNodeServers) throws IOException {

		
		GlobeData result = new GlobeData();
		
		List<PointData> pointDatas = new ArrayList<>();
		result.setPointsData(pointDatas);
		
		List<ArcData> arcDatas = new ArrayList<>();
		result.setArcsData(arcDatas);
		
		
		for (NodeServerDO nodeServerDO : allNodeServers) {
			
			nodeServerDO.setPassword(null);
			nodeServerDO.setProxyPassword(null);
			
			String label = nodeServerDO.getName();
			if (StringUtils.isBlank(label)) {
				label = nodeServerDO.getHost();
			}

			NodeInfo nodeInfo = redisSafeTemplate.readValue(
					NodeInfoManager.nodeInfoCacheKey(nodeServerDO.getId()), NodeInfo.class);
			
			PointData nodePoint;
			{
				nodePoint = new PointData();
				nodePoint.setName(label);
				if (Strings.CS.equals(nodeServerDO.getNodeStatus(), NodeServerDO.nodeStatus_running)) {
					nodePoint.setColor("green");
				} else {
					nodePoint.setColor("red");
				}
				nodePoint.setType(PointData.type_node);
				
				nodePoint.setNodeInfo(nodeInfo);
				
				nodePoint.setIp(nodeServerDO.getHost());
				
				fillCoordinate(nodePoint);
				
				pointDatas.add(nodePoint);
			}
			

			NodeServerRespVO nodeServerRespVO = BeanUtils.toBean(nodeServerDO, NodeServerRespVO.class);
			nodePoint.setNodeServer(nodeServerRespVO);
			
			handleNodeInfo(nodeInfo, nodePoint, pointDatas, arcDatas);
			

			if (demo) {
				nodeServerDO.clearPrivateInfo();
				nodeServerRespVO.clearPrivateInfo();
			}
			
			
		}

		return result;
	}


	private void handleNodeInfo(NodeInfo nodeInfo, 
			PointData nodePoint, List<PointData> pointDatas, List<ArcData> arcDatas) throws IOException {
		

		if (nodeInfo == null) {
			return ;
		}

		List<PeerInfo> peerInfos = nodeInfo.getPeerInfos();
		
		if (peerInfos == null) {
			return ;
		}
		
			
		for (PeerInfo peerInfo : peerInfos) {

			PointData pointData = drawPoint(peerInfo);

			pointDatas.add(pointData);
			
			fillCoordinate(pointData);
			
			ArcData arcData = drawArc(nodePoint, pointData);
			
			arcDatas.add(arcData);
			
			
		}
			
	}

	private ArcData drawArc(PointData nodePoint, PointData peerPoint) {
		
		ArcData arcData = new ArcData();
		
		arcData.setStartLat(nodePoint.getLat());
		arcData.setStartLng(nodePoint.getLng());
		
		arcData.setEndLat(peerPoint.getLat());
		arcData.setEndLng(peerPoint.getLng());
		
		
		return arcData;
	}


	private PointData drawPoint(PeerInfo peerInfo) {
		
		PointData pointData = new PointData();
		ObjectNode peerInfoNode = peerInfo.getInfo();
		String addr = peerInfoNode.get("addr").textValue();

		
		String host = addr;
		if (addr.contains(":")) {
			host = addr.substring(0, addr.indexOf(":"));
		}
		
		pointData.setIp(host);
		

		pointData.setName(host);
		pointData.setColor("white");
		pointData.setType(PointData.type_peer);
		
		return pointData;
		
	}
	
	
	
	
	
	

}
