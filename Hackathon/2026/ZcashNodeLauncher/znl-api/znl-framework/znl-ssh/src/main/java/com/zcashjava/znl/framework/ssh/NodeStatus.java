package com.zcashjava.znl.framework.ssh;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class NodeStatus {
	
	
	
	/**
     * online / lost
     */
    private String serverStatus;
    /**
     * network not reachable / incorrect password / Exception
     */
    private String serverError;
    /**
     * server status check time
     */
    private LocalDateTime serverStatusCheckTime;
    /**
     * not installed / installed
     */
    private String installationStatus;
    /**
     * installation status check time
     */
    private LocalDateTime installationStatusCheckTime;
    /**
     * started / stopped
     */
    private String nodeStatus;
    /**
     * node status check time
     */
    private LocalDateTime nodeStatusCheckTime;
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
