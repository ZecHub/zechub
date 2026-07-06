package com.zcashjava.znl.module.zcash.service.nodeserver;

import com.zcashjava.znl.framework.ssh.struct.NodeInfo;
import com.zcashjava.znl.module.zcash.controller.admin.nodeserver.vo.NodeServerRespVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointData {
	
	
	public static String type_node = "node";
	public static String type_peer = "peer";
	/**
	 * node / peer
	 */
	private String type;
	
	
	private String ip;
	
	
	private float lat;
	
	
	private float lng;
	
	
	private String name;
	
	
	private String color;
	
	
	private NodeInfo nodeInfo;
	
	
	private NodeServerRespVO nodeServer;
	
	
	
	

}
