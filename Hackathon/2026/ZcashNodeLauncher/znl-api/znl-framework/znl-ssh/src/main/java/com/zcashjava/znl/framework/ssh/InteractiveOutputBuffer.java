package com.zcashjava.znl.framework.ssh;

import java.io.OutputStream;

import lombok.Getter;
import lombok.Setter;

public class InteractiveOutputBuffer {
	

	
	@Getter
	private InteractiveOutputStream out = new InteractiveOutputStream();
	
	@Getter
	private InteractiveOutputStream err = new InteractiveOutputStream();
	
	
	@Getter
	@Setter
	private StringBuilder terminalOutput = new StringBuilder();

	
	
	
	
	
	public InteractiveOutputBuffer() {
		super();
		out.setBufferAppender(terminalOutput);
		err.setBufferAppender(terminalOutput);
	}



	public void setListener(InteractiveCommandListener listener) {
		out.setListener(listener);
		err.setListener(listener);
	}
	
	
	
	public void setInvertedIn(OutputStream invertedIn) {
		out.setInvertedIn(invertedIn);
		err.setInvertedIn(invertedIn);
	}
	
	
	
	
	
	
	
	
	
	
	

}
