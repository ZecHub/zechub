package com.zcashjava.znl.framework.common.enums;


public interface WebFilterOrderEnum {

    int CORS_FILTER = Integer.MIN_VALUE;

    int TRACE_FILTER = CORS_FILTER + 1;

    int REQUEST_BODY_CACHE_FILTER = Integer.MIN_VALUE + 500;

    int API_ENCRYPT_FILTER = REQUEST_BODY_CACHE_FILTER + 1;

    

    int TENANT_CONTEXT_FILTER = - 104; 

    int API_ACCESS_LOG_FILTER = -103; 

    int XSS_FILTER = -102;  

    

    int TENANT_SECURITY_FILTER = -99; 

    int FLOWABLE_FILTER = -98; 

    int DEMO_FILTER = Integer.MAX_VALUE;

}
