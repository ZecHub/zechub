package com.zcashjava.znl.framework.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RedisTemplates {
	
	
	private StringRedisTemplate stringRedisTemplate;
	
	
	private RedisTemplate<String, Object> redisTemplate;
	
	
	

}
