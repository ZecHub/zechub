package com.zcashjava.znl.framework.redis;


import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RedisSafeTemplate {
	

	
	
	public static final String lockPrefix = "RedisSafeTemplate:lock:";
	public static final String valuePrefix = "RedisSafeTemplate:value:";

	
	@Autowired
	private StringRedisTemplate stringRedisTemplate;
	
	@Autowired
	private RedisTemplate<String, Object> redisTemplate;
	
	@Autowired
    private RedissonClient redissonClient;
	

	
	


	
	public <T> T consumeQueueHead(String key, Routine<List<String>> valueSupplier, QueueHeadHandler<T> handler, 
			Long expire, TimeUnit timeUnit) {
		
		
		String queueHead = getQueueHeadSafe(key, valueSupplier, expire, timeUnit);
		try {
			
			T result = handler.handle(queueHead);
			
			return result;
		} catch (Exception e) {
			log.error("Consume queue head failed, key: "
					+ key
					+ "", e);
			pushQueueHeadSafe(key, () -> Arrays.asList(queueHead));
			if (e instanceof RuntimeException) {
				throw (RuntimeException)e;
			}
			throw new RuntimeException("", e);
		}
		
	}
	
	
	public <T> T consumeQueueHead(String key, Routine<List<String>> valueSupplier, QueueHeadHandler<T> handler) {
		
		
		String queueHead = getQueueHeadSafe(key, valueSupplier);
		try {
			
			T result = handler.handle(queueHead);
			
			return result;
		} catch (Exception e) {
			log.error("Consume queue head failed: "
					+ key
					+ "", e);
			pushQueueHeadSafe(key, () -> Arrays.asList(queueHead));
			if (e instanceof RuntimeException) {
				throw (RuntimeException)e;
			}
			throw new RuntimeException("", e);
		}
		
	}
	
	
	
	public void pushQueueHeadSafe(String key, Routine<List<String>> queueSupplier) {

		String lockKey = lockPrefix + key + "";
		String valueKey = valuePrefix + key + "";
		
		executeSafe(lockKey, () -> {

    		ListOperations<String,String> opsForList = stringRedisTemplate.opsForList();
    		
    		List<String> values = queueSupplier.execute();
    		if (CollectionUtils.isNotEmpty(values)) {
    			for (String value : values) {
    				opsForList.leftPush(valueKey, value);
				}
			}
			
			return null;
		});
		
		
	}

	public String getQueueHeadSafe(String key, Routine<List<String>> valueSupplier) {

		return getQueueHeadSafe(key, valueSupplier, null);
		
	}


	public String getQueueHeadSafe(String key, Routine<List<String>> valueSupplier, Long expire, TimeUnit timeUnit) {
		return getQueueHeadSafe(key, valueSupplier, valueKey -> {
    		stringRedisTemplate.expire(valueKey, expire, timeUnit);
		});
	}

	public void delSafe(String key) {

		delSafe(key, null);
		
	}
	

	public <T> T delSafe(String key, DeleteRoutine<T> customDeleteRoutine) {

		String lockKey = lockPrefix + key + "";
		String valueKey = valuePrefix + key + "";
		
		T result = executeSafe(lockKey, () -> {
			
			try {
				T tempRes = null;
				if (customDeleteRoutine != null) {
					tempRes = customDeleteRoutine.delete(new RedisTemplates(stringRedisTemplate, redisTemplate), lockKey, valueKey);
				} else {
					stringRedisTemplate.delete(valueKey);
				}
				
				return tempRes;
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
			
		});
		
		return result;
		
	}

	public String getQueueHeadSafe(String key, Routine<List<String>> valueSupplier, Consumer<String> expire) {

		String lockKey = lockPrefix + key + "";
		String valueKey = valuePrefix + key + "";
		
		
    	String result = executeSafe(lockKey, () -> {
    		ListOperations<String,String> opsForList = stringRedisTemplate.opsForList();
    		
    		
        	String cache2 = opsForList.leftPop(valueKey);
        	if (cache2 != null) {
    			return cache2;
    		}
        	
    		List<String> values = valueSupplier.execute();
    		if (expire != null) {
    			expire.accept(valueKey);
			}
    		
    		if (CollectionUtils.isEmpty(values)) {
				return null;
			}
    		
    		if (values.size() > 1) {
    			List<String> valuesPushToRedis = values.subList(1, values.size());
        		for (String value : valuesPushToRedis) {
        			opsForList.rightPush(valueKey, value);
    			}
			}
            
        	return values.get(0);
    	});
    	
    	
    	return result;
		
	}
	
	
	
	public String replaceValueSafe(String key, Routine<String> valueSupplier, PutValueRoutine customPutValueRoutine) {

		String lockKey = lockPrefix + key + "";
		String valueKey = valuePrefix + key + "";

		
    	String result = executeSafe(lockKey, () -> {
    		stringRedisTemplate.delete(valueKey);
        	
    		String value = valueSupplier.execute();
        	
    		if (customPutValueRoutine != null) {
    			customPutValueRoutine.putValue(new RedisTemplates(stringRedisTemplate, redisTemplate), valueKey, value);
			} else {
				stringRedisTemplate.opsForValue().set(valueKey, value);
			}
            
        	return value;
    	});
    	
    	
    	return result;
		
		
	}
	
	

	public String replaceValueSafe(String key, Routine<String> valueSupplier) {

		String result = replaceValueSafe(key, valueSupplier, null);
    	
    	
    	return result;
		
		
	}
	
	

	public String replaceValueSafe(String key, Routine<String> valueSupplier, long timeout, TimeUnit timeUnit) {
		
		return replaceValueSafe(key, valueSupplier, (r, valueKey, value) -> {

            r.getStringRedisTemplate().opsForValue().set(valueKey, 
            		value, timeout, timeUnit);
		});
		
	}
	
	

	public String readValueSafe(String key, CacheValueConsumer<String> cacheValueConsumer) {

		String lockKey = lockPrefix + key + "";
		String valueKey = valuePrefix + key + "";

    	String result = executeSafe(lockKey, () -> {
    		
    		Boolean hasKey = stringRedisTemplate.hasKey(valueKey);
    		if (!hasKey) {
				return null;
			}
    		
        	String value = stringRedisTemplate.opsForValue().get(valueKey);
        	if (value != null) {
    			return value;
    		}
        	
        	if (cacheValueConsumer != null) {
        		cacheValueConsumer.accept(value);
			}
        	
        	return value;
    	});
    	
    	
    	return result;
		
		
	}
	


	public String readValue(String key) {

		String valueKey = valuePrefix + key + "";

		String value = stringRedisTemplate.opsForValue().get(valueKey);
    	
    	return value;
		
	}


	public <T> T readValue(String key, Class<T> type) throws JsonMappingException, JsonProcessingException {

		String valueKey = valuePrefix + key + "";

		String value = stringRedisTemplate.opsForValue().get(valueKey);
		
		if (StringUtils.isBlank(value)) {
			return null;
		}
		
		
		ObjectMapper om = JsonUtils.getObjectMapper();
		T result = om.readValue(value, type);
    	
    	return result;
		
	}
	

	public <T> List<T> readValue(String key, Class<?> collectionClass, Class<T> type) 
			throws JsonMappingException, JsonProcessingException {

		String valueKey = valuePrefix + key + "";

		String value = stringRedisTemplate.opsForValue().get(valueKey);
		
		if (StringUtils.isBlank(value)) {
			return null;
		}
		
		
		ObjectMapper om = JsonUtils.getObjectMapper();
		List<T> result = om.readValue(value, om.getTypeFactory().constructCollectionLikeType(collectionClass, type));
    	
    	return result;
		
	}

	
	public String getValueSafe(String key, Routine<String> valueSupplier, PutValueRoutine customPutValueRoutine) {

		String lockKey = lockPrefix + key + "";
		String valueKey = valuePrefix + key + "";

		String cache = stringRedisTemplate.opsForValue().get(valueKey);
    	if (cache != null) {
			return cache;
		}
    	
    	String result = executeSafe(lockKey, () -> {
    		
        	String cache2 = stringRedisTemplate.opsForValue().get(valueKey);
        	if (cache2 != null) {
    			return cache2;
    		}
        	
    		String value = valueSupplier.execute();
        	
    		if (customPutValueRoutine != null) {
    			customPutValueRoutine.putValue(new RedisTemplates(stringRedisTemplate, redisTemplate), valueKey, value);
			} else {
				stringRedisTemplate.opsForValue().set(valueKey, value);
			}
            
        	return value;
    	});
    	
    	
    	return result;
		
		
	}

	public String getValueSafe(String key, Routine<String> valueSupplier, long timeout, TimeUnit timeUnit) {
		
		return getValueSafe(key, valueSupplier, (r, valueKey, value) -> {

            r.getStringRedisTemplate().opsForValue().set(valueKey, 
            		value, timeout, timeUnit);
		});
		
	}
	
	public String getValueSafe(String key, Routine<String> valueSupplier) {
		
		return getValueSafe(key, valueSupplier, null);
		
		
	}
	

	public <T> T executeSafe(String lockKey, Routine<T> routine, TryLockRoutine tryLockRoutine) {
        RLock lock = redissonClient.getLock(lockKey);

        boolean isLocked = false;
        try {
            isLocked = tryLockRoutine.tryLock(lock);

            if (isLocked) {
            	if (log.isDebugEnabled()) {
            		log.debug("Get lock success ["
                			+ lockKey
                			+ "], start business service...");
				}
            	
                T result;
				try {
					result = routine.execute();
				} catch (Exception e) {
					throw new RuntimeException("Error to execute routine["
							+ lockKey
							+ "] ", e);
				}

            	if (log.isDebugEnabled()) {
            		log.debug("Business service successful in lock context ["
                			+ lockKey
                			+ "]");
				}
                return result;
            } else {
            	throw new RuntimeException("Get lock ["
                		+ lockKey
                		+ "] failed. ");
            }
        } catch (InterruptedException e) {

        	throw new RuntimeException("Get lock ["
            		+ lockKey
            		+ "] interrupted. ", e);
        } finally {
            if (isLocked && lock.isHeldByCurrentThread()) {
                lock.unlock();
            	log.debug("Release lock["
                		+ lockKey
                		+ "]. ");
            }
        }
	}
	
	public <T> T executeSafe(String lockId, Routine<T> supplier) {
		return executeSafe(lockId, supplier, lock -> lock.tryLock(10, 30, TimeUnit.SECONDS));
	}
	
	
	
	
	
	
	
	
	
	
	

}
