package com.zcashjava.znl.framework.common.util.spring;

import cn.hutool.extra.spring.SpringUtil;

import java.util.Objects;


public class SpringUtils extends SpringUtil {

    
    public static boolean isProd() {
        String activeProfile = getActiveProfile();
        return Objects.equals("prod", activeProfile);
    }

}
