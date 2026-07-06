package com.zcashjava.znl.framework.dict.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
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
        validatedBy = {InDictValidator.class, InDictCollectionValidator.class}
)
public @interface InDict {

    
    String type();

    String message() default "Must specify range {value}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
