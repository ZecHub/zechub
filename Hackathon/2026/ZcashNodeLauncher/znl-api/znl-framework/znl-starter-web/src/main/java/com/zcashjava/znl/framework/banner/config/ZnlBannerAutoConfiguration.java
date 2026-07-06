package com.zcashjava.znl.framework.banner.config;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.zcashjava.znl.framework.banner.core.BannerApplicationRunner;


@AutoConfiguration
public class ZnlBannerAutoConfiguration {

    @Bean
    public BannerApplicationRunner bannerApplicationRunner() {
        return new BannerApplicationRunner();
    }

}
