package com.zcashjava.znl.framework.redis;

public interface DeleteRoutine<T> {
	
	
	
	public T delete(RedisTemplates redisTemplates, 
			String lockKey, String valueKey) throws Exception;
	
	
	
	
	

}
