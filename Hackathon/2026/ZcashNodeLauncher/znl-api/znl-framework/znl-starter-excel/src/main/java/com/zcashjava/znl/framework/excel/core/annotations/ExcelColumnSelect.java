package com.zcashjava.znl.framework.excel.core.annotations;

import java.lang.annotation.*;


@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface ExcelColumnSelect {

    
    String dictType() default "";

    
    String functionName() default "";

}
