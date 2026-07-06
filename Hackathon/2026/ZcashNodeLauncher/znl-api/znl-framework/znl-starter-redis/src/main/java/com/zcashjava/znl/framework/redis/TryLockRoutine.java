package com.zcashjava.znl.framework.redis;

import org.redisson.api.RLock;

public interface TryLockRoutine {

	
	
	public Boolean tryLock(RLock lock) throws InterruptedException;
	
	
	
	
	
	
	
	
	
	
	
	
	
}
