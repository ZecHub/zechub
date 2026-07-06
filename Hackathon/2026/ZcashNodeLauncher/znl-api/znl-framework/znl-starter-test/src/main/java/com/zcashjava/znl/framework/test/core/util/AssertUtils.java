package com.zcashjava.znl.framework.test.core.util;

import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.ReflectUtil;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.function.Executable;

import com.zcashjava.znl.framework.common.exception.ErrorCode;
import com.zcashjava.znl.framework.common.exception.ServiceException;
import com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertThrows;


public class AssertUtils {

    
    public static void assertPojoEquals(Object expected, Object actual, String... ignoreFields) {
        Field[] expectedFields = ReflectUtil.getFields(expected.getClass());
        Arrays.stream(expectedFields).forEach(expectedField -> {
            
            if (expectedField.isSynthetic()) {
                return;
            }
            
            if (ArrayUtil.contains(ignoreFields, expectedField.getName())) {
                return;
            }
            
            Field actualField = ReflectUtil.getField(actual.getClass(), expectedField.getName());
            if (actualField == null) {
                return;
            }
            
            Assertions.assertEquals(
                    ReflectUtil.getFieldValue(expected, expectedField),
                    ReflectUtil.getFieldValue(actual, actualField),
                    String.format("Field(%s) does not match", expectedField.getName())
            );
        });
    }

    
    public static boolean isPojoEquals(Object expected, Object actual, String... ignoreFields) {
        Field[] expectedFields = ReflectUtil.getFields(expected.getClass());
        return Arrays.stream(expectedFields).allMatch(expectedField -> {
            
            if (ArrayUtil.contains(ignoreFields, expectedField.getName())) {
                return true;
            }
            
            Field actualField = ReflectUtil.getField(actual.getClass(), expectedField.getName());
            if (actualField == null) {
                return true;
            }
            return Objects.equals(ReflectUtil.getFieldValue(expected, expectedField),
                    ReflectUtil.getFieldValue(actual, actualField));
        });
    }

    
    public static void assertServiceException(Executable executable, ErrorCode errorCode, Object... messageParams) {
        
        ServiceException serviceException = assertThrows(ServiceException.class, executable);
        
        Assertions.assertEquals(errorCode.getCode(), serviceException.getCode(), "Error code does not match");
        String message = ServiceExceptionUtil.doFormat(errorCode.getCode(), errorCode.getMsg(), messageParams);
        Assertions.assertEquals(message, serviceException.getMessage(), "Error hint does not match");
    }

}
