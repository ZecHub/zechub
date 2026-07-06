package com.zcashjava.znl.framework.common.exception.enums;

import com.zcashjava.znl.framework.common.exception.ErrorCode;


public interface GlobalErrorCodeConstants {

    ErrorCode SUCCESS = new ErrorCode(0, "Success");

    

    ErrorCode BAD_REQUEST = new ErrorCode(400, "The requested parameter is incorrect");
    ErrorCode UNAUTHORIZED = new ErrorCode(401, "No account login");
    ErrorCode FORBIDDEN = new ErrorCode(403, "FORBIDDEN");
    ErrorCode NOT_FOUND = new ErrorCode(404, "Request not found");
    ErrorCode METHOD_NOT_ALLOWED = new ErrorCode(405, "The request was not correct.");
    ErrorCode LOCKED = new ErrorCode(423, "Request denied. Please try again later."); 
    ErrorCode TOO_MANY_REQUESTS = new ErrorCode(429, "Requests are too frequent. Please try again later.");

    

    ErrorCode INTERNAL_SERVER_ERROR = new ErrorCode(500, "System Error");
    ErrorCode NOT_IMPLEMENTED = new ErrorCode(501, "Function not achieved/opened");
    ErrorCode ERROR_CONFIGURATION = new ErrorCode(502, "Wrong Configuration Item");

    
    ErrorCode REPEATED_REQUESTS = new ErrorCode(900, "Repeat the request. Please try again later."); 
    ErrorCode DEMO_DENY = new ErrorCode(901, "Presentation Mode, Disable Writing");

    ErrorCode UNKNOWN = new ErrorCode(999, "Unknown error");

}
