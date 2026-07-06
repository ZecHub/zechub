package com.zcashjava.znl.framework.redis;

public interface CacheValueConsumer<T> {
	
	
	
	public void accept(String cacheValue) throws Exception;
	
	
	
	
	

}
