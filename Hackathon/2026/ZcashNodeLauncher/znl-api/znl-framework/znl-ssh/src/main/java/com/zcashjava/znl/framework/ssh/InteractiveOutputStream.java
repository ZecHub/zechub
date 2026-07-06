package com.zcashjava.znl.framework.ssh;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.Strings;

import lombok.Getter;
import lombok.Setter;

public class InteractiveOutputStream extends OutputStream {
	
	@Getter
	@Setter
	private StringBuilder buffer = new StringBuilder();
	
	@Getter
	@Setter
	private StringBuilder bufferAppender = new StringBuilder();
	

	@Getter
	@Setter
	private InteractiveCommandListener listener;
	
	
	@Getter
	@Setter
	private Integer triggerCount = 16;
	
	@Getter
	private Integer latestTriggerCount = null;
	
	
	@Getter
	@Setter
	private List<String> triggerTexts = Arrays.asList("\r", "\n");
	

	
	@Getter
	@Setter
	private OutputStream invertedIn;
	
	

	@Override
	public void write(int b) throws IOException {
		
		char c = (char) b;
		buffer.append(c);
		
		if (bufferAppender != null) {
			bufferAppender.append(c);
		}
        
        if (triggerConditionMatches()) {
        	triggerListener();
			
			latestTriggerCount = buffer.length();
		}
		
		
		
	}
	
	
	@Override
	public void flush() throws IOException {
		triggerListener();
		super.flush();
	}
	
	@Override
	public void close() throws IOException {
		triggerListener();
		super.close();
	}
	

	
	protected void triggerListener() {
		if (listener != null) {
			ICLParams iclParams = new ICLParams(buffer, invertedIn, latestTriggerCount);
			listener.callback(iclParams);
		}
	}
	


	private boolean triggerConditionMatches() {
		if (buffer.length() % triggerCount == 0) {
			return true;
		}
		
		for (String triggerText : triggerTexts) {
			if (triggerText == null || triggerText.length() <= 0) {
				continue;
			}
			
			if (triggerText.length() > buffer.length()) {
				continue;
			}
			
			String substring = buffer.substring(buffer.length() - triggerText.length(), buffer.length());
			if (Strings.CS.equals(substring, triggerText)) {
				return true;
			}
			
			
		}
		
		return false;
		
		
	}
	
	
	
	
	
	

}
