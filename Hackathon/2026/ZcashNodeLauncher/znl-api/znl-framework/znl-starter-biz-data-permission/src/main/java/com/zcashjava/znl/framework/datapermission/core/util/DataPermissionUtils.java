package com.zcashjava.znl.framework.datapermission.core.util;

import lombok.SneakyThrows;

import java.util.concurrent.Callable;

import com.zcashjava.znl.framework.datapermission.core.annotation.DataPermission;
import com.zcashjava.znl.framework.datapermission.core.aop.DataPermissionContextHolder;


public class DataPermissionUtils {

    private static DataPermission DATA_PERMISSION_DISABLE;

    @DataPermission(enable = false)
    @SneakyThrows
    private static DataPermission getDisableDataPermissionDisable() {
        if (DATA_PERMISSION_DISABLE == null) {
            DATA_PERMISSION_DISABLE = DataPermissionUtils.class
                    .getDeclaredMethod("getDisableDataPermissionDisable")
                    .getAnnotation(DataPermission.class);
        }
        return DATA_PERMISSION_DISABLE;
    }

    
    public static void executeIgnore(Runnable runnable) {
        addDisableDataPermission();
        try {
            
            runnable.run();
        } finally {
            removeDataPermission();
        }
    }

    
    @SneakyThrows
    public static <T> T executeIgnore(Callable<T> callable) {
        addDisableDataPermission();
        try {
            
            return callable.call();
        } finally {
            removeDataPermission();
        }
    }

    
    public static void addDisableDataPermission(){
        DataPermission dataPermission = getDisableDataPermissionDisable();
        DataPermissionContextHolder.add(dataPermission);
    }

    public static void removeDataPermission(){
        DataPermissionContextHolder.remove();
    }

}
