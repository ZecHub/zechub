package com.zcashjava.znl.framework.ssh;

import java.io.OutputStream;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ICLParams {
	
	
	private StringBuilder outputBuffer;
	
	
	private OutputStream invertedIn;
	
	
	private Integer latestTriggerCount;
	
	
	
	
	

}
