package com.zcashjava.znl.framework.ssh;

public interface InteractiveCommandListener {

	
	
	
	/**
	if (out.toString().contains("password")) {
        invertedIn.write((password + "\n").getBytes(StandardCharsets.UTF_8));
        invertedIn.flush();
    }
	 */
	public void callback(ICLParams iclParams);
	
	
	
	
	
	

}
