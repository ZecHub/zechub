package com.zcashjava.znl.framework.common.exception;

import com.zcashjava.znl.framework.common.exception.enums.GlobalErrorCodeConstants;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = true)
public final class ServerException extends RuntimeException {

    
    private Integer code;
    
    private String message;

    
    public ServerException() {
    }

    public ServerException(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMsg();
    }

    public ServerException(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public ServerException setCode(Integer code) {
        this.code = code;
        return this;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public ServerException setMessage(String message) {
        this.message = message;
        return this;
    }

}
