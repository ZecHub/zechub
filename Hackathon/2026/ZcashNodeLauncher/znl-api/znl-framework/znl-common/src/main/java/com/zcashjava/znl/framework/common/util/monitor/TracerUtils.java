package com.zcashjava.znl.framework.common.util.monitor;

import org.apache.skywalking.apm.toolkit.trace.TraceContext;


public class TracerUtils {

    
    private TracerUtils() {
    }

    
    public static String getTraceId() {
        return TraceContext.traceId();
    }

}
