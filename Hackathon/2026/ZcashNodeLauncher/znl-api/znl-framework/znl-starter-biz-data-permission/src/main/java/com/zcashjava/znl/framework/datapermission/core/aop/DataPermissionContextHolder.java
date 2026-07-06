package com.zcashjava.znl.framework.datapermission.core.aop;

import com.alibaba.ttl.TransmittableThreadLocal;
import com.zcashjava.znl.framework.datapermission.core.annotation.DataPermission;

import java.util.LinkedList;
import java.util.List;


public class DataPermissionContextHolder {

    
    private static final ThreadLocal<LinkedList<DataPermission>> DATA_PERMISSIONS =
            TransmittableThreadLocal.withInitial(LinkedList::new);

    
    public static DataPermission get() {
        return DATA_PERMISSIONS.get().peekLast();
    }

    
    public static void add(DataPermission dataPermission) {
        DATA_PERMISSIONS.get().addLast(dataPermission);
    }

    
    public static DataPermission remove() {
        DataPermission dataPermission = DATA_PERMISSIONS.get().removeLast();
        
        if (DATA_PERMISSIONS.get().isEmpty()) {
            DATA_PERMISSIONS.remove();
        }
        return dataPermission;
    }

    
    public static List<DataPermission> getAll() {
        return DATA_PERMISSIONS.get();
    }

    
    public static void clear() {
        DATA_PERMISSIONS.remove();
    }

}
