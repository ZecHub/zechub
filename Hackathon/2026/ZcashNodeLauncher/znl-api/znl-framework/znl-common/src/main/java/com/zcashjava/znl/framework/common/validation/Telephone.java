package com.zcashjava.znl.framework.common.validation;

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
        validatedBy = TelephoneValidator.class
)
public @interface Telephone {

    String message() default "Wrong phone format.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
