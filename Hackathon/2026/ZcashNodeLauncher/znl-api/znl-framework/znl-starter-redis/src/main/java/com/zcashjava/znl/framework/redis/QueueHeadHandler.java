package com.zcashjava.znl.framework.redis;

public interface QueueHeadHandler<T> {
	
	
	
	public T handle(String cacheValue) throws Exception;
	
	
	
	
	

}
