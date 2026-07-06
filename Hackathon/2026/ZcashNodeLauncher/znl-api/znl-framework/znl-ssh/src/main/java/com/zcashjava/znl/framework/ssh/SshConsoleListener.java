package com.zcashjava.znl.framework.ssh;

public class SshConsoleListener implements InteractiveCommandListener {


	@Override
	public void callback(ICLParams params) {
		Integer substringStart = params.getLatestTriggerCount();
		if (substringStart == null) {
			substringStart = 0;
		}
		System.out.print(params.getOutputBuffer().substring(substringStart));
	}

}
