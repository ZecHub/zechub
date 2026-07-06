package com.zcashjava.znl.framework.common.validation;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.zcashjava.znl.framework.common.core.ArrayValuable;

import java.lang.annotation.*;

@Target({
        ElementType.METHOD,
        ElementType.FIELD,
        ElementType.ANNOTATION_TYPE,
        ElementType.CONSTRUCTOR,
        ElementType.PARAMETER,
        ElementType.TYPE_USE
})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(
        validatedBy = {InEnumValidator.class, InEnumCollectionValidator.class}
)
public @interface InEnum {

    
    Class<? extends ArrayValuable<?>> value();

    String message() default "Must specify range {value}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
