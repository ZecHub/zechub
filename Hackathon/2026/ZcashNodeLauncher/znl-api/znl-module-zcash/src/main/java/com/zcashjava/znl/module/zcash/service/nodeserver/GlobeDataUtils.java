package com.zcashjava.znl.module.zcash.service.nodeserver;

import java.io.IOException;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.MutablePair;
import org.apache.commons.lang3.tuple.Pair;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.ssh.struct.NodeInfo;
import com.zcashjava.znl.framework.ssh.struct.PeerInfo;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerRespVO;
import com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver.NodeServerDO;

public class GlobeDataUtils {
	

	
	/**
	 */
	public static String bigIntToIp(BigInteger ipBigInt) {
		byte[] bytes = ipBigInt.toByteArray();
		byte[] fourBytes = new byte[4];

		// Logic: Handle the extra byte (sign bit) resulting from BigInteger conversion
		// If the BigInteger is positive and less than 2^32, toByteArray() might return
		// 4 or 5 bytes
		// We only need the last 4 bytes
		int length = bytes.length;
		int srcPos = Math.max(0, length - 4);
		int copyLength = Math.min(length, 4);
		int destPos = 4 - copyLength;

		System.arraycopy(bytes, srcPos, fourBytes, destPos, copyLength);

		try {
			return InetAddress.getByAddress(fourBytes).getHostAddress();
		} catch (UnknownHostException e) {
			throw new IllegalArgumentException("Invalid ip address: " + ipBigInt, e);
		}
	}
	
	public static GlobeData randomGlobeData(DatabaseReader dbReader) throws IOException {
		
		GlobeData globeData = new GlobeData();
		globeData.setIsDemo(true);
    	
    	
    	int pointQty = (int) (Math.random() * 20 + 20);
    	int arcQty = (int)(Math.random() * pointQty * 10 + pointQty * 20);
    	
    	List<PointData> pointDatas = new ArrayList<>();
    	List<ArcData> arcDatas = new ArrayList<>();
    	
    	
    	List<Pair<String, String>> publicNetIpRange = new ArrayList<>();
    	publicNetIpRange.add(new MutablePair<String, String>("1.0.0.0", "9.255.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("11.0.0.0", "126.255.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("128.0.0.0", "169.253.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("169.255.0.0", "172.15.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("172.32.0.0", "191.255.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("192.0.0.0", "192.167.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("192.169.0.0", "223.255.255.255"));
    	
    	
    	
    	for (int i = 0; i < pointQty; ) {
    		PointData pointData = new PointData();
    		
    		
    		
    		Pair<String, String> randomIpRange = publicNetIpRange.get((int) (publicNetIpRange.size() * Math.random()));
    		
    		String start = randomIpRange.getLeft();
    		String end = randomIpRange.getRight();
    		
    		byte[] startBytes = InetAddress.getByName(start).getAddress();
    		BigInteger startInteger = new BigInteger(1, startBytes);
    		byte[] endBytes = InetAddress.getByName(end).getAddress();
    		BigInteger endInteger = new BigInteger(1, endBytes);
    		
    		
    		long random = (long) (Math.random() * endInteger.subtract(startInteger).longValue());
    		
    		BigInteger randomIpNumber = startInteger.add(BigInteger.valueOf(random));
    		
    	    String randomIp = bigIntToIp(randomIpNumber);
    	    
    	    InetAddress ip = InetAddress.getByName(randomIp);
    	    CityResponse cityResponse;
			try {
				cityResponse = dbReader.city(ip);
			} catch (IOException | GeoIp2Exception e) {
				throw new IllegalStateException("ip location query failed. ", e);
			}
    	    if (cityResponse == null) {
				continue;
			}
    	    
    	    
    	    boolean isNode = Math.random() < 0.3;
    	    pointData.setIp(randomIp);
    	    pointData.setColor(isNode ? "green" : "white");
    	    pointData.setType(isNode ? "node" : "peer");
    	    pointData.setLat(cityResponse.getLocation().getLatitude().floatValue());
    	    pointData.setLng(cityResponse.getLocation().getLongitude().floatValue());
    	    pointData.setName(cityResponse.getCity().getName());
    	    
    	    
    	    NodeServerRespVO randomNodeServerRespVO = new NodeServerRespVO();
    	    randomNodeServerRespVO.setId((long) (Math.random() * Long.MAX_VALUE));;
    	    randomNodeServerRespVO.setHost(randomIp);
    	    randomNodeServerRespVO.setName(randomIp);
    	    randomNodeServerRespVO.setServerStatus(NodeServerDO.serverStatus_online);
    	    randomNodeServerRespVO.setInstallationStatus(NodeServerDO.installationStatus_installed);
    	    randomNodeServerRespVO.setNodeStatus(NodeServerDO.nodeStatus_running);
    	    
    	    pointData.setNodeServer(randomNodeServerRespVO);
    	    
    	    
    	    NodeInfo randomNodeInfo = new NodeInfo();
    	    ObjectMapper om = JsonUtils.getObjectMapper();
    	    ObjectNode randomBlockchaininfo = om.createObjectNode();
    	    double progress =  Math.random();
    	    int fullHeight = 3400000 + ((int)(Math.random() * 100000));
    	    randomBlockchaininfo.put("verificationprogress", progress);
    	    randomBlockchaininfo.put("estimatedheight", fullHeight);
    	    randomBlockchaininfo.put("blocks", (int)(progress * fullHeight));
    	    randomBlockchaininfo.put("size_on_disk", 500_000_000 + (int)(Math.random() * 100_000_000));
    	    
    	    randomNodeInfo.setBlockchaininfo(randomBlockchaininfo);
    	    
    	    
    	    List<PeerInfo> randomPeerInfos = new ArrayList<>();
    	    int peers = (int) (Math.random() * 10 + 5);
    	    for (int j = 0; j < peers; j ++) {
    	    	randomPeerInfos.add(new PeerInfo());
    	    }
    	    randomNodeInfo.setPeerInfos(randomPeerInfos);
    	    pointData.setNodeInfo(randomNodeInfo);
    	    
    		
    		pointDatas.add(pointData);
    		
    		i ++;
    		
    	}
    	
    	
    	for (int i = 0; i < arcQty; ) {
    		
    		PointData start = pointDatas.get((int) (Math.random() * pointDatas.size()));
    		PointData end = pointDatas.get((int) (Math.random() * pointDatas.size()));
    		
    		if (start == end) {
				continue;
			}
    		
    		ArcData arcData = new ArcData();
    		arcData.setStartLat(start.getLat());
    		arcData.setStartLng(start.getLng());
    		arcData.setEndLat(end.getLat());
    		arcData.setEndLng(end.getLng());
    		
    		arcDatas.add(arcData);
    		
    		i ++;
    		
    	}
    	
    	globeData.setArcsData(arcDatas);
    	globeData.setPointsData(pointDatas);
    	
    	return globeData;
	}
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
