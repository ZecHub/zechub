package com.zcashjava.znl.framework.common.util.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import java.time.Duration;
import java.util.concurrent.Executors;


public class CacheUtils {

    
    private static final Integer CACHE_MAX_SIZE = 10000;

    
    public static <K, V> LoadingCache<K, V> buildAsyncReloadingCache(Duration duration, CacheLoader<K, V> loader) {
        return CacheBuilder.newBuilder()
                .maximumSize(CACHE_MAX_SIZE)
                
                .refreshAfterWrite(duration)
                
                .build(CacheLoader.asyncReloading(loader, Executors.newCachedThreadPool())); 
    }

    
    public static <K, V> LoadingCache<K, V> buildCache(Duration duration, CacheLoader<K, V> loader) {
        return CacheBuilder.newBuilder()
                .maximumSize(CACHE_MAX_SIZE)
                
                .refreshAfterWrite(duration)
                .build(loader);
    }

}
