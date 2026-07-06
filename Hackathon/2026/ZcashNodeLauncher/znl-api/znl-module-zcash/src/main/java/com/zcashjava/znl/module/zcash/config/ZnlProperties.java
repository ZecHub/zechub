package com.zcashjava.znl.module.zcash.config;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "znl.zcash")
@Component
@Getter
@Setter
public class ZnlProperties {
	
	
	private String serverPasswordCipherKey;
	
	
	public static final Long nodeInfoUpdateInterval_default = TimeUnit.SECONDS.toMillis(1);
	/**
	 * TimeUnit: seconds. 
	 */
	private Long nodeInfoUpdateInterval = nodeInfoUpdateInterval_default;
	
	
	public Long calcNodeInfoUpdateInterval() {
		if (nodeInfoUpdateInterval == null) {
			return nodeInfoUpdateInterval_default;
		}
		
		return nodeInfoUpdateInterval;
	}
	
	
	private Long idelNodeClientAliveTime = TimeUnit.MINUTES.toMillis(1);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
