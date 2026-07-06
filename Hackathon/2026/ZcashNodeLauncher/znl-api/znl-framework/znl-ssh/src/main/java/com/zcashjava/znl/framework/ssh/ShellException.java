package com.zcashjava.znl.framework.ssh;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

public class ShellException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7863172144177428343L;
	

	@Getter
	@Setter
	@Accessors(chain = true)
	private String cmd;
	

	@Getter
	@Setter
	@Accessors(chain = true)
	private String messageExt;
	
	

	public ShellException() {
		super();
	}

	public ShellException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ShellException(String message, Throwable cause) {
		super(message, cause);
	}

	public ShellException(String message) {
		super(message);
	}

	public ShellException(Throwable cause) {
		super(cause);
	}

	
	
	
	
	
}
