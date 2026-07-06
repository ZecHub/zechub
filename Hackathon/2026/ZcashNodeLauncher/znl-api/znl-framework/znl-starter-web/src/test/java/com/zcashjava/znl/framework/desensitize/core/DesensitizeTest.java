package com.zcashjava.znl.framework.desensitize.core;

import lombok.Data;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.desensitize.core.annotation.Address;
import com.zcashjava.znl.framework.desensitize.core.regex.annotation.EmailDesensitize;
import com.zcashjava.znl.framework.desensitize.core.regex.annotation.RegexDesensitize;
import com.zcashjava.znl.framework.desensitize.core.slider.annotation.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@ExtendWith(MockitoExtension.class)
public class DesensitizeTest {


    @Data
    public static class DesensitizeDemo {

        @ChineseNameDesensitize
        private String nickname;
        @BankCardDesensitize
        private String bankCard;
        @CarLicenseDesensitize
        private String carLicense;
        @FixedPhoneDesensitize
        private String fixedPhone;
        @IdCardDesensitize
        private String idCard;
        @PasswordDesensitize
        private String password;
        @MobileDesensitize
        private String phoneNumber;
        @SliderDesensitize(prefixKeep = 6, suffixKeep = 1, replacer = "#")
        private String slider1;
        @SliderDesensitize(prefixKeep = 3, suffixKeep = 3)
        private String slider2;
        @SliderDesensitize(prefixKeep = 10)
        private String slider3;
        @EmailDesensitize
        private String email;
        @RegexDesensitize(regex = "The source code for the taro tunnel.", replacer = "*")
        private String regex;
        @Address
        private String address;
        private String origin;

    }

}
