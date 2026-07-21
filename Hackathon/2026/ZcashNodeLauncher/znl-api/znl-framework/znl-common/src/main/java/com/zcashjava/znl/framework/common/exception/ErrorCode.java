package com.zcashjava.znl.framework.common.exception;

import com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants;
import com.zcashjava.znl.framework.common.exception.enums.ServiceErrorCodeRange;

import lombok.Data;


@Data
public class ErrorCode {

    
    private final Integer code;
    
    private final String msg;

    public ErrorCode(Integer code, String message) {
        this.code = code;
        this.msg = message;
    }

}
