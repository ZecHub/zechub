package com.zcashjava.znl.framework.desensitize.core.handler;

import com.zcashjava.znl.framework.desensitize.core.DesensitizeTest;
import com.zcashjava.znl.framework.desensitize.core.annotation.Address;
import com.zcashjava.znl.framework.desensitize.core.base.handler.DesensitizationHandler;


public class AddressHandler implements DesensitizationHandler<Address> {

    @Override
    public String desensitize(String origin, Address annotation) {
        return origin + annotation.replacer();
    }

}
