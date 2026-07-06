package com.zcashjava.znl.framework.desensitize.core.regex.handler;

import com.zcashjava.znl.framework.desensitize.core.regex.annotation.EmailDesensitize;


public class EmailDesensitizationHandler extends AbstractRegexDesensitizationHandler<EmailDesensitize> {

    @Override
    String getRegex(EmailDesensitize annotation) {
        return annotation.regex();
    }

    @Override
    String getReplacer(EmailDesensitize annotation) {
        return annotation.replacer();
    }

}
